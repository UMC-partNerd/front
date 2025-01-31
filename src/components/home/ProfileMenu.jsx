import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ProfileMenuContainer, ProfileMenuItem, Separator } from '../../styled-components/home-styles/styled-ProfileMenu';

function ProfileMenu({ onLogout }) {
  return (
    <ProfileMenuContainer>
      <ProfileMenuItem>
        <NavLink to="/profile">내 프로필</NavLink>
      </ProfileMenuItem>
      <ProfileMenuItem>
        <NavLink to="/personal">퍼스널 페이지</NavLink>
      </ProfileMenuItem>
      <ProfileMenuItem>
        <NavLink to="/team">팀 페이지</NavLink>
      </ProfileMenuItem>
      <Separator />
      <ProfileMenuItem>

        <button onClick={onLogout}>로그아웃</button>
      </ProfileMenuItem>
    </ProfileMenuContainer>
  );
}

export default ProfileMenu;

