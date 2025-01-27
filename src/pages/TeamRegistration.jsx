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
        {/* ClubInfoForm을 추가한 부분 */}
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

  /* ProjectImageUploadForm과 ClubInfoForm 간 간격 띄우기 */
  & > :first-child {
    margin-bottom: 40px;
  }
`;

export default TeamRegistration;
