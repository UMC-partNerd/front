import React from 'react';
import {
  RequestWrap,
  IdContainer,
  Profile,
  ClubName,
  Cancel,
  Message,
  ButtonContainer,
  Button,
  CollabName,
  Row,
  ChatRoomContainer,
  ChatContainer,
  LastChat,
  Time
} from '../../styled-components/styled-Request';

export const TYPES = {
  SENDTO: 'sendto',
  RECEIVETO: 'receiveto',
};

function Request({ profile, clubName, collabName, lastChat, time }) {
  
  // 보낸 요청
  const renderSendtoRequest = () => (
    <RequestWrap>
      <IdContainer>
        <Profile>{profile}</Profile>
        <ClubName>{clubName}</ClubName>
      </IdContainer>

      <Cancel>취소하기</Cancel>
      <Message>"{collabName}"에 대하여 협업 요청을 보냈습니다.</Message>
      
      <ButtonContainer>
        <Button>게시글 보러가기</Button>
        <Button color='blue'>콜라보레이션 채팅</Button>
      </ButtonContainer>
    </RequestWrap>
  );

  // 받은 요청
  const renderReceivetoRequest = () => (
    <RequestWrap>
      <IdContainer>
        <Profile>{profile}</Profile>
        <ClubName>{clubName}</ClubName>
      </IdContainer>
      
      <Message>"{collabName}"에 대하여 협업 요청을 받았습니다.</Message>
      
      <ButtonContainer>
        <Button>게시글 보러가기</Button>
        <Button>콜라보레이션 채팅</Button>
      </ButtonContainer>
    </RequestWrap>
  );

  // 채팅 목록 컴포넌트
  const renderDefaultRequest = () => (
    <RequestWrap >
      <CollabName>{collabName}</CollabName>
      
      <ChatRoomContainer>
        <Profile type='user'>{profile}</Profile>
        <Row>
          <ClubName>{clubName}</ClubName>
          <ChatContainer>
            <LastChat>{lastChat}</LastChat>
            <Time>{time}</Time>
          </ChatContainer>
        </Row>
      </ChatRoomContainer>
    </RequestWrap>
  );
  
  if (type ===  TYPES.SENDTO) {
    return renderSendtoRequest();
  }

  if (type === TYPES.RECEIVETO) {
    return renderReceivetoRequest();
  }

  return renderDefaultRequest();
}

export default Request;