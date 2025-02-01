import {
  BubbleContainer,
  Profile,
  Row,
  Who,
  Message  
} from "../styled-components/chat/chat-bubble";

export const POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};

function ChatBubble ({ position }) {

  const renderBubble = () => {
     switch (position) {
      case POSITIONS.LEFT:
        return (
          <BubbleContainer position={position}>
            <Profile>
              <img src={profile} alt={who} />
            </Profile>
            <Row>
              <Who>{who}</Who>
              <Message>{message}</Message>
            </Row>
          </BubbleContainer>
        );
    
      case POSITIONS.RIGHT:
        return (
          <BubbleContainer position={position}>
            <Row>
              <Who>{who}</Who>
              <Message>{message}</Message>
            </Row>
            <Profile>
              <img src={profile} alt={who} />
            </Profile>
          </BubbleContainer>
        );
      }
    };

  return renderBubble();
}

export default ChatBubble;