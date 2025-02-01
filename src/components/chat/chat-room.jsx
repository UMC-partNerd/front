import {
  RoomTitle,
  Explain,
  Date,
  ChatWrap,
  InputMessage
} from "../../styled-components/chat/chat-room";

export const TYPES = {
  PERSONAL: 'personal',
  COLLAB: 'collab',
};

function ChatRoom ({ who,collabName, date })  {
  const renderChatRoom = () => {
    switch (type) {
      case TYPES.PERSONAL:
        return (
          <>
            <RoomTitle>{who}하디디</RoomTitle>
            <Date>{date}2025년 1월 6일</Date>

            <ChatWrap>
              <Bubble who='left'>
                안녕하세요
              </Bubble>
              <Bubble who='right'>
                안녕하세요
              </Bubble>
            </ChatWrap>
            <InputMessage>
              메시지를 입력하세요
              <img src="/send.png" alt="전송" />
            </InputMessage>
          </>
        );

      case TYPES.COLLAB:        
        return (
          <>
            <RoomTitle>{who}UMC</RoomTitle>
            <Explain>
              [{collabName}2025 IT 컨퍼런스] 콜라보레이션 채팅에서 협업 관련 세부 계획에 대한 논의를 시작해보세요.
            </Explain>

            <Date>{date}2025년 1월 6일</Date>

            <ChatWrap>
              <Bubble who='left'>
                안녕하세요!연합 해커톤에 대해서 질문있습니다.
              </Bubble>
              <Bubble who='right'>
                네! 반가워요
              </Bubble>
            </ChatWrap>
            <InputMessage>
              메시지를 입력하세요
              <img src="/send.png" alt="전송" />
            </InputMessage>    </>
        );
      }
    };

  return renderChatRoom();
}

export default ChatRoom;