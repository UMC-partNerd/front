import {
    Name,
    Explan,
    SubContainer,
    NameField,
    Container,
    ImageComp
} from "../../styled-components/common-styles/styled-contact";
import { useLocation } from "react-router-dom";
import Button, { TYPES } from "../common/button";

//contact 컴포넌트 
const PersonalContact = () =>{
    const location = useLocation();
    const isPersonalPage = location.pathname === "/mypage/personal-page";

    const onClickHandler = () => {
    
    };

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
                <Button
                    type={TYPES.PLUS}
                    text='채팅'
                    onClick={onClickHandler}
                />
            ) : (
                <Button
                    type={TYPES.PLUS}
                    text='채팅'
                    onClick={onClickHandler}
                />
            )}
        </Container>
    )
}

export default PersonalContact;