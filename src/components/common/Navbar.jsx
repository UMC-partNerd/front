import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GoBell } from "react-icons/go";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BsChatRightDots } from "react-icons/bs";
import { useState } from 'react';
import ProfileMenu from '../home/ProfileMenu'; 

function Navbar({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState); 

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <LogoMenuGroup>
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
        </LogoMenuGroup>
        <IconContainer>
          {isLoggedIn ? (
            <>
              <IconWrapper>
                <BsChatRightDots />
              </IconWrapper>
              <IconWrapper>
                <GoBell />
              </IconWrapper>
              <IconWrapper onClick={toggleMenu}>
                <MdOutlinePersonOutline />
                {isMenuOpen && <ProfileMenu />}
              </IconWrapper>
            </>
          ) : (
            <AuthButtons>
              <NavLink to="/login">
                <LoginButton>로그인</LoginButton>
              </NavLink>
              <NavLink to="/register/social">
                <SignupButton>회원가입</SignupButton>
              </NavLink>
            </AuthButtons>
          )}
        </IconContainer>
      </NavbarWrapper>
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  width: 100%;
  overflow-x: hidden; 
  box-sizing: border-box; 
`;

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; 
  padding: 0 30px; 
  box-sizing: border-box; 
`;

const LogoMenuGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 30px;
`;

const Logo = styled(NavLink)`
  display: block;
  width: 100px;
  height: auto;
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
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 20px; 
  }

  @media (max-width: 768px) {
    gap: 15px; 
  }
`;

const MenuItem = styled.li`
  font-size: 0.9rem;
  font-weight: 800;
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

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-right: 55px;

  @media (max-width: 1024px) {
    gap: 10px; 
  }

  @media (max-width: 768px) {
    gap: 8px; 
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 1.8rem !important;
    color: #0D29B7;
    cursor: pointer;
  }
  &:first-child svg {
    font-size: 1.4rem !important;
  }
  &:nth-child(2) svg {
    font-size: 1.6rem !important;
    margin-left: 7px;
  }
  &:nth-child(3) svg {
    font-size: 1.8rem !important;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 50px;
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
`;
