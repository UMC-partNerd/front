import styled from "styled-components"
import { DetailWrapp, ChatWrapp, GrayText, Title } from "../../styled-components/Styled-Chat";
import ChatDetails from "./ChatDetail";

//전체 멤버 리스트
const ChatListALL = () =>{
    return(
        <ChatWrapp style={{marginTop:'30px', height:'450px'}}>
            <TitleWrapp>
                <Title>전체멤버</Title>
                <GrayText style={{marginLeft:'20px'}}>nn명</GrayText>
            </TitleWrapp>
            <DetailWrapp>
            <ChatDetails/>
            <ChatDetails/>
            <ChatDetails/>
            <ChatDetails/>
            </DetailWrapp>
            

            <GrayText style={{ width:'100%'}}>더보기</GrayText>
            
        </ChatWrapp>
    )
}

//타이틀 컴포넌트
const TitleWrapp = styled.div`
display:flex;
flex-direction:row;
`

export default ChatListALL;