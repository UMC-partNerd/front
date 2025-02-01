import React from 'react';
import {
  RequestWrapper,
  Profile,
  OtherUser,
  Cancel,
  Message,
  Button,
  Time
} from '../styled-components/styled-Request';

export const TYPES = {
  SENDTO: 'sendto',
  RECEIVETO: 'receiveto',
};

function Request({ profile, otherUser, title, time, message, type }) {
  const renderSendtoRequest = () => (
    <RequestWrap>
      <Profile>{profile}</Profile>
      <OtherUser>{otherUser}</OtherUser>
      <Cancel>취소하기</Cancel>
      <Message>"{title}"에 대하여 협업 요청을 보냈습니다.</Message>
      <Button>게시글 보러가기</Button>
      <Button>콜라보레이션 채팅</Button>
    </RequestWrap>
  );

  const renderReceivetoRequest = () => (
    <RequestWrap>
      <Profile>{profile}</Profile>
      <OtherUser>{otherUser}</OtherUser>
      <Message>"{title}"에 대하여 협업 요청을 받았습니다.</Message>
      <Button>게시글 보러가기</Button>
      <Button>콜라보레이션 채팅</Button>
    </RequestWrap>
  );

  // 채팅 목록 컴포넌트
  const renderDefaultRequest = () => (
    <RequestWrap>
      <Profile>{profile}</Profile>
      <OtherUser>{otherUser}</OtherUser>
      <Time>{time}</Time>
      <Message>{message}</Message>
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