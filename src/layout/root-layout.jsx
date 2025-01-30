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
    // 로컬 스토리지에서 jwt_token 읽어서 로그인 상태 업데이트
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MainContainer>
      <Navbar isLoggedIn={isLoggedIn} />
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
