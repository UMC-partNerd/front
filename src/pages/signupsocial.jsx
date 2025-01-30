import Agreement from "../components/register/AgreementForm";
import RegisterHeader from "../components/register/registerheader";
import {MainWrapp} from "../styles/registerstyles" 
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpSocialPage = () =>{

    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [userData, setUserData] = useState({
        name: "",
        birthDate: "",
        nickname: "",
    });

    const [agreements, setAgreements] = useState({
        isAdult: false,
        termsOfService: false,
        personalInfoUsage: false,
        optionalInfoUsage: false,
        marketingConsent: false,
        marketingNotify: false,
    });

        // 사용자 데이터 업데이트
    const handleUserDataChange = (data) => {
        setUserData(data);
    };

    // 약관 데이터 업데이트
    const handleAgreementsChange = (data) => {
        setAgreements(data);
    };


    // 완료 버튼 클릭 시 데이터 전송
    const handleSubmit = async () => {
        try {
            const jwtToken = localStorage.getItem("jwtToken"); // JWT 토큰 불러오기
    
            if (!jwtToken) {
                alert("로그인이 필요합니다.");
                return;
            }
    
            const payload = {
                name: userData.name,
                birthDate: userData.birthDate,
                nickname: userData.nickname,
                agreements: {
                    isAdult: agreements.isAdult,
                    termsOfServices: agreements.termsOfService, // 수정
                    personalInfoUsage: agreements.personalInfoUsage,
                    optionalInfoUsage: agreements.optionalInfoUsage,
                    marketingConsent: agreements.marketingConsent,
                    marketingNotify: agreements.marketingNotify
                }
            };

            // 🔍 콘솔에서 전송 데이터 확인
            console.log("보내는 데이터: ", JSON.stringify(payload, null, 2));
    
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
    
            if (response.status === 200 && response.data.isSuccess) {
                console.log("회원가입 성공 데이터:", response.data); // 성공 데이터 확인
                alert("회원가입 성공!");
                navigate("/");
            } else {
                alert("회원가입 실패: " + response.data.message);
            }
        } catch (error) {
            console.error("회원가입 요청 오류:", error);
            alert("요청 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };


    return(
        <main className="loginPage">
            <MainWrapp>
                <RegisterHeader onChange={handleUserDataChange}/>
                <Agreement onChange={handleAgreementsChange}/>
                <CompleteButton onClick={handleSubmit}>완료</CompleteButton>
            </MainWrapp>
        </main>
    )
}

const CompleteButton = styled.button`
    width: 100%;
    height: 50px;
    color: white;
    font-family: 'Pretendard';
    font-size: 16px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    margin-top: 30px;
    background: #0D29B7;
    border-radius: 4px;
`;

export default SignUpSocialPage;