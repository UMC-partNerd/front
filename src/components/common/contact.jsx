import styled from "styled-components";
import ButtonBlue from "../mypage/button_blue";
import { useLocation } from "react-router-dom";
import ButtonWhite from "../mypage/button_white";

//contact 컴포넌트 
const PersonalContact = () =>{
    const location = useLocation();

    const isPersonalPage = location.pathname === "/mypage/personal-page";

    return(
        <Container>
            <SubContainer>
            <ImageComp />
            <NameField>
                <Name>이름</Name>
                <Explan>설명</Explan>
            </NameField>
            </SubContainer>
            {isPersonalPage ? (
        <ButtonBlue style={{ width: "60px", height: "15px" }}>채팅</ButtonBlue>
            ) : (
                <ButtonWhite style={{ width: "60px", height: "15px" }}>채팅</ButtonWhite>
                
            )}
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