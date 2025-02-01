import React from "react";
import styled from "styled-components";
import { Form } from "../../styles/registerstyles"
import { useState } from "react";

const Agreement = ({ onChange }) => {
    const [agreements, setAgreements] = useState({
        isAdult: false,
        termsOfService: false,
        personalInfoUsage: false,
        optionalInfoUsage: false,
        marketingConsent: false,
        marketingNotify: false,
    });

    // const handleChange = (e) => {
    //     setAgreements({
    //         ...agreements,
    //         [e.target.name]: e.target.checked,
    //     });
    // };
    const handleChange = (e) => {
        const { name, checked } = e.target;
        const updatedAgreements = { ...agreements, [name]: checked };
        setAgreements(updatedAgreements);
        onChange(updatedAgreements); // 부모로 데이터 전달
    };

    const handleSubmit = () => {
        onSubmit(agreements);
    };
    return (
        <Form>
            <AgreeLine style={{ marginBottom: '0px' }}>
                <Title>약관 전체 동의</Title>
                <Checkbox type="checkbox" />
            </AgreeLine>
            <StyledHr />

            <AgreeLine>
                <Title>만 14세 이상입니다 (필수)</Title>
                <Checkbox type="checkbox" />
            </AgreeLine>
            <AgreeLine>
                <Title>이용약관 동의 (필수)</Title>
                <Checkbox type="checkbox" />
            </AgreeLine>
            <AgreeLine>
                <Title>개인정보 수집 및 이용 동의 (필수)</Title>
                <Checkbox type="checkbox" />
            </AgreeLine>
            <AgreeLine>
                <Title>선택정보 수집 및 이용 동의 (필수)</Title>
                <Checkbox type="checkbox" />
            </AgreeLine>
            <AgreeLine>
                <Title>개인정보 마케팅 활용 동의 (필수)</Title>
                <Checkbox type="checkbox" />
            </AgreeLine>
            <AgreeLine>
                <Title>마케팅 알림 수신 동의 (필수)</Title>
                <Checkbox type="checkbox" />
            </AgreeLine>

            
        </Form>
    )
}

const AgreeLine = styled.div`
width:100%;
display:flex;
justify-content:space-between;
margin-bottom:20px;

`

const Title = styled.span`
font-family: 'Pretendard';
font-style: normal;
font-weight: 600;
font-size: 13px;
letter-spacing: -0.02em;
color: #212121;
`

const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #0047ff;
`



const StyledHr = styled.hr`
    width: 100%;
    border: none; /* 기본 테두리 제거 */
    border-top: 1px solid #ddd; /* 상단 선 추가 */
    
`;

export default Agreement;