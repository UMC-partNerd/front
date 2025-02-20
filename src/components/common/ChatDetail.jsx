import { SubContainer, ImageComp, ChatButton, ChatWrapp, Title, Name, Explan, NameField } from "../../styled-components/Styled-Chat";

const ChatDetails = () =>{
    return(
        <SubContainer>
            <ImageComp />
            <NameField>
                <Name>이름</Name>
                <Explan>설명</Explan>
            </NameField>
        </SubContainer>
    )
}

export default ChatDetails;