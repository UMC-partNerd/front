import React, { useState } from 'react';
import ProfileImageUpload from '../common/images/ProfileImageUpload';
import BannerImageUpload from '../common/images/BannerImageUpload';
import ImageRectangle from '../common/images/ImageRectangle';
import * as S from '../../styled-components/teamregister-styles/styled-ProjectImageUploadForm';

const ProjectImageUploadForm = ({ handleProfileClick, handleBannerClick }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const handleProfileClose = () => {
    setProfileImage(null);  
  };

  const handleBannerClose = () => {
    setBannerImage(null);  
  };

  return (
    <S.SFormContainer>
      {/* 프로젝트 프로필 사진 섹션 */}
      <S.SSection>
        <S.SProfilePictureText>프로젝트 프로필 사진 <S.SRedAsterisk>*</S.SRedAsterisk></S.SProfilePictureText>
        <form>
          <S.SRecommendationText>추천 사이즈: 960 x 540 | JPG, PNG | 최대 10MB</S.SRecommendationText>
          <ProfileImageUpload
            onClick={(file) => setProfileImage(URL.createObjectURL(file))}  // 업로드된 이미지 미리보기 설정
            imagePreview={profileImage}
          />
          {/* 항상 렌더링되는 ImageRectangle */}
          <ImageRectangle imagePreview={profileImage} onClose={handleProfileClose} />
        </form>
      </S.SSection>

      {/* 프로젝트 배너 사진 섹션 */}
      <S.SSection>
        <S.SProfilePictureText>프로젝트 배너 사진 <S.SRedAsterisk>*</S.SRedAsterisk></S.SProfilePictureText>
        <form>
          <S.SRecommendationText>추천 사이즈: 1920 x 1080 | JPG, PNG | 최대 10MB</S.SRecommendationText>
          <BannerImageUpload
            onClick={(file) => setBannerImage(URL.createObjectURL(file))}  // 업로드된 이미지 미리보기 설정
            imagePreview={bannerImage}
          />
          {/* 항상 렌더링되는 ImageRectangle */}
          <ImageRectangle imagePreview={bannerImage} onClose={handleBannerClose} />
        </form>
      </S.SSection>
    </S.SFormContainer>
  );
};

export default ProjectImageUploadForm;