import React, { useState } from 'react';
import Modal from 'react-modal';
import {
    Background,
    Cancel,
    ModalContainer,
    Boldface,
    Regular,
    ButtonContainer,
    Button,
} from '../styled-components/styled-Modal';

export const VERSIONS = {
    VER1: 'ver1',   // 파랑 버튼 1개, x 버튼 // 요청 취소 알림 모달
    VER2: 'ver2',   // 회색 버튼 1개
    VER3: 'ver3'    // 버튼 2개
};

export const COLORS = {
    BLUE: 'blue', 
    GRAY: 'gray'
};

// Set the root element for the modal (important for accessibility)
Modal.setAppElement('#root');

function CustomModal ({ label, boldface, regular, btn, variant, openModal, setOpenModal }) {
    const closeModal = () => setOpenModal(false);

    const renderVer3Modal = () => (
        <Modal 
            isOpen={openModal}
            onRequestClose={closeModal}
            style={Background}
            ariaHideApp={false}     // appElement 숨김 여부
            contentLabel= {label}   // 스크린더 사용자에게 전달되는 문자열
            shouldCloseOnOverlayClick={false}
        >
            <Cancel onClick={closeModal}>x</Cancel>
            <ModalContainer>
                <Boldface>취소된 콜라보레이션 요청</Boldface>
                <Regular>다른 동아리와 협업해볼까요?</Regular>
                <ButtonContainer>
                    {/* 페이지 이동 onClick={} 추가 */}
                    <Button>콜라보레이션 보러가기</Button>
                </ButtonContainer>
            </ModalContainer>
        </Modal>
    );

    const renderVer2Modal = () => (
        <Modal 
            isOpen={openModal}
            onRequestClose={closeModal}
            style={Background}
            ariaHideApp={false}
            contentLabel= {label}
            shouldCloseOnOverlayClick={false}
        >
            <ModalContainer>
                <Boldface>{boldface}</Boldface>
                <Regular>{regular}</Regular>
                <ButtonContainer>
                    <Button onClick={closeModal}>닫기</Button>
                </ButtonContainer>
            </ModalContainer>
        </Modal>
    );

    const renderVer1Modal = () => (
        <Modal 
            isOpen={openModal}
            onRequestClose={closeModal}
            style={Background}
            ariaHideApp={false}
            contentLabel= {label}
            shouldCloseOnOverlayClick={false}
        >
            <ModalContainer>
                <Boldface>{boldface}</Boldface>
                <Regular>{regular}</Regular>
                <ButtonContainer>
                    {/* onClick={} 수정 필요 */}
                    <Button onClick={closeModal}>돌아가기</Button>
                    <Button onClick={closeModal}>{btn}</Button>
                </ButtonContainer>
            </ModalContainer>
        </Modal>
    );

    if (variant === VERSIONS.VER3) {
        return renderVer3Modal();
    }

    if (variant === VERSIONS.VER2) {
        return renderVer2Modal();
    }

    return renderVer1Modal();
};

export default CustomModal;