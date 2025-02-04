import React from "react";
import styled from "styled-components";
import { Form } from "../../styles/registerstyles"
import { useState } from "react";

const Agreement = ({ onChange, onAgreementCheck}) => {
    const [agreements, setAgreements] = useState({
        isAdult: false,
        termsOfService: false,
        personalInfoUsage: false,
        optionalInfoUsage: false,
        marketingConsent: false,
        marketingNotify: false,
    });

     // 모든 항목이 체크되었는지 확인하는 함수
    const isAllChecked = Object.values(agreements).every(Boolean);


    // const handleChange = (e) => {
    //     setAgreements({
    //         ...agreements,
    //         [e.target.name]: e.target.checked,
    //     });
    // };
    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "all") {
            // 전체 동의가 눌리면 모든 항목을 해당 상태로 변경
            const newAgreements = Object.keys(agreements).reduce((acc, key) => {
                acc[key] = checked;
                return acc;
            }, {});

            setAgreements(newAgreements);
            onChange(newAgreements);
            onAgreementCheck(Object.values(newAgreements).every(Boolean)); // 모든 항목이 체크되었는지 전달
        } else {
            // 개별 체크박스가 변경될 때
            const updatedAgreements = { ...agreements, [name]: checked };
            setAgreements(updatedAgreements);
            onChange(updatedAgreements);
            onAgreementCheck(Object.values(updatedAgreements).every(Boolean)); // 변경 후 모든 항목 체크 여부 확인
        }
    };

    return (
        <Form>
            <AgreeLine style={{ marginBottom: '0px' }}>
                <Title>약관 전체 동의</Title>
                <Checkbox type="checkbox" name="all" checked={isAllChecked} onChange={handleChange}/>
            </AgreeLine>
            <StyledHr />

            <AgreeLine>
                <Title>만 14세 이상입니다 (필수)</Title>
                <Checkbox type="checkbox" name="isAdult" checked={agreements.isAdult} onChange={handleChange}/>
            </AgreeLine>
            <AgreeLine>
                <Title>이용약관 동의 (필수)</Title>
                <Checkbox type="checkbox" name="termsOfService" checked={agreements.termsOfService} onChange={handleChange} />
            </AgreeLine>
            <AgreeLine>
                <Title>개인정보 수집 및 이용 동의 (필수)</Title>
                <Checkbox type="checkbox" name="personalInfoUsage" checked={agreements.personalInfoUsage} onChange={handleChange}/>
            </AgreeLine>
            <AgreeLine>
                <Title>선택정보 수집 및 이용 동의 (필수)</Title>
                <Checkbox type="checkbox" name="optionalInfoUsage" checked={agreements.optionalInfoUsage} onChange={handleChange} />
            </AgreeLine>
            <AgreeLine>
                <Title>개인정보 마케팅 활용 동의 (필수)</Title>
                <Checkbox type="checkbox" name="marketingConsent" checked={agreements.marketingConsent} onChange={handleChange} />
            </AgreeLine>
            <AgreeLine>
                <Title>마케팅 알림 수신 동의 (필수)</Title>
                <Checkbox type="checkbox" name="marketingNotify" checked={agreements.marketingNotify} onChange={handleChange} />
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