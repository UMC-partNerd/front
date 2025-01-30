import { useEffect, useState } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";

const KakaoCallback = () =>{
    
    const [code, setCode] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    //인가 코드 추출
    useEffect(() => {
        // console.log("Current Browser URL:", window.location.href);
        // console.log("Search Params:", searchParams.toString());

        const authCode = searchParams.get("code");
        if(authCode) {
            //백엔드로 인가 코드 전송
            axios.get(`${API_BASE_URL}/api/auth/login/kakao?code=${authCode}`)
                .then(response => {
                    if (response.status === 200 && response.data.isSuccess) { // 성공 조건 확인
                        console.log("백엔드 응답 (액세스 토큰):", response.data);
                        navigate("/");
                    } else {
                        console.error("카카오 로그인 응답 오류:", response.data);
                        navigate("/login");
                    }
                })
                .catch(error => {
                    console.error("카카오 로그인 처리 실패:", error);
                    if (error.response) {
                        console.error("서버 응답 데이터:", error.response.data);
                    }
                    navigate("/login");
                });

            setCode(authCode);
            console.log("Kakao Auth Code:", authCode);
        }else {
            console.log("No auth code found.");
        }
        console.log("Extracted code:", authCode);
    }, [searchParams]);


}

export default KakaoCallback;