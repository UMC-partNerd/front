import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
    MoreOptionsWrapper, 
    VerticalIcon, 
    SMoreOptionsMenu, 
    SMenuItem, 
    SDivider,
} from '../../../styled-components/button/Styled-OptionMenu';
import CustomModal, { VERSIONS } from "./CustomModal";
import { useNavigate } from 'react-router-dom';

/*
import OptionMenu from '../../components/common/button/optionMenu';

const deletePost = async (clubId) => {    
    const token = localStorage.getItem("jwtToken");

    if (!token) {
        console.error("❌ JWT 토큰이 없습니다. 로그인 상태를 확인하세요.");
        alert("🚨 로그인 후 다시 시도해주세요.");
        return;
    }

    if (!clubId) {
        console.error("❌ clubId가 제공되지 않았습니다.");
        alert("🚨 삭제할 클럽 ID를 입력해주세요.");
        return;
    }

        try {
        // 삭제 동작 

            const response = await axios.delete('https://api.partnerd.site/api/Partnerd/${clubId}
', {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            data: { clubId },
            });
            
            console.log('글 삭제 성공', response.data);
            navigate({moveToUrl});
        } catch (error) {
            console.error('글 삭제 실패', error);
            if (error.response) {
            setErrorMessage('글을 삭제하는 중 오류가 발생했습니다.');
        } else {
                        setErrorMessage('네트워크 오류 또는 서버 응답 없음');
        }
            setErrorMessage('글을 삭제하는 중 오류가 발생했습니다.');
        } finally {
            setOpenSecondModal(true);
            setopenFirstModal(false);  
        }
    };

<OptionMenu
    onDeletePost={deletePost}
    moveToUrl='/collaboration'
/>
*/

const optionMenu = ({ id, apiURL, moveToUrl }) => {
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
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        console.log('삭제하기 클릭');
        setopenFirstModal(true);    
    };


    // 게시글 삭제
    const onDeletePost = async (id) => {    
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            console.error("JWT 토큰이 없습니다. 로그인 상태를 확인하세요.");
            alert("로그인 후 다시 시도해주세요.");
            return;
        }

        if (!id) {
            console.error("id 제공되지 않았습니다.");
            return;
        }

        try {
            // 삭제 동작 
            const response = await axios.delete(`${apiURL}`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            });
            
            console.log('글 삭제 성공', response.data);
        } catch (error) {
            console.error('글 삭제 실패', error);
        } finally {
            setOpenSecondModal(true);
            setopenFirstModal(false);  
        }
    };

    const moveTo = () => {
        setOpenSecondModal(false)
        navigate({moveToUrl});
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
                onClickHandler={onDeletePost}
                variant={VERSIONS.VER3}
            />

            <CustomModal
                openModal={openSecondModal} 
                closeModal={moveTo}

                boldface='글 삭제'
                regular='글이 삭제되었습니다.'
                variant={VERSIONS.VER2}
            />
        </>
    );
};

export default optionMenu;
