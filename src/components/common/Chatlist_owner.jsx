import styled from "styled-components"
import { SubContainer, ImageComp, ChatButton, ChatWrapp, Title, Name, Explan, NameField, DetailWrapp } from "../../styled-components/Styled-Chat";
import ChatDetails from "./ChatDetail";

const ChatList = () =>{
    return(
        <ChatWrapp>
            <Title>운영진</Title>
            <DetailWrapp>
            <ChatDetails />
            <ChatDetails />
            </DetailWrapp>
            
            <ChatButton>채팅</ChatButton>
        </ChatWrapp>
    )
}

export default ChatList;