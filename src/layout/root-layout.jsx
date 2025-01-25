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


    setIsFooterVisible(scrollPosition >= documentHeight + 100);
  };

  useEffect(() => {
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
  font-family: 'Pretendard', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
`;
