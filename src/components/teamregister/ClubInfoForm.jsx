import React, { useState, useEffect } from 'react';
import * as S from '../../styled-components/teamregister-styles/styled-ClubInfoForm';
import ContactInput from './ContactInput';
import ActivityImageUpload from '../common/images/ActivityImageUpload';
import ImageRectangle from '../common/images/ImageRectangle';

const ClubInfoForm = ({ 
  handleActivityClick,
  handleCategoryChange,
  handleNameChange,
  handleIntroChange,
  handleContactMethodsChange,
  teamInfo,
  activityInfo 
}) => {
  const categoryMap = {
    '웹/앱 개발': 1,
    '인공지능': 2,
    '데이터': 3,
    '디자인': 4,
    '마케팅': 5,
    '게임': 6,
    '기타': 7,
  };

  const [selectedCategory, setSelectedCategory] = useState(teamInfo.categoryId);
  const [contactMethods, setContactMethods] = useState(teamInfo.contactMethod || []);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageKey, setImageKey] = useState(null);  


  const [activityIntro, setActivityIntro] = useState(activityInfo?.intro || ''); 
  const [activityImageKeyNames, setActivityImageKeyNames] = useState(teamInfo.activity?.activityImageKeyNames || []);

  const handleCategoryClick = (category) => {
    const categoryId = categoryMap[category];
    setSelectedCategory(categoryId);
    handleCategoryChange(categoryId);
  };

  const handleContactMethodsChangeLocal = (methods) => {
    setContactMethods(methods);
    handleContactMethodsChange(methods);
  };

  const handleImageUpload = (imagePreview) => {
    if (imagePreviews.length < 8) {
      setImagePreviews((prevPreviews) => [...prevPreviews, imagePreview]);
    } else {
      alert('이미지는 최대 8개까지 업로드할 수 있습니다.');
    }
  };

  const handleImageDelete = (index) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <S.FormContainer>
      <S.Section>
        <S.TitleText>
          동아리 카테고리 <S.RedAsterisk>*</S.RedAsterisk>
        </S.TitleText>
        <S.CategoryContainer>
          {['웹/앱 개발', '인공지능', '데이터', '디자인', '마케팅', '게임', '기타'].map((category) => (
            <S.CategoryButton
              key={category}
              selected={selectedCategory === categoryMap[category]} 
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </S.CategoryButton>
          ))}
        </S.CategoryContainer>
      </S.Section>

      <S.Section>
        <S.TitleText>
          동아리 기본 정보 <S.RedAsterisk>*</S.RedAsterisk>
        </S.TitleText>

        <S.InputContainer>
          <S.InputLabel>이름<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
          <S.InputField 
            type="text" 
            value={teamInfo.name} 
            onChange={(e) => handleNameChange(e.target.value)} 
            placeholder="예시) TectTect" 
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.InputLabel>한 줄 소개<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
          <S.InputField 
            type="text" 
            value={teamInfo?.intro || ''}  
            onChange={(e) => handleIntroChange(e.target.value)} 
            placeholder="예시) IT 벤처 동아리입니다" 
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.InputLabel>연락방법</S.InputLabel>
        </S.InputContainer>

        <ContactInput 
          contactMethods={contactMethods} 
          setContactMethods={handleContactMethodsChangeLocal} 
        />
      </S.Section>

      <S.Section>
        <S.TitleText>활동 및 프로젝트 <S.RedAsterisk>*</S.RedAsterisk></S.TitleText>

        <S.TextAreaContainer>
          <S.TextAreaField
            value={activityIntro}  
            onChange={(e) => setActivityIntro(e.target.value)} 
            placeholder="프로젝트, 활동 이력, 수상 내역 등 우리 동아리에 대해 간단히 소개해주세요"
          />
        </S.TextAreaContainer>

        <ActivityImageUpload
         type={2}
        folderName="clubImage"
        setImageKey={setActivityImageKeyNames}  
        setImagePreview={handleImageUpload}
         />


        {/* 이미지 미리보기 */}
        <S.ImageRectanglesContainer>
      {Array.from({ length: 8 }).map((_, index) => (
    <ImageRectangle
      key={index}
      imagePreview={imagePreviews[index] || ""} // 업로드된 이미지가 있으면 표시, 없으면 빈 값
      onClose={() => handleImageDelete(index)}  
    />
  ))}
</S.ImageRectanglesContainer>

      </S.Section>
    </S.FormContainer>
  );
};

export default ClubInfoForm;
