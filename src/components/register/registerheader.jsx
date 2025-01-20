import styled from "styled-components"
import { Form, FieldGroup, Subup, Input, Subdown } from "../../styles/registerstyles"

const RegisterHeader = () =>{
    return ( 
            <Form>
                <h3 style={{marginBottom:'50px'}}>반가워요! 기본 정보를 입력해주세요</h3>
                <FieldGroup>
                    <Subup>이름</Subup>
                    <Input placeholder="이름(실명)을 입력해주세요" type="name" />
                    <Subdown>타인 명의로 가입 시 계정이 정지되고 재가입이 불가능합니다.</Subdown>
                </FieldGroup>

                <FieldGroup>
                    <Subup>생년월일</Subup>
                    <Input placeholder="예) 20001101" type="birthday" />
                    <Subdown>년 / 월 / 일을 입력해주세요.</Subdown>
                </FieldGroup>

                <FieldGroup>
                    <Subup>닉네임</Subup>
                    <Input placeholder="2자 이상 입력해주세요" type="nickname" />
                </FieldGroup>
            </Form>
        
    )
}




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

export default RegisterHeader