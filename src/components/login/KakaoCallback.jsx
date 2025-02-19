import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api/axiosInstance";
import styled from "styled-components";
import useUserStore from '../../stores/useUserStore'; // zustand 추가 내용git

const KakaoCallback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //인가 코드 추출
  const { setUser } = useUserStore(); // 로그인 상태를 zustand 스토어로 변경

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (!authCode) {
      console.log("No auth code found.");
      return;
    }

    // ✅ 이미 처리된 코드인지 로컬 스토리지에서 확인
    const usedCode = localStorage.getItem("used_kakao_code");
    if (usedCode === authCode) {
      console.log("⚠️ 이미 처리된 인가 코드:", authCode);
      return;
    }

    // ✅ 이미 로그인된 사용자 확인
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      console.log("✅ 이미 로그인된 사용자입니다.");
      navigate("/");
      return;
    }

    // ✅ 중복 요청 방지를 위한 상태 변수 추가
    let isRequestSent = false;

    if (!isRequestSent) {
      isRequestSent = true;  //✅ 중복 요청 방지

      axios.get(`${API_BASE_URL}/api/auth/login/kakao?code=${authCode}`)
        .then(response => {
          if (response.status === 200 && response.data.isSuccess) {
            console.log("백엔드 응답 (액세스 토큰):", response.data);

            // 이메일 정보 저장
            const email = response.data.result.email;
            const jwtToken = response.data.result.jwtToken;

            //localStorage.setItem("kakao_access_token", response.data.result.access_token);
            localStorage.setItem("used_kakao_code", authCode);
            localStorage.setItem("kakao_email", email); // 이메일 저장
            localStorage.setItem("jwtToken", jwtToken); // JWT 토큰 저장

            //zustand로 로그인 상태 업데이트(추가한 부분)
            setUser(email, jwtToken); // 로그인 상태 업데이트

            // ✅ URL에서 `code` 제거하여 중복 요청 방지
            setSearchParams({});

            // newUser 여부에 따라 이동 경로 지정
            if (response.data.result.newUser) {
              navigate("/register/social"); // 새로운 사용자
            } else {
              navigate("/"); // 기존 사용자
            }
          } else {
            console.error("카카오 로그인 응답 오류:", response.data);
            navigate("/login");
          }
        })
        .catch(error => {
          console.error("카카오 로그인 처리 실패:", error);
          navigate("/login");
        });
    }
  }, [searchParams, setSearchParams, navigate, setUser]); // zustand -> setUser 추가

    return (
        <main className="loginPage">
            <MainWrapp>
                <Logo>
                <img src="/Frame.png" alt="Logo" />
                </Logo>
                <Text>부지런히 연결중...</Text>
            </MainWrapp>
        </main>
    );
}

const Text = styled.div`
color:#B1B1B1;
font-size:10px;
`

const Logo = styled.div`
    display: block;
    width: 200px;
    height: auto;
    img {
        width: 100%;
        height: auto;
    }
    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 768px) {
        width: 150px;
    }
`;

const MainWrapp = styled.main`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 60vw;
    max-width: 2700px;
    height: 85vh;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    margin: 50px 100px 70px 100px;
    padding: 20px;

    @media (max-width: 1024px) {
        width: 80vw;
        margin: 30px 50px;
    }

    @media (max-width: 768px) {
        width: 100vw;
        height: 100vh;
        margin: 20px;
        padding: 15px;
    }

    @media (max-width: 480px) {
        width: 100vw;
        margin: 10px;
        padding: 10px;
    }
`;

export default KakaoCallback;
