import styled from "styled-components"
import { InputPass,NicknameWrapper,Form, FieldGroup, Subup, Input, Subdown, NicknameCheck } from "../../styles/registerstyles"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import NicknameField from "./NicknameCheck"

const RegisterHeader = ({onChange , onNicknameCheck}) => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        nickname: "",
    });


    const [isNicknameAvailable, setIsNicknameAvailable] = useState(null); // 닉네임 상태 (true: 사용 가능, false: 중복됨)
    //닉네임 체크 확인 여부 
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);
        if (name === "nickname") {
            setIsNicknameAvailable(null); // 닉네임 변경 시 상태 초기화
            setIsNicknameChecked(false);
            onNicknameCheck(false);
        }
        onChange(updatedData); // 부모로 데이터 전달
    };


    useEffect(() => {
        // 로컬 스토리지에서 이메일 가져오기
        const storedEmail = localStorage.getItem("kakao_email");
        if (storedEmail) {
            setFormData((prev) => ({ ...prev, email: storedEmail }));
        }
    }, []);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    //닉네임 중복 확인 
    const handleNicknameSubmit = async () =>{
        try{
            const jwtToken = localStorage.getItem("jwtToken"); // JWT 토큰 불러오기
    
            if (!jwtToken) {
                alert("로그인이 필요합니다.");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/api/users/nickname/check?nickname=${formData.nickname}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            setIsNicknameChecked(true);
            onNicknameCheck(true);

            console.log("닉네임이 중복이면 true", response.data.result);

            if (response.data.result) {
                setIsNicknameAvailable(false); // 닉네임 중복됨
            } else {
                setIsNicknameAvailable(true); // 사용 가능한 닉네임
            }
        } catch (error) {
            console.error("닉네임 중복 확인 오류:", error);
            setIsNicknameAvailable(null);
            setIsNicknameChecked(false);
            onNicknameCheck(false);
        }
    };

    return (
        <Form>
            <h3 style={{ marginBottom: '50px' }}>반가워요! 기본 정보를 입력해주세요</h3>
            <FieldGroup>
                <Subup>이름</Subup>
                <Input placeholder="이름(실명)을 입력해주세요" type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
                <Subdown>타인 명의로 가입 시 계정이 정지되고 재가입이 불가능합니다.</Subdown>
            </FieldGroup>

            <FieldGroup>
                <Subup>생년월일</Subup>
                <Input placeholder="예) 20001101"
                type="text"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                />
                <Subdown>년 / 월 / 일을 입력해주세요.</Subdown>
            </FieldGroup>

            {/* <FieldGroup>
                <Subup>닉네임</Subup>
                <NicknameWrapper  isAvailable={isNicknameAvailable}>
                <InputPass placeholder="2자 이상 입력해주세요" 
                type="text"
                name="nickname" 
                value={formData.nickname}
                onChange={handleChange}
                
                />
                <NicknameCheck isAvailable={isNicknameAvailable} onClick={handleNicknameSubmit}>
                중복확인
                </NicknameCheck>
                </NicknameWrapper>
                
                {isNicknameAvailable === null ? (
                    <Subdown>닉네임은 중복일 수 없습니다.</Subdown>
                ) : isNicknameAvailable ? (
                    <Subdown style={{ color: "#08D485" }}>사용 가능한 닉네임입니다.</Subdown>
                ) : (
                    <Subdown>중복된 닉네임 입니다.</Subdown>
                )}
            </FieldGroup> */}
            <NicknameField
                value={formData.nickname}
                onChange={handleChange}
                onNicknameCheck={setIsNicknameChecked}
            />

            <FieldGroup>
                <Subup>이메일</Subup>
                <Input placeholder="이메일을 입력해주세요" 
                type="text"
                name="email" 
                value={formData.email}
                // onChange={handleChange}
                />
            </FieldGroup>
        </Form>

    );
};




const MainWrapp = styled.main`
justify-content:center;
align-items: center;
display:flex;
flex-direction:column;
width: 60vw;
max-width:2700px;
height: 85vh;
background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 16px;
`

export default RegisterHeader