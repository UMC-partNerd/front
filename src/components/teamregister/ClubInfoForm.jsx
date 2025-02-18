import React, { useState } from 'react';
import * as S from '../../styled-components/teamregister-styles/styled-ClubInfoForm';
import ContactInput from './ContactInput';
import ActivityImageUpload from '../common/images/ActivityImageUpload';
import ImageRectangle from '../common/images/ImageRectangle';

const ClubInfoForm = ({ 
  handleCategoryChange,
  handleNameChange,
  handleIntroChange,
  handleContactMethodsChange,
  handleActivityIntroChange,  // 부모에서 전달받은 activityIntro 변경 함수
  handleActivityImageChange,  // 부모에서 전달받은 activityImageKeyNames 변경 함수
  teamInfo = {},  // teamInfo가 없을 경우 빈 객체로 기본값 설정
  activityIntro,
  activityImageKeyNames,
  isEditMode = false  // 수정 모드인지 확인하는 flag 추가
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

  const [selectedCategory, setSelectedCategory] = useState(teamInfo.categoryId || null); 

  const [contactMethods, setContactMethods] = useState(teamInfo.contactMethod || []);
  const [imagePreviews, setImagePreviews] = useState(new Array(8).fill(null));  // 항상 8개의 공간을 유지

  // 카테고리 버튼 클릭 시 상태 변경
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
    // 이미 이미지가 8개 이하일 때만 추가
    const updatedPreviews = [...imagePreviews];
    const emptyIndex = updatedPreviews.indexOf(null);  // 비어있는 자리를 찾기

    if (emptyIndex !== -1) {
      updatedPreviews[emptyIndex] = imagePreview;  // 비어있는 자리(첫 번째 null)에 이미지를 넣음
      setImagePreviews(updatedPreviews);
      handleActivityImageChange(updatedPreviews);  // 부모로 값 전달
    } else {
      alert('이미지는 최대 8개까지 업로드할 수 있습니다.');
    }
  };

  const handleImageDelete = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = null;  // 해당 인덱스의 이미지를 null로 설정하여 비움
    setImagePreviews(updatedPreviews);
    handleActivityImageChange(updatedPreviews);  // 부모로 값 전달
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
            value={teamInfo.name || ''} 
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
            onChange={(e) => handleActivityIntroChange(e.target.value)} // 부모로 값 변경
            placeholder="프로젝트, 활동 이력, 수상 내역 등 우리 동아리에 대해 간단히 소개해주세요"
          />
        </S.TextAreaContainer>

        <ActivityImageUpload
         type={2}
         folderName="club"
         setImageKey={handleActivityImageChange}  
         setImagePreview={handleImageUpload}
        />

        <S.ImageRectanglesContainer>
          {/* 항상 8개 이미지 랙탱글을 렌더링 */}
          {imagePreviews.map((imagePreview, index) => (
            <ImageRectangle
              key={index}
              imagePreview={imagePreview}  // 해당 인덱스에 이미지가 없으면 null(빈 이미지)
              onClose={() => handleImageDelete(index)}  // 삭제 버튼 클릭 시 해당 이미지 삭제
            />
          ))}
        </S.ImageRectanglesContainer>
      </S.Section>
    </S.FormContainer>
  );
};

export default ClubInfoForm;
