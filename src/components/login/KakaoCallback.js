import { useEffect, useState } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";

const KakaoCallback = () =>{
    
    const [code, setCode] = useState(null);
    const [searchParams] = useSearchParams();

    //인가 코드 추출
    useEffect(() => {
        // console.log("Current Browser URL:", window.location.href);
        // console.log("Search Params:", searchParams.toString());

        const authCode = searchParams.get("code");
        if(authCode) {
            //백엔드로 인가 코드 전송
            axios.post("http://localhost:5000/auth/kakao", { code: authCode })
                .then(response => {
                    console.log("✅ 백엔드 응답 (액세스 토큰):", response.data);
                    // 로그인 성공 후 홈 페이지로 이동
                    navigate("/");
                })
                .catch(error => {
                    console.error("❌ 카카오 로그인 처리 실패:", error);
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