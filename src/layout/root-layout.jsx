import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GoBell } from "react-icons/go";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useState, useEffect } from 'react';
import Footer from "../components/Footer";

function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MainContainer>
      <Navbar>
        <NavbarWrapper>
          <Logo to="/">
            <img src="/Frame.png" alt="Logo" />
          </Logo>
          <Menu>
            <MenuItem>
              <StyledLink to="/find">파트너드 찾기</StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/collaboration">콜라보레이션</StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/project">프로젝트</StyledLink>
            </MenuItem>
            <MenuItem>
              <StyledLink to="/community">커뮤니티</StyledLink>
            </MenuItem>
          </Menu>
          <IconContainer>
            {isLoggedIn ? (
              <>
                <GoBell />
                <MdOutlinePersonOutline />
              </>
            ) : (
              <AuthButtons>
                <NavLink to="/login">
                  <LoginButton>로그인</LoginButton>
                </NavLink>
                <NavLink to="/signup">
                  <SignupButton>회원가입</SignupButton>
                </NavLink>
              </AuthButtons>
            )}
          </IconContainer>
        </NavbarWrapper>
      </Navbar>
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

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

const Logo = styled(NavLink)`
  display: block;
  width: 100px; 
  height: auto;
  margin-right: 20px; 
  img {
    width: 100%;
    height: auto;
  }
  &:hover {
    opacity: 0.9;
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const MenuItem = styled.li`
  font-size: 0.9rem;
  font-weight: 800;
`;

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: relative;
  left: -220px; 
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  right: 140px;
  svg {
    font-size: 1.6rem;
    color: #0D29B7;
    cursor: pointer;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 0.9rem;
  font-weight: bold;
  &:hover {
    color: #1a73e8;
  }
  &.active {
    color: #0D29B7;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const LoginButton = styled.button`
  text-decoration: none; 
  padding: 4px 9px;
  border: 2px solid #64E4B3;
  color: #64E4B3;
  background-color: white;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 3.5px;
  &:hover {
    background-color: rgba(243, 243, 243, 0.5); 
    color: #64E4B3; 
  }
  &.active {
    color: #0D29B7;
  }
`;

const SignupButton = styled.button`
  text-decoration: none; 
  padding: 4px 9px;
  background-color: #08D485;
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 3.5px;
  border: 2px solid #08D485;
  &:hover {
    background-color: #07C073;
  }
  &.active {
    color: #0D29B7;
  }
`;

const MainContent = styled.main`
  flex: 1; 
`;
