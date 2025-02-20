import React, { useState } from 'react';
import Modal from 'react-modal';
import {
    RequestContainer,
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


    <Request
        who={who}
        club={club}
        onClickPost={onClickPost}
        onClickChat={onClickChat}
        to={TO.SEND}
    />
*/}

function Request ({ profile, who, club, onClickPost, onClickChat, to }) {
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
        <RequestContainer 
            isOpen={request}
            onRequestClose={onCencel}
            ariaHideApp={true}
            contentLabel= "협업 요청"
            shouldCloseOnOverlayClick={false}
        >
            <Button
                type={TYPES.CANCEL}
                onClick={onCencel}
            />

            <ProfileWrapp>
                <Profile>
                    <img src={profile}/>
                </Profile>
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
        </RequestContainer>
    );

    const renderToReceive = () => (
        <RequestContainer 
            isOpen={request}
            onRequestClose={onCencel}
            ariaHideApp={true}
            contentLabel= "협업 요청"
            shouldCloseOnOverlayClick={false}
        >

            <ProfileWrapp>
                <Profile>
                    <img src={profile}/>
                </Profile>
                <Boldface>{who}UMC</Boldface>
            </ProfileWrapp>
            <Regular>'{club}IT 컨퍼런스'에 대하여 협업 요청을 보냈습니다.</Regular>
            <ButtonContainer>
                <Button
                    width='120px' 
                    height='28px' 
                    fontSize='12px'
                    type={TYPES.NO}
                    text='게시글 보러가기'
                    onClick={onClickPost}
                />
                <Button
                    width='120px' 
                    height='28px' 
                    fontSize='12px' 
                    type={TYPES.YES}
                    text='콜라보레이션 채팅'
                    onClick={onClickChat}
                />
            </ButtonContainer>
        </RequestContainer>
    );

    if (TO === TO.SEND) {
        return renderToSend();
    }

    return renderToReceive();
};

export default Request;