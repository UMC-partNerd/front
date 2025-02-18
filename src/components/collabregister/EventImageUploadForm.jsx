import React, { useState } from 'react';
import BannerImageUpload from '../../components/common/images/BannerImageUpload';
import styled from 'styled-components';
import ImageRectangle from '../common/images/ImageRectangle';

const EventImageUploadForm = ({ setProfileImage, setBannerImage }) => {
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  const handleProfileClose = () => {
    setProfileImagePreview(null);
  };

  const handleBannerClose = () => {
    setBannerImagePreview(null);
  };

  const getFolderName = (type) => {
    if (type === 0) return 'collabPost'; // 배너 이미지지
    if (type === 1) return 'collabPost'; // 메인 이미지
    return 'collabPost/EVENT';  
  };

  return (
    <FormContainer>
      {/* 배너 이미지 섹션 */}
      <Section>
        <ProfilePictureText>프로젝트 배너 사진 <RedAsterisk>*</RedAsterisk></ProfilePictureText>
        <form>
          <RecommendationText>추천 사이즈: 1800 x 300 | JPG, PNG | 최대 10MB</RecommendationText>
          <BannerImageUpload
            folderName={getFolderName(0)} 
            type={0} 
            setImageKey={(key) => {
              setBannerImage(key);  // key 전달
            }}
            setImagePreview={(preview) => setBannerImagePreview(preview)} 
          />
        </form>
        {/* 배너 이미지 미리보기 */}
        <ImageRectangle imagePreview={bannerImagePreview} onClose={handleBannerClose} />
      </Section>

      {/* 메인 이미지 섹션 */}
      <Section>
        <ProfilePictureText>프로젝트 메인 사진 <RedAsterisk>*</RedAsterisk></ProfilePictureText>
        <form>
          <RecommendationText>추천 사이즈: 960 x 540 | JPG, PNG | 최대 10MB</RecommendationText>
          <BannerImageUpload
            folderName={getFolderName(1)} 
            type={1} // 메인
            setImageKey={(key) => {
              setProfileImage(key);  // key 전달
            }}
            setImagePreview={(preview) => setProfileImagePreview(preview)} 
          />
        </form>
        {/* 메인 이미지 미리보기 */}
        <ImageRectangle imagePreview={profileImagePreview} onClose={handleProfileClose} />
      </Section>
    </FormContainer>
  );
};

export default EventImageUploadForm;

const FormContainer = styled.div`
  background-color: white;
  width: 95%;
  max-width: 1000px;
  min-height: 800px;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  margin-top: 50px;
  position: relative;  
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const ProfilePictureText = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  color: #212121;
  margin-bottom: 25px;
`;

const RedAsterisk = styled.span`
  color: #FF2626;
`;

const RecommendationText = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #C2C2C2;
  margin-bottom: 10px;
`;
