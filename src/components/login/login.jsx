import styled from "styled-components"
import KakaoBtn from "./kakaoButton"

const LoginComp = () =>{
    return(
        <MainWrapp>
            <span>로고</span>
            <h4>새로운 성장을 파트너드와 함께!</h4>
            <Form >
                <Input placeholder='이메일을 입력해주세요!' type={'email'}  />
                <p style={{ color: 'red', marginTop: 0 }}></p>
                <Input placeholder='비밀번호를 입력해주세요!' type={'password'} />
                <p style={{ color: 'red', marginTop: 0 }}></p>
                <Submit value='로그인' type='submit' />
                <LinksWrapper>
                    <LinkText>이메일 찾기</LinkText>
                    <Divider>|</Divider>
                    <LinkText>비밀번호 찾기</LinkText>
                    <Divider>|</Divider>
                    <LinkText>회원가입</LinkText>
                </LinksWrapper>
        
                <DividerWithText>
                    <Line />
                    <TextInLine>다른 방법으로 로그인하기</TextInLine>
                    <Line />
                </DividerWithText>
                <KakaoBtn/>
            </Form>
        </MainWrapp>
    )
}

const Input = styled.input`
max-width:450px;
width: 80%;
height: 0.7em;
padding: 22px 28px;
gap: 10px;
background-color: #FFFFFF  !important;
border: 1px solid #C2C2C2;
border-radius: 4px;

`

const Submit = styled.input`
max-width:420px;
width: 100%;
height: 3.4em;
border-radius: 10px;
font-size:1em;
color:white;
background: #0D29B7;
border-radius: 4px;
border:none;

// background: ${(props) => (props.isValid ? '#FF073D' : 'gray')};

// cursor: ${(props) => (props.isValid ? 'pointer' : 'not-allowed')};
//     transition: background-color 0.3s;

//     &:disabled {
//         background: gray;
//     }
`


const Form = styled.form`
display:flex;
justify-content: center;
flex-direction: column;
align-items: center;
width:60%;
margin-top:20px;
`
const LinksWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 17px;
`;
const LinkText = styled.span`
    font-size: 0.5em;
    color:  #707070;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Divider = styled.span`
    margin: 0 8px;
    color: #c2c2c2;
`;

const DividerWithText = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0 20px;
`;

const Line = styled.div`
    flex: 1;
    height: 1px;
    background: #c2c2c2;
`;

const TextInLine = styled.span`
    margin: 0 10px;
    font-size: 0.5em;
    color: #707070;
    white-space: nowrap;
`;

const MainWrapp = styled.main`
justify-content:center;
align-items: center;
display:flex;
flex-direction:column;
width: 60vw;
max-width:2700px;
height: 85vh;
background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 16px;

`

export default LoginComp