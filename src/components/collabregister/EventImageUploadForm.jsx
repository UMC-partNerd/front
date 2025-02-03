import React, { useState } from 'react';
import BannerImageUpload from '../../components/common/images/BannerImageUpload';
import styled from 'styled-components';
import ImageRectangle from '../common/images/ImageRectangle';

const EventImageUploadForm = ({ handleProfileClick, handleBannerClick }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const handleProfileClose = () => {
    setProfileImage(null);  // 프로필 이미지 삭제
  };

  const handleBannerClose = () => {
    setBannerImage(null);  // 배너 이미지 삭제
  };

  return (
    <FormContainer>
      {/* 프로젝트 배너 사진 섹션 */}
      <Section>
        <ProfilePictureText>프로젝트 배너 사진 <RedAsterisk>*</RedAsterisk></ProfilePictureText>
        <form>
          <RecommendationText>추천 사이즈: 1800 x 300 | JPG, PNG | 최대 10MB</RecommendationText>
          <BannerImageUpload
            onClick={(file) => setBannerImage(URL.createObjectURL(file))}  // 업로드된 이미지 미리보기 설정
            imagePreview={bannerImage}
          />
          {/* 배너 이미지 미리보기가 ImageRectangle에 전달 */}
          {bannerImage && <ImageRectangle imagePreview={bannerImage} onClose={handleBannerClose} />}
        </form>
      </Section>

      {/* 프로젝트 프로필 사진 섹션 */}
      <Section>
        <ProfilePictureText>프로젝트 메인 사진 <RedAsterisk>*</RedAsterisk></ProfilePictureText>
        <form>
          <RecommendationText>추천 사이즈: 960 x 540 | JPG, PNG | 최대 10MB</RecommendationText>
          <BannerImageUpload
            onClick={(file) => setProfileImage(URL.createObjectURL(file))}  // 업로드된 이미지 미리보기 설정
            imagePreview={profileImage}
          />
          {/* 프로필 이미지 미리보기가 ImageRectangle에 전달 */}
          {profileImage && <ImageRectangle imagePreview={profileImage} onClose={handleProfileClose} />}
        </form>
      </Section>
    </FormContainer>
  );
};

// Styled components
const FormContainer = styled.div`
  background-color: white;
  width: 95%;
  max-width: 1000px;
  min-height: 800px;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  margin-top: 50px;
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

export default EventImageUploadForm;
