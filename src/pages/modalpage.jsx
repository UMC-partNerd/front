import React, { useState } from 'react';
import CustomModal, { VERSIONS } from '../components/CustomModal';

// const fetchModalData = async () => {
//     try {
//         const response = await fetch('/api/modal-data'); // Example API endpoint
//         const data = await response.json();
//         // console.log(label, boldface, regular, btn);
//         return data;  // data should include label, boldface, regular, btn
//     } catch (error) {
//         console.error("Error fetching modal data:", error);
//         return {};  // Return empty object in case of error
//     }
// };

// Example API call mock
const fetchModalData = async () => {
    return {
        label: "동아리 등록 완료 모달창",
        boldface: "동아리 등록 완료!",
        regular: "팀 페이지 관리는 *마이페이지 > 팀페이지*에서 가능합니다.",
        btn: "개설하기"
    };
};

const ModalPage = () =>{
    const [label, setLabel] = useState<String>("");
    const [boldface, setBoldface] = useState<String>("");
    const [regular, setRegular] = useState<String>("");
    const [btn, setBtn] = useState<String>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchModalData();
            setLabel(data.label || "모달창");
            setBoldface(data.boldface || "동작");
            setRegular(data.regular || "동작 설명");
            setBtn(data.btn || "실행 버튼");
        };
        getData();
    }, []); // The empty array ensures this effect only runs once on mount

    const handleModal = () => {
        setOpenModal(!openModal);
    };

    const handleVer2Modal = () => {
        setOpenModal(!openModal);
        setLabel("동아리 등록 완료 모달창");
        setBoldface("동아리 등록 완료!");
        setRegular("팀 페이지 관리는 *마이페이지 &gt; 팀페이지*에서 가능합니다.");
    }

    const handleVer1Modal = () => {
        setOpenModal(!openModal);
        setLabel("동아리 등록 완료 모달창");
        setBoldface("동아리를 등록하시겠습니까?");
        setRegular("동아리의 리더로 팀페이지를 개설하여 동아리를 등록할 수 있습니다.");
        setBtn("개설하기");
    }

    console.log(label, boldface, regular, btn);

    return(
        <>
            모달 띄우기 
            <div>
                <button onClick={handleModal}>모달2 버튼</button>
                <CustomModal
                    label={label}
                    boldface={boldface}
                    regular={regular}
                    variant={VERSIONS.VER2}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                />
            </div>
            <div>
                <button onClick={handleModal}>모달1 버튼</button>
                <CustomModal
                    label={label}
                    boldface={boldface}
                    regular={regular}
                    btn={btn}
                    variant={VERSIONS.VER1}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                />
            </div>
        </>
    )
}

export default ModalPage;