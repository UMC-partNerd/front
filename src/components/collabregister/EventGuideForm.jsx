import React, { useState } from 'react';
import * as S from '../../styled-components/collab-styles/styled-EventGuideForm';
import ImageRectangle from '../../components/common/images/ImageRectangle';
import ActivityImageUpload from '../../components/common/images/ActivityImageUpload';
import ContactInput from '../../components/teamregister/ContactInput';

const EventGuideForm = ({ handleActivityClick }) => {
  const [contactMethods, setContactMethods] = useState([]);

  const handleAddContactMethod = () => {
    setContactMethods([...contactMethods, '']); // 빈 값 추가
  };

  return (
    <S.FormContainer>
      {/* 행사 안내 섹션 */}
      <S.Section>
        <S.TitleText>
          행사안내 <S.RedAsterisk>*</S.RedAsterisk>
        </S.TitleText>

        <S.SmallText>
          행사 안내 이미지는 선택이지만, 행사에 대한 소개글은 필수로 작성해주세요
        </S.SmallText>

        <S.TextAreaContainer>
          <S.TextAreaField
            placeholder="행사에 대한 소개와 현재 진행 상황, 필요한 점 등을 작성해주세요"
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

      {/* 연락방법 섹션 */}
      <S.Section>
        <S.TitleText>
          연락방법
        </S.TitleText>
        <S.SmallText>
          이메일, 오픈채팅방, 인스타그램 등 연락 방법을 입력해주세요
        </S.SmallText>

        <S.ContactBox>
          <ContactInput />
        </S.ContactBox>
      </S.Section>
    </S.FormContainer>
  );
};

export default EventGuideForm;
