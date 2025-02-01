import React, { useState } from 'react';
import * as S from '../../styled-components/teamregister-styles/styled-ClubInfoForm'; 
import ImageRectangle from './ImageRectangle';
import ContactInput from './ContactInput';
import ActivityImageUpload from './ActivityImageUpload';

const ClubInfoForm = ({ handleActivityClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contactMethods, setContactMethods] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleAddContactMethod = () => {
    setContactMethods([...contactMethods, '']); // 빈 값 추가
  };

  return (
    <S.FormContainer>
      {/* 동아리 카테고리 섹션 */}
      <S.Section>
        <S.TitleText>
          동아리 카테고리 <S.RedAsterisk>*</S.RedAsterisk>
        </S.TitleText>
        <S.CategoryContainer>
          {['웹/앱 개발', '인공지능', '데이터', '디자인', '마케팅', '게임', '기타'].map((category) => (
            <S.CategoryButton
              key={category}
              selected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </S.CategoryButton>
          ))}
        </S.CategoryContainer>
      </S.Section>

      {/* 동아리 기본 정보 섹션 */}
      <S.Section>
        <S.TitleText>
          동아리 기본 정보 <S.RedAsterisk>*</S.RedAsterisk>
        </S.TitleText>

        <S.InputContainer>
          <S.InputLabel>이름<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
          <S.InputField type="text" placeholder="예시) TectTect" />
        </S.InputContainer>

        <S.InputContainer>
          <S.InputLabel>한 줄 소개<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
          <S.InputField type="text" placeholder="예시) IT 벤처 동아리입니다" />
        </S.InputContainer>

        <S.InputContainer>
          <S.InputLabel>연락방법</S.InputLabel>
          <S.SmallText>이메일, 오픈채팅방, 인스타그램 등 연락 방법을 입력해주세요</S.SmallText>
        </S.InputContainer>

        <S.ContactBox>
          {contactMethods.map((_, index) => (
            <ContactInput key={index} />
          ))}
          <S.AddText visible={contactMethods.length === 0} onClick={handleAddContactMethod}>
            + 추가하기
          </S.AddText>
        </S.ContactBox>
      </S.Section>

      {/* 활동 및 프로젝트 섹션 */}
      <S.Section>
        <S.TitleText>
          활동 및 프로젝트 <S.RedAsterisk>*</S.RedAsterisk>
        </S.TitleText>

        <S.TextAreaContainer>
          <S.TextAreaField
            placeholder="프로젝트, 활동 이력, 수상 내역 등 우리 동아리에 대해 간단히 소개해주세요"
          />
        </S.TextAreaContainer>

        <ActivityImageUpload onClick={handleActivityClick} />

        <S.ImageRectanglesContainer>
          {Array.from({ length: 8 }).map((_, index) => (
            <ImageRectangle
              key={index}
              onClose={() => alert(`Close button clicked for rectangle ${index + 1}`)}
            />
          ))}
        </S.ImageRectanglesContainer>
      </S.Section>
    </S.FormContainer>
  );
};

export default ClubInfoForm;
