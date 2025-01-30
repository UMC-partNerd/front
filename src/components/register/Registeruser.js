//사용자 정보 등록
import axios from "axios";
import { useEffect } from "react";

const registerUser = async (userData, token) => {
    try {
        const response = await axios.post(
            "/api/auth/register", // API 엔드포인트
            userData, // 요청 바디
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // JWT 토큰
                },
            }
        );
        console.log("회원가입 성공:", response.data);
    } catch (error) {
        console.error("회원가입 실패:", error.response?.data || error.message);
    }
};

export default registerUser;