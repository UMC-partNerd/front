import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  width: 140px; 
  height: 140px; 
  border-radius: 5px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5em;
  margin-top: -77px; 
  margin-left: 180px; 
`;

const ProfilePhoto = ({ src }) => {
  return (
    <ProfileContainer>
      {src ? <img src={src} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} /> : "프로필 사진"}
    </ProfileContainer>
  );
};

export default ProfilePhoto;

