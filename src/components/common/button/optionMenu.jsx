import React, { useState, useEffect, useRef } from 'react';
import { 
    MoreOptionsWrapper, VerticalIcon, SMoreOptionsMenu, SMenuItem, SDivider,
} from '../../../styled-components/button/Styled-OptionMenu';
import CustomModal, { VERSIONS } from "../modal/CustomModal";

const optionMenu = ({ post }) => {
    const [showOptions, setShowOptions] = useState(false);
    const menuRef = useRef(null); // 메뉴를 감지할 ref 추가

    // 바깥 클릭 시 메뉴 닫기
    useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptions(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

    const handleEditClick = () => {
        console.log('수정하기 클릭');
    };

    // 모달: 삭제
    const [openFirstModal, setopenFirstModal] = useState(false);
    const [openSecondModal, setOpenSecondModal] = useState(false);

    const handleDeleteClick = () => {
        console.log('삭제하기 클릭');
        setopenFirstModal(true);    
    };

    const deletePost = async () => {
        try {
        // 삭제 동작 
        } catch {
        setError('글을 삭제하는 중 오류가 발생했습니다.');
        } finally {
        setOpenSecondModal(true);
        setopenFirstModal(false);  
        }
    };

    return (
        <>
            <MoreOptionsWrapper ref={menuRef}>
                <VerticalIcon onClick={() => setShowOptions(!showOptions)} />
                <SMoreOptionsMenu show={showOptions}>
                    <SMenuItem onClick={handleEditClick}>수정하기</SMenuItem>
                    <SDivider />
                    <SMenuItem onClick={handleDeleteClick}>삭제하기</SMenuItem>
                </SMoreOptionsMenu>
            </MoreOptionsWrapper>

            <CustomModal
                openModal={openFirstModal} 
                closeModal={() => setopenFirstModal(false)}

                boldface='글 삭제'
                regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
                text='삭제하기'
                onClickHandler={deletePost}
                variant={VERSIONS.VER3}
            />

            <CustomModal
                openModal={openSecondModal} 
                closeModal={() => setOpenSecondModal(false)}

                boldface='글 삭제'
                regular='글이 삭제되었습니다.'
                variant={VERSIONS.VER2}
            />
        </>
    );
};

export default optionMenu;
