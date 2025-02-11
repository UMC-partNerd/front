import React, { useState, useEffect } from 'react';
import ProfileImageUpload from '../../components/common/images/ProfileImageUpload';
import BannerImageUpload from '../../components/common/images/BannerImageUpload';
import ImageRectangle from '../common/images/ImageRectangle';
import * as S from '../../styled-components/teamregister-styles/styled-ProjectImageUploadForm';

const ProjectImageUploadForm = ({ setProfileImage, setBannerImage, profileImageUrl, bannerImageUrl }) => {
  const [profileImagePreview, setProfileImagePreview] = useState(profileImageUrl || null);
  const [bannerImagePreview, setBannerImagePreview] = useState(bannerImageUrl || null);

  const handleProfileClose = () => {
    setProfileImagePreview(null);
  };

  const handleBannerClose = () => {
    setBannerImagePreview(null);
  };

 

  useEffect(() => {
    if (profileImageUrl) {
      setProfileImagePreview(profileImageUrl); // 수정 페이지에서 초기 이미지 URL 설정
    }
    if (bannerImageUrl) {
      setBannerImagePreview(bannerImageUrl); // 수정 페이지에서 초기 이미지 URL 설정
    }
  }, [profileImageUrl, bannerImageUrl]);

  return (
    <S.SFormContainer>
      {/* 프로젝트 프로필 이미지 섹션 */}
      <S.SSection>
        <S.SProfilePictureText>
          프로젝트 프로필 사진 <S.SRedAsterisk>*</S.SRedAsterisk>
        </S.SProfilePictureText>
        <form>
          <S.SRecommendationText>
            추천 사이즈: 960 x 540 | JPG, PNG | 최대 10MB
          </S.SRecommendationText>
          <ProfileImageUpload
            folderName="clubImage"
            type={1}  // 숫자 1로 변경
            setImageKey={(key) => setProfileImage(key)}  // 프로필 이미지 키 전달
            setImagePreview={(preview) => setProfileImagePreview(preview)}  // 프로필 이미지 미리보기 전달
          />
        </form>
        {/* 프로필 이미지 미리보기: 항상 표시되도록 */}
        <ImageRectangle 
          imagePreview={profileImagePreview} 
          onClose={handleProfileClose} 
        />
      </S.SSection>

      {/* 프로젝트 배너 이미지 섹션 */}
      <S.SSection>
        <S.SProfilePictureText>
          프로젝트 배너 사진 <S.SRedAsterisk>*</S.SRedAsterisk>
        </S.SProfilePictureText>
        <form>
          <S.SRecommendationText>
            추천 사이즈: 1920 x 1080 | JPG, PNG | 최대 10MB
          </S.SRecommendationText>
          <BannerImageUpload
            folderName="clubBannerImage"
            type={0}  // 숫자 0으로 변경
            setImageKey={(key) => setBannerImage(key)}  // 배너 이미지 키 전달
            setImagePreview={(preview) => setBannerImagePreview(preview)}  // 배너 이미지 미리보기 전달
          />
        </form>
 
        <ImageRectangle 
          imagePreview={bannerImagePreview} 
          onClose={handleBannerClose} 
        />
      </S.SSection>
    </S.SFormContainer>
  );
};

export default ProjectImageUploadForm;
