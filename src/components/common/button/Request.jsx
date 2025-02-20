import React, { useState } from 'react';
import Modal from 'react-modal';
import {
    Background,
    ProfileWrapp,
    Profile,
    Boldface,
    Regular,
    ButtonContainer,
} from '../../../styled-components/button/styled-Request';
import Button, { TYPES } from "./button";
import { useNavigate } from 'react-router-dom';

export const TO = {
    SEND: 'Send',       // 송신
    RECEIVE: 'Receive', // 수신
};

{/*
    import React, { useState } from 'react';
  import Button, { TYPES } from "../components/common/button";
  import Request, { VERSIONS } from "../components/common/modal/Request";
  import { useNavigate } from 'react-router-dom';

  // useNavigate 훅을 사용하여 이동 기능 추가
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/collaboration/collab-registration');
  };

  isLoading
  

    const [openModal, setOpenModal] = useState(false);
  
   const [openFirstModal, setopenFirstModal] = useState(false);
    const [openSecondModal, setOpenSecondModal] = useState(false);
  
    // 버튼 클릭 시 모달1을 띄우는 함수
    const buttonHandler = () => {
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

    <Request
    openModal={openFirstModal} 
    closeModal={() => setopenFirstModal(false)}

    boldface='동아리에 참여하시겠습니까?'
    regular='동아리 가입을 위해서는 동아리 리더진의 승인을 기다려야 합니다.'
    text='참여하기'
    onClickHandler={joinHandler}
    variant={VERSIONS.VER3}
    />

    <Request
    openModal={openSecondModal} 
    closeModal={() => setOpenSecondModal(false)}

    boldface='동아리 참여 완료!'
    regular='동아리 가입 신청이 완료되었습니다. 승인 후 자동으로 참여됩니다.'
    variant={VERSIONS.VER2}
    />
// 팝업창 위치 지정 필요

*/}

function Request ({ who, club, onClickPost, onClickChat, to }) {
    const [request, setRequest] = useState(true);

    const onCencel = () => {
        // 요청 취소 동작

        setRequest(false);
    };
    
    const navigate = useNavigate();
    const moveToColab = () => {
        navigate('/collaboration');
    };

    const renderToSend = () => (
        <Modal 
            isOpen={request}
            onRequestClose={onCencel}
            style={Background}
            ariaHideApp={true}
            contentLabel= "협업 요청"
            shouldCloseOnOverlayClick={false}
        >
            <Button
                type={TYPES.CANCEL}
                onClick={onCencel}
            />

            <ProfileWrapp>
                <Profile></Profile>
                <Boldface>{who}</Boldface>
            </ProfileWrapp>
            <Regular>'{club}'에 대하여 협업 요청을 보냈습니다.</Regular>
            <ButtonContainer>
                <Button
                    type={TYPES.NO}
                    text='게시글 보러가기'
                    onClick={onClickPost}
                />
                <Button
                    width='20px' 
                    height='32px' 
                    fontSize='16px' 
                    type={TYPES.YES}
                    text='콜라보레이션 채팅'
                    onClick={onClickChat}
                />
            </ButtonContainer>
        </Modal>
    );

    const renderToReceive = () => (
        <Modal 
            isOpen={request}
            onRequestClose={onCencel}
            style={Background}
            ariaHideApp={true}
            contentLabel= "협업 요청"
            shouldCloseOnOverlayClick={false}
        >

            <ProfileWrapp>
                <Profile></Profile>
                <Boldface>{who}</Boldface>
            </ProfileWrapp>
            <Regular>'{club}'에 대하여 협업 요청을 보냈습니다.</Regular>
            <ButtonContainer>
                <Button
                    width='120px' 
                    height='32px' 
                    fontSize='20px' 
                    type={TYPES.NO}
                    text='게시글 보러가기'
                    onClick={onClickPost}
                />
                <Button
                    width='120px' 
                    height='32px' 
                    fontSize='20px' 
                    type={TYPES.YES}
                    text='콜라보레이션 채팅'
                    onClick={onClickChat}
                />
            </ButtonContainer>
        </Modal>
    );

    if (TO === TO.SEND) {
        return renderToSend();
    }

    return renderToReceive();
};

export default Request;