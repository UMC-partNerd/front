import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
    const navigate = useNavigate();

    // 예시
    //   const goToHome = () => {
    //     navigate("/"); // Home page로 이동
    //   };

    //   const goToAbout = () => {
    //     navigate("/about"); // About page로 이동
    //   };

    //   const goToDashboard = (userId) => {
    //     navigate(`/dashboard/${userId}`); // 동적으로 대시보드로 이동
    //   };

    //   const redirectToLogin = () => {
    //     navigate("/login", { replace: true }); // 로그인 페이지로 이동하고 history를 교체
    //   };

    // 콜라보레이션 : 협업 요청 확인하기
    const goToRequest = () => {
        navigate("/collaboration/request", { replace: false});
    };

    return {
        goToRequest
    };
};

export default useCustomNavigate;
