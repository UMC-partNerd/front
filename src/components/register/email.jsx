import React, {useState} from "react";
import { Form, FieldGroup, Subup, Input , InputPass} from "../../styles/registerstyles"
import styled from "styled-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const RegisterEmail = () =>{
    // 비밀번호 상태
    const [passwordType, setPasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(<FaRegEyeSlash size={15} />);

    // 비밀번호 확인 상태
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(<FaRegEyeSlash size={15} />);

    const handleTogglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            setPasswordIcon(<FaRegEye size={15} />);
        } else {
            setPasswordType('password');
            setPasswordIcon(<FaRegEyeSlash size={15} />);
        }
    };

    const handleToggleConfirmPassword = () => {
        if (confirmPasswordType === 'password') {
            setConfirmPasswordType('text');
            setConfirmPasswordIcon(<FaRegEye size={15} />);
        } else {
            setConfirmPasswordType('password');
            setConfirmPasswordIcon(<FaRegEyeSlash size={15} />);
        }
    };

    return(
        <Form >
                <FieldGroup>
                    <Subup>이메일</Subup>
                    <Input placeholder="이메일을 입력해주세요" type="email" />
                </FieldGroup>

                <FieldGroup>
                    <Subup>비밀번호</Subup>
                    <PasswordWrapper>
                        <InputPass
                            placeholder="영문, 숫자, 특수문자를 8자 이상 조합하여 입력해주세요"
                            type={passwordType}
                        />
                        <IconButton onClick={handleTogglePassword}>
                        {passwordIcon}
                        </IconButton>
                    </PasswordWrapper>
                </FieldGroup>
                

                <FieldGroup>
                    <Subup>비밀번호 확인</Subup>
                    <PasswordWrapper>
                    <InputPass
                        placeholder="영문, 숫자, 특수문자를 8자 이상 조합하여 입력해주세요"
                        type={confirmPasswordType}
                    />
                    <IconButton onClick={handleToggleConfirmPassword}>
                        {confirmPasswordIcon}
                    </IconButton>
                    </PasswordWrapper>
                </FieldGroup>
            </Form>
    )
}

const PasswordWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
    
    width: 100%;
    padding: 0 19px 0 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    color: #333;
    outline: none;
    transition: all 0.3s ease;

    &::placeholder {
        font-size: 11px; 
        color: #C2C2C2;

    }

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    }


    input:-webkit-autofill {
    background-color: white !important; /* 배경색을 원하는 색으로 설정 */
    color: inherit !important; /* 글자색 유지 */
    box-shadow: 0 0 0px 1000px white inset !important; /* 배경색 덮어쓰기 */
    
    transition: background-color 5000s ease-in-out 0s; /* 배경색 애니메이션 제거 */
}

`;

// const StyledInput = styled(Input)`
//     padding-right: 40px; /* 아이콘과 겹치지 않도록 여백 추가 */
// `;


const IconButton = styled.span`
    cursor:pointer;
`;

export default RegisterEmail;