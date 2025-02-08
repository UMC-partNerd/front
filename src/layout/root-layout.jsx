import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import useUserStore from '../stores/useUserStore';
import axios from 'axios';

function RootLayout() {
  const { token, clearUser } = useUserStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setIsFooterVisible(scrollPosition >= documentHeight);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(true); // 로그인 후 네비게이션바
    }
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [token]);

  const handleLogout = async () => {
    const kakaoAccessToken = localStorage.getItem('kakao_access_token');
    
    if (kakaoAccessToken) {
      try {
        const response = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
          headers: {
            Authorization: `Bearer ${kakaoAccessToken}`
          }
        });

        if (response.status === 200) {
          console.log("카카오 로그아웃 성공");
        } else {
          console.error("카카오 로그아웃 실패:", response);
        }
        localStorage.removeItem('kakao_access_token');
      } catch (error) {
        console.error("카카오 로그아웃 실패:", error);
      }
    }

    localStorage.removeItem('jwtToken');
    localStorage.removeItem('kakao_email');
    localStorage.removeItem('used_kakao_code');
    clearUser();
    setIsLoggedIn(false);
    window.location.href = '/'; // 페이지 새로고침
  };

  return (
    <MainContainer>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer isVisible={isFooterVisible} />
    </MainContainer>
  );
}

export default RootLayout;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;
