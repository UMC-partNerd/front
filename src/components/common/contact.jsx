import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Button, { TYPES } from "../common/button";
import { useNavigate } from "react-router-dom";
import useContectChat from "../../hooks/useChatContect";

//contact 컴포넌트 
const PersonalContact = ({profileImageUrl, nickname, explan, intro}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    const isPersonalPage = location.pathname === "/mypage/personal-page";
    const {startChat, loading, error} = useContectChat();


    return(
        <Container>
            <TopContainer>
                {/* 이미지 */}
                <ImageComp 
                        src={profileImageUrl}
                            alt = "프로필 이미지"
                        />
                <CenterContainer>
                        <NameField>
                            <Name>{nickname || "이름 없음"}</Name>
                            <Explan>{explan||"설명"}</Explan>
                        </NameField>
                    
                </CenterContainer>
                {isPersonalPage ? (
                    <ButtonWrapper>
                    <Button
                        styled={{fontSize:'5px'}}
                        type={TYPES.YES}
                        text='채팅'
                        //onClick={() => navigate("/chat")}
                        onClick={() => startChat("사이먼")}
                    /></ButtonWrapper>
                ) : (
                    <ButtonWrapper>
                    <Button
                        styled={{fontSize:'5px'}}
                        type={TYPES.YES}
                        text='채팅'
                        onClick={() => startChat(nickname)} // nickname 전달
                        disabled={loading}
                    /></ButtonWrapper>
                )}
            </TopContainer>
            
            {intro && <BottomContainer>
                        <Divider />
                        <IntroText>{intro}</IntroText>
                    </BottomContainer>}
        </Container>
    )
}

const BottomContainer = styled.div`
display:flex;
width:62%;
flex-direction:column;

`

const ButtonWrapper = styled.div`
    margin-left: auto; /* 버튼을 오른쪽 끝으로 이동 */
`;

const TopContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
width: 100%;  
justify-content: flex-start; 

`

const CenterContainer = styled.div`
display:flex;
flex-direction:column;
`

const Divider = styled.hr`
    width: 100%;
    border: 0;
    border-top: 1px solid #ddd;
    margin: 8px 0;
`;


const IntroText = styled.p`
    font-size: 12px;
    color: #555;
    margin-top: 4px;
`;

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
margin-left:15px;
`

const Container = styled.main`
width: 100%;
max-width:405px;
height:auto;
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
border-radius: 8px;
display:flex;
flex-direction:column;
align-items:center;
padding:20px 20px 20px 20px;
box-sizing: border-box;
justify-content: space-between;
margin-bottom:50px;
`

const ImageComp = styled.img`
object-fit: cover;
border-radius: 50%;
background:gray;
width: 50px; /* 최소 너비를 고정 */
  max-width: 50px; /* 최대 너비를 고정 */
  min-height: 50px; /* 최소 높이를 고정 */
  max-height: 50px; /* 최대 높이를 고정 */
margin-left:0;
`

export default PersonalContact;