import React, { useRef } from 'react';
import styled from 'styled-components';
import Banner from '../components/common/Banner';
import ProjectImageUploadForm from '../components/teamregister/ProjectImageUploadForm';
import ClubInfoForm from '../components/teamregister/ClubInfoForm'; 

const TeamRegistration = () => {
  const fileInputRefProfile = useRef(null);
  const fileInputRefBanner = useRef(null);

  const handleProfileClick = () => {
    fileInputRefProfile.current.click();
  };

  const handleBannerClick = () => {
    fileInputRefBanner.current.click();
  };

  return (
    <>
      <Banner 
        largeText="프로젝트 등록하기" 
        smallText="팀원을 모집하고 싶다면 나의 프로젝트를 등록해보세요!" 
      />
      <Container>
        <ProjectImageUploadForm 
          handleProfileClick={handleProfileClick} 
          handleBannerClick={handleBannerClick}
        />
        <ClubInfoForm />
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #F3F4F7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;


  & > :first-child {
    margin-bottom: 30px;
  }
`;

export default TeamRegistration;
