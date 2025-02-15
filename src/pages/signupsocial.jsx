import Agreement from "../components/register/agreementForm";
import RegisterHeader from "../components/register/registerheader";
import {MainWrapp} from "../styles/registerstyles" 
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
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
        isAdult: true,
        termsOfService: true,
        personalInfoUsage: true,
        optionalInfoUsage: true,
        marketingConsent: true,
        marketingNotify: true,
    });

    //닉네임 체크 상태
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    // 약관 체크 상태
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);

        // 사용자 데이터 업데이트
    const handleUserDataChange = (data) => {
        setUserData(data);
    };

    // 약관 데이터 업데이트
    const handleAgreementsChange = (data) => {
        setAgreements(data);
    };

    // 닉네임 체크 상태 업데이트
    const handleNicknameCheck = (isChecked) => {
        setIsNicknameChecked(isChecked);
    };

    // 약관 동의 상태 업데이트
    const handleAgreementCheck = (isChecked) => {
        setIsAgreementChecked(isChecked);
    };

    //입력 필드 채워진 경우, or 닉네임 체크 한 경우에만 버튼 활성화 로직 
    const isFormValid = userData.name && userData.birthDate && userData.nickname && isNicknameChecked && isAgreementChecked;


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

    // //값 제대로 넘어와지는지 체크
    // useEffect(() => {
    //     console.log("userData:", userData);
    //     console.log("isNicknameChecked:", isNicknameChecked);
    //     console.log("isAgreementChecked:", isAgreementChecked);
    
    //     const isValid =
    //         userData.name.trim() !== "" &&
    //         userData.birthDate.trim() !== "" &&
    //         userData.nickname.trim() !== "" &&
    //         isNicknameChecked &&
    //         isAgreementChecked;
    
    //     console.log("isFormValid:", isValid);
    // }, [userData, isNicknameChecked, isAgreementChecked]);


    return(
        <main className="loginPage">
            <MainWrapp>
                <RegisterHeader onChange={handleUserDataChange}  onNicknameCheck={handleNicknameCheck}/>
                <Agreement onChange={handleAgreementsChange} onAgreementCheck={handleAgreementCheck}/>
                <CompleteButton onClick={handleSubmit}  disabled={!isFormValid}>완료</CompleteButton>
                <RegisterHeader onChange={handleUserDataChange}  onNicknameCheck={handleNicknameCheck}/>
                <Agreement onChange={handleAgreementsChange} onAgreementCheck={handleAgreementCheck}/>
                <CompleteButton onClick={handleSubmit}  disabled={!isFormValid}>완료</CompleteButton>
            </MainWrapp>
        </main>
    )
}

const CompleteButton = styled.button`
    width: 70%;
    max-width:420px;
    width: 70%;
    max-width:420px;
    height: 50px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    margin-top: 30px;
    background:${({disabled}) =>(disabled ? "#A0A0A0" : "#0D29B7")};
    background:${({disabled}) =>(disabled ? "#A0A0A0" : "#0D29B7")};
    border-radius: 4px;
`;

export default SignUpSocialPage;