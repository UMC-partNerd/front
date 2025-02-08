import React from 'react';
import { NavLink } from 'react-router-dom';
import { ProfileMenuContainer, ProfileMenuItem, Separator } from '../../styled-components/home-styles/styled-ProfileMenu';

function ProfileMenu({ onLogout }) {
  return (
    <ProfileMenuContainer>
      <ProfileMenuItem>
        <NavLink to="/mypage/profile">내 프로필</NavLink>
      </ProfileMenuItem>
      <ProfileMenuItem>
        <NavLink to="/mypage/personal-page">퍼스널 페이지</NavLink>
      </ProfileMenuItem>
      <ProfileMenuItem>
        <NavLink to="/mypage/teams">팀 페이지</NavLink>
      </ProfileMenuItem>
      <Separator />
      <ProfileMenuItem>
        <button onClick={onLogout}>로그아웃</button>
      </ProfileMenuItem>
    </ProfileMenuContainer>
  );
}

export default ProfileMenu;