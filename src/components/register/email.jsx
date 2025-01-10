import React, {useState} from "react";
import { Form, FieldGroup, Subup, Input } from "../../styles/registerstyles"
import styled from "styled-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const RegisterEmail = () =>{
    const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 보기 상태
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // 비밀번호 확인 보기 상태


    return(
        <Form >
                <FieldGroup>
                    <Subup>이메일</Subup>
                    <Input placeholder="이메일을 입력해주세요" type="email" />
                </FieldGroup>

                <FieldGroup>
                    <Subup>비밀번호</Subup>
                    <Input
                        placeholder="영문, 숫자, 특수문자를 8자 이상 조합하여 입력해주세요"
                        type={passwordVisible ? "text" : "password"}
                    />
                    <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </IconButton>

                </FieldGroup>

                <FieldGroup>
                    <Subup>비밀번호 확인</Subup>
                    <Input
                        placeholder="영문, 숫자, 특수문자를 8자 이상 조합하여 입력해주세요"
                        type={confirmPasswordVisible ? "text" : "password"}
                    />
                    <IconButton
                        onClick={() =>
                            setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                    >
                        {confirmPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </IconButton>
                </FieldGroup>
            </Form>
    )
}


const IconButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #888;

    &:hover {
        color: #555;
    }
`;

export default RegisterEmail;