import styled from "styled-components";
import ButtonBlue from "./button_blue";

const PersonalContact = () =>{
    return(
        <Container>
            <SubContainer>
            <ImageComp />
            <NameField>
                <Name>이름</Name>
                <Explan>설명</Explan>
            </NameField>
            </SubContainer>
            <ButtonBlue style={{width:'60px', height:'15px'}}>채팅</ButtonBlue>
        </Container>
    )
}

const Name = styled.div`
font-size:16px;
`

const Explan = styled.div`
margin-top:10px;
font-size:14px;
`

const SubContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`

const NameField = styled.div`
display:flex;
flex-direction:column;
margin-left:20px;
`

const Container = styled.main`
width: 100%;
height: 110px;
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
border-radius: 8px;
display:flex;
flex-direction:row;
align-items:center;
padding:10px 20px 10px 20px;
box-sizing: border-box;
justify-content: space-between;
margin-bottom:50px;
`

const ImageComp = styled.div`
border-radius: 50%;
background:gray;
min-width: 70px; /* 최소 너비를 고정 */
  max-width: 70px; /* 최대 너비를 고정 */
  min-height: 70px; /* 최소 높이를 고정 */
  max-height: 70px; /* 최대 높이를 고정 */
`

export default PersonalContact;