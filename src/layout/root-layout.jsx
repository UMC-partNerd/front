<<<<<<< HEAD
import {Outlet} from "react-router-dom";
const RootLayout = () =>{
    return (
        <>
            <Outlet/>
        </>
    );
}

export default RootLayout;
=======
// RootLayout.jsx
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useState, useEffect } from 'react';

function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setIsFooterVisible(scrollPosition >= documentHeight);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 로그아웃 
  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("kakao_access_token");
    localStorage.removeItem("used_kakao_code");
    localStorage.removeItem("kakao_email");
    setIsLoggedIn(false); // 상태 업데이트
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
>>>>>>> d5766451815f519c6166c822b35e4ad219eb80e9
