import React, { useState } from 'react';
import Banner from '../../components/common/banner/Banner';
import EventInfoForm from '../../components/collabregister/EventInfoForm'; 
import EventGuideForm from '../../components/collabregister/EventGuideForm';  
import EventImageUploadForm from '../../components/collabregister/EventImageUploadForm';
import styled from 'styled-components';

const CollabRegistration = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  return (
    <>
      <Banner 
        largeText="행사 정보 입력하기"  
        smallText="협업 글을 작성하고 다양한 협업을 경험해보세요!" 
      />
      <Container>
        <EventImageUploadForm 
          handleProfileClick={() => {}} 
          handleBannerClick={() => {}} 
          setProfileImage={setProfileImage}
          setBannerImage={setBannerImage}
        />
        {/* 이미지 업로드 폼 아래에 EventInfoForm 추가 */}
        <EventInfoForm />
        {/* EventInfoForm 아래에 EventGuideForm 추가 */}
        <EventGuideForm handleActivityClick={() => {}} />
      </Container>
    </>
  );
};

export default CollabRegistration;

const Container = styled.div`
  background-color: #F3F4F7;
  width: 97.5%;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;