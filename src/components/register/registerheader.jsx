import styled from "styled-components"
import { Form, FieldGroup, Subup, Input, Subdown } from "../../styles/registerstyles"
import { useState } from "react"
import { useEffect } from "react"

const RegisterHeader = ({onChange }) => {
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        nickname: "",
    });

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);
        onChange(updatedData); // 부모로 데이터 전달
    };

    const handleSubmit = () => {
        onFormSubmit(formData);
    };

    useEffect(() => {
        // 로컬 스토리지에서 이메일 가져오기
        const storedEmail = localStorage.getItem("kakao_email");
        if (storedEmail) {
            setFormData((prev) => ({ ...prev, email: storedEmail }));
        }
    }, []);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    return (
        <Form>
            <h3 style={{ marginBottom: '50px' }}>반가워요! 기본 정보를 입력해주세요</h3>
            <FieldGroup>
                <Subup>이름</Subup>
                <Input placeholder="이름(실명)을 입력해주세요" type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
                <Subdown>타인 명의로 가입 시 계정이 정지되고 재가입이 불가능합니다.</Subdown>
            </FieldGroup>

            <FieldGroup>
                <Subup>생년월일</Subup>
                <Input placeholder="예) 20001101"
                type="text"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                />
                <Subdown>년 / 월 / 일을 입력해주세요.</Subdown>
            </FieldGroup>

            <FieldGroup>
                <Subup>닉네임</Subup>
                <Input placeholder="2자 이상 입력해주세요" 
                type="text"
                name="nickname" 
                value={formData.nickname}
                onChange={handleChange}
                />
                <Subdown>닉네임은 중복일 수 없습니다.</Subdown>
            </FieldGroup>

            <FieldGroup>
                <Subup>이메일</Subup>
                <Input placeholder="이메일을 입력해주세요" 
                type="text"
                name="email" 
                value={formData.email}
                // onChange={handleChange}
                />
                <Subdown>닉네임은 중복일 수 없습니다.</Subdown>
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