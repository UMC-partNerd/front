import {
    
  CollabName,
  Row,
  ChatRoomContainer,
  ChatContainer,
  LastChat,
  Time,
} from "../styled-components/chat/chat-room";
  
  const ChatRoom = () =>{
    // 채팅 목록 - 요소
    const renderRoomDoor = () => (
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

    // 채팅 방 - 개인인
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
  
  export default ChatRoom;