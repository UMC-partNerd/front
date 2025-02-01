import API from "./axiosInstance";

export const kakaoLogin = async (authCode) => {
    try {
        const response = await API.get(`/api/auth/login/kakao?code=${authCode}`);
        return response.data;
    } catch (error) {
        console.error("카카오 로그인 API 요청 실패:", error);
        throw error;
    }
};