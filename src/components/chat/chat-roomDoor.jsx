import {
  DoorWrap,
  CollabName,
  DoorContainer,
  Profile,
  Row,
  Who,
  ChatContainer,
  LastChat,
  Time,
} from "../../styled-components/chat/chat-roomDoor";

export const TYPES = {
  PERSONAL: 'personal',
  COLLAB: 'collab',
};

function ChatRoomDoor({ collabName, profile, who, lastChat, time, type }) {
  const renderChatRoomDoor = () => {
    switch (type) {
      case TYPES.PERSONAL:
        return (
          <DoorContainer type={type}>
            <Profile>
              <img src={profile} alt={who} />
            </Profile>
            <Row>
              <Who>{who}</Who>
              <ChatContainer>
                <LastChat>{lastChat}</LastChat>
                <Time>{time}</Time>
              </ChatContainer>
            </Row>
          </DoorContainer>
        );

      case TYPES.COLLAB:        
        return (
          <DoorWrap type={type}>
            <CollabName>{collabName}</CollabName>
            
            <DoorContainer>
              <Profile>
                <img src={profile} alt={who} />
              </Profile>
              <Row>
                <Who>{who}</Who>
                <ChatContainer>
                  <LastChat>{lastChat}</LastChat>
                  <Time>{time}</Time>
                </ChatContainer>
              </Row>
            </DoorContainer>
          </DoorWrap>
        );
      }
    };

  return renderChatRoomDoor();
}

export default ChatRoomDoor;