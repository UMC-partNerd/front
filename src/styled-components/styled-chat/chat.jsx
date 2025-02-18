import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    gap: 30px;
    margin: 40px;
    font-family: "Pretendard-Regular";
    width: 100%;
    padding: 8px;

`;

export const Sidebar = styled.div`
    flex-shrink: 0;
    width: 25%; 
    height: 100vh;
    border-radius: 16px;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const TabMenu = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
`;

export const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: ${({ active }) => (active ? "700" : "500")};
    line-height: normal;
    color: ${({ active }) => (active ? "#0D29B7" : "#C2C2C2")};
`;

export const ChatList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 85%;
    padding: 10px;
    overflow-y: auto;
`;

export const ChatItem = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
`;

export const Avatar = styled.img`
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    border-radius: 50%;
    margin-right: 10px;
`;

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 65%;
    height: 90vh;
    justify-content: flex-start;
`

export const ChatTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 16px;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    font-size: 32px;
    font-weight: 600;
    width: 100%;
`;

export const ChatRoomContainer = styled.div`
    background: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 100%;
`;

export const ChatHeader = styled.p`
    border-bottom: 1px solid #ddd;
    padding: 20px;
    color: #212121;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
`;

export const MessageWrapper = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const MessageContainer = styled.div`
  flex-grow: 1; /* ✅ 남은 공간을 자동 확장 */
  overflow-y: auto; /* ✅ 스크롤 가능 */
  width: 600px;
  height: 100%;
  background: white;
  border-radius: 0px;
  box-shadow: 0 2px 20px rgba (0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
`;

export const Message = styled.div`
    display: flex;
    justify-content: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
    align-items: center;
    margin: 10px 0;
    flex-direction: ${({ isMine }) => (isMine ? "row-reverse" : "row")};
`;

export const MessageBubble = styled.div`
    max-width: 70%;
    word-wrap: break-word;
    padding: 12px 16px;
    border-radius: ${({ isMine }) => (isMine ? "12px 12px 0px 12px" : "12px 12px 12px 0px")};
    background: ${({ isMine }) => (isMine ? "#0D29B7" : "#F3F3F3")}; 
    color: ${({ isMine }) => (isMine ? "#fff" : "#414141")};
`;

export const DateHeader = styled.div`
    text-align: center;
    margin: 10px 0;
    padding: 8px 20px;
    border-radius: 50px;
    background: #F3F3F3;
    font-size: 14px;
    color: #707070;
`;

export const EmptyChat = styled.div`
    text-align: center;
    margin-top: 50px;
    color: gray;
`;

export const ChatInfo = styled.div`
  flex: 1;
`;

export const ChatName = styled.div`
    font-weight: bold;
    font-size: 16px;
    color: #333333;
`;

export const LastMessage = styled.div`
    font-size: 12px;
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
`;

export const ChatTime = styled.div`
    font-size: 12px;
    color: gray;
    text-align: right;
    min-width: 50px;
`;

export const MessageInput = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #E1E1E1;
    background: #FFFFFF;
    width: 100%;
    margin-top: 10px;
`;

export const Input = styled.input`
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 25px;
    outline: none;
    background: white;
    font-size: 14px;
`;

export const SendButton = styled.button`
    padding: 10px 16px;
`;