import React, { useState } from 'react';
import BannerImageUpload from '../../components/common/images/BannerImageUpload';
import styled from 'styled-components';
import ImageRectangle from '../common/images/ImageRectangle';

const EventImageUploadForm = ({ handleProfileClick, handleBannerClick }) => {
  const [profileImageKey, setProfileImageKey] = useState(null);
  const [bannerImageKey, setBannerImageKey] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  const handleProfileClose = () => {
    setProfileImagePreview(null);  // 프로필 이미지 삭제
  };

  const handleBannerClose = () => {
    setBannerImagePreview(null);  // 배너 이미지 삭제
  };

  const getFolderName = (type) => {
    if (type === 0) return 'collabPost';  // 배너 이미지
    if (type === 1) return 'collabPost';  // 메인 이미지
    return 'collabPost';  // 기본 폴더
  };

  return (
    <FormContainer>
      {/* 프로젝트 배너 사진 섹션 */}
      <Section>
        <ProfilePictureText>프로젝트 배너 사진 <RedAsterisk>*</RedAsterisk></ProfilePictureText>
        <form>
          <RecommendationText>추천 사이즈: 1800 x 300 | JPG, PNG | 최대 10MB</RecommendationText>
          <BannerImageUpload
            folderName={getFolderName(0)}  // 배너 사진 폴더
            type={0}  // 배너 사진
            setImageKey={(key) => setBannerImageKey(key)}
            setImagePreview={(preview) => setBannerImagePreview(preview)}
          />
          {/* 배너 이미지 미리보기가 ImageRectangle에 전달 */}
          {bannerImagePreview && <ImageRectangle imagePreview={bannerImagePreview} onClose={handleBannerClose} />}
        </form>
      </Section>

      {/* 프로젝트 메인 사진 섹션 */}
      <Section>
        <ProfilePictureText>프로젝트 메인 사진 <RedAsterisk>*</RedAsterisk></ProfilePictureText>
        <form>
          <RecommendationText>추천 사이즈: 960 x 540 | JPG, PNG | 최대 10MB</RecommendationText>
          <BannerImageUpload
            folderName={getFolderName(1)}  // 메인 사진 폴더
            type={1}  // 메인 사진
            setImageKey={(key) => setProfileImageKey(key)}
            setImagePreview={(preview) => setProfileImagePreview(preview)}
          />
          {/* 프로필 이미지 미리보기가 ImageRectangle에 전달 */}
          {profileImagePreview && <ImageRectangle imagePreview={profileImagePreview} onClose={handleProfileClose} />}
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
