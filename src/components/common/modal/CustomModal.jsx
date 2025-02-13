import React, { useState } from 'react';
import Modal from 'react-modal';
import {
    Background,
    ModalContainer,
    Boldface,
    Regular,
    ButtonContainer,
} from '../../../styled-components/styled-Modal';
import Button, { TYPES } from "../button";
import { useNavigate } from 'react-router-dom';

export const VERSIONS = {
    VER1: 'ver1',   // NEXT
    VER2: 'ver2',   // NO
    VER3: 'ver3'    // NO, YES
};

{/*
    import React, { useState } from 'react';
  import Button, { TYPES } from "../components/common/button";
  import CustomModal, { VERSIONS } from "../components/common/modal/CustomModal";
  import { useNavigate } from 'react-router-dom';

  // useNavigate 훅을 사용하여 이동 기능 추가
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/collaboration/collab-registration');
  };

  isLoading
  

    const [openModal, setopenModal] = useState(false);
  
   const [openFirstModal, setopenFirstModal] = useState(false);
    const [openSecondModal, setOpenSecondModal] = useState(false);
  
    // 버튼 클릭 시 모달1을 띄우는 함수
    const clubJoinHandler = () => {
      setopenFirstModal(true);
    };
  
    // 모달: 승인 함수
    const joinHandler = async () => {
      // 참여 요청 보내기
      // await api.joinClub();
  
      // 모달2 열기 
      setOpenSecondModal(true);
      // 모달1 닫기
      setopenFirstModal(false);
    };

  <Button
    type={TYPES.NEXT}
    text='동아리 참여하기'
    onClick={clubJoinHandler}
    /> 
    <CustomModal
    openModal={openFirstModal} 
    closeModal={() => setopenFirstModal(false)}

    boldface='동아리에 참여하시겠습니까?'
    regular='동아리 가입을 위해서는 동아리 리더진의 승인을 기다려야 합니다.'
    text='참여하기'
    onClickHandler={joinHandler}
    variant={VERSIONS.VER3}
    />

    <CustomModal
    openModal={openSecondModal} 
    closeModal={() => setOpenSecondModal(false)}

    boldface='동아리 참여 완료!'
    regular='동아리 가입 신청이 완료되었습니다. 승인 후 자동으로 참여됩니다.'
    variant={VERSIONS.VER2}
    />
// 팝업창 위치 지정 필요

*/}

//
Modal.setAppElement('#root');

// text, onClickHandler는 ver3(yes)에만 필요
function CustomModal ({ openModal, closeModal, boldface, regular, text, onClickHandler, variant }) {
    // 콜라보레이션 하러가기
    const navigate = useNavigate();
    const moveToColab = () => {
        navigate('/collaboration');
    };

    const renderVer1Modal = () => (
        <Modal 
            isOpen={openModal}
            onRequestClose={closeModal}
            style={Background}
            ariaHideApp={false}     // appElement 숨김 여부
            contentLabel= {boldface}   // 스크린더 사용자에게 전달되는 문자열
            shouldCloseOnOverlayClick={false}
        >
            <ModalContainer>
                <Boldface>{boldface}취소된 콜라보레이션 요청</Boldface>
                <Regular>{regular}다른 동아리와 협업해볼까요?</Regular>
                <ButtonContainer>
                    <Button
                        type={TYPES.NEXT}
                        text='콜라보레이션 하러 가기'
                        onClick={moveToColab}
                    />
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
            contentLabel= {boldface}
            shouldCloseOnOverlayClick={false}
        >
            <ModalContainer>
                <Boldface>{boldface}</Boldface>
                <Regular>{regular}</Regular>
                <ButtonContainer>
                    <Button
                        type={TYPES.NO}
                        text='닫기'
                        onClick={closeModal}
                    />
                </ButtonContainer>
            </ModalContainer>
        </Modal>
    );

    const renderVer3Modal = () => (
        <Modal 
            isOpen={openModal}
            onRequestClose={closeModal}
            style={Background}
            ariaHideApp={false}
            contentLabel= {boldface}
            shouldCloseOnOverlayClick={false}
        >
            <ModalContainer>
                <Boldface>{boldface}</Boldface>
                <Regular>{regular}</Regular>
                <ButtonContainer>
                    <Button
                        type={TYPES.NO}
                        text='돌아가기'
                        onClick={closeModal}
                    />
                    <Button
                        type={TYPES.YES}
                        text={text}
                        onClick={onClickHandler}
                    />
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