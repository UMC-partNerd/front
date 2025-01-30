// 홈페이지- 헤더 프로필
import { NavLink } from 'react-router-dom';
import { ProfileMenuContainer, ProfileMenuItem, Separator } from '../../styled-components/home-styles/styled-ProfileMenu';

function ProfileMenu() {
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
        <NavLink to="/logout">로그아웃</NavLink>
      </ProfileMenuItem>
    </ProfileMenuContainer>
  );
}

export default ProfileMenu;

