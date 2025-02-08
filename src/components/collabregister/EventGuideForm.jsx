import React, { useState } from 'react';
import * as S from '../../styled-components/collab-styles/styled-EventGuideForm';
import ImageRectangle from '../../components/common/images/ImageRectangle';
import ActivityImageUpload from '../../components/common/images/ActivityImageUpload';
import ContactInput from '../../components/teamregister/ContactInput';

const EventGuideForm = ({ onDataChange }) => {
  const [contactMethods, setContactMethods] = useState([]);
  const [eventImageKey, setEventImageKey] = useState(null);
  const [eventImagePreview, setEventImagePreview] = useState(null);
  const [eventDescription, setEventDescription] = useState('');

  const handleImageClose = () => {
    setEventImagePreview(null);
    setEventImageKey(null);
    onDataChange({ eventImgKeyNameList: [] });
  };

  const handleDescriptionChange = (e) => {
    setEventDescription(e.target.value);
    onDataChange({
      description: e.target.value,
      eventImgKeyNameList: eventImageKey ? [eventImageKey] : [],
    });
  };

  const handleContactMethodsChange = (methods) => {
    setContactMethods(methods);
    onDataChange({ contactMethodDTOList: methods });
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
            value={eventDescription}
            onChange={handleDescriptionChange}
          />
        </S.TextAreaContainer>

        {/* 액티비티 이미지 업로드 */}
        <ActivityImageUpload 
          folderName="collabPost" 
          type={2}
          setImageKey={(key) => {
            setEventImageKey(key);
            onDataChange({ eventImgKeyNameList: [key] });
          }}
          setImagePreview={setEventImagePreview}
        />

        {/* 이미지 미리보기 */}
        <S.ImageRectanglesContainer>
          <ImageRectangle imagePreview={eventImagePreview} onClose={handleImageClose} />
        </S.ImageRectanglesContainer>
      </S.Section>

      {/* 연락방법  */}
      <S.Section>
        <S.TitleText>연락방법</S.TitleText>
        <S.SmallText>이메일, 오픈채팅방, 인스타그램 등 연락 방법을 입력해주세요</S.SmallText>

        <S.ContactBox>
          <ContactInput 
            contactMethods={contactMethods} 
            setContactMethods={handleContactMethodsChange} 
          />
        </S.ContactBox>
      </S.Section>
    </S.FormContainer>
  );
};

export default EventGuideForm;