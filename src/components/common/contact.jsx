// import {
//     Name,
//     Explan,
//     SubContainer,
//     NameField,
//     Container,
//     ImageComp
// } from "../../styled-components/common-styles/styled-contact";
import { useLocation } from "react-router-dom";
import Button, { TYPES } from "../common/button";

//contact 컴포넌트 
const PersonalContact = ({profileImageUrl, nickname, explan, intro}) =>{
    const location = useLocation();
    const isPersonalPage = location.pathname === "/mypage/personal-page";

    const onClickHandler = () => {
    
    };

    return(
        <Container>
            <LeftContainer>
                <SubContainer>
                    <ImageComp 
                    src={profileImageUrl}
                        alt = "프로필 이미지"
                    />
                    <NameField>
                        <Name>{nickname || "이름 없음"}</Name>
                        <Explan>{explan||"설명"}</Explan>
                    </NameField>
                </SubContainer>
            {isPersonalPage ? (
                <Button
                    styled={{fontSize:'5px'}}
                    type={TYPES.YES}
                    text='채팅'
                    onClick={onClickHandler}
                />
            ) : (
                <Button
                    styled={{fontSize:'5px'}}
                    type={TYPES.YES}
                    text='채팅'
                    onClick={onClickHandler}
                />
            )}
            
            </LeftContainer>
            {intro && <>
                        <Divider />
                        <IntroText>{intro}</IntroText>
                    </>}
        </Container>
    )
}

const LeftContainer = styled.div`
display:flex;
flex-direction:row;
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
margin-left:20px;
`

const Container = styled.main`
width: 100%;
height: 110px;
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
border-radius: 8px;
display:flex;
flex-direction:column;
align-items:center;
padding:10px 20px 10px 20px;
box-sizing: border-box;
justify-content: space-between;
margin-bottom:50px;
`

const ImageComp = styled.img`
object-fit: cover;
border-radius: 50%;
background:gray;
min-width: 70px; /* 최소 너비를 고정 */
  max-width: 70px; /* 최대 너비를 고정 */
  min-height: 70px; /* 최소 높이를 고정 */
  max-height: 70px; /* 최대 높이를 고정 */
`

export default PersonalContact;