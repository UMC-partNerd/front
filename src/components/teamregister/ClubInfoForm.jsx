import ImageRectangle from './ImageRectangle'; 
import React, { useState } from 'react';
import styled from 'styled-components';
import ContactInput from './ContactInput';
import ActivityImageUpload from './ActivityImageUpload';

const ClubInfoForm = ({ handleAcitivityClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contactMethods, setContactMethods] = useState([]);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleAddContact = () => {
    setContactMethods([...contactMethods, '']);
  };

  return (
    <FormContainer>
      <React.Fragment>
        {/* 동아리 카테고리 섹션 */}
        <Section>
          <TitleText>
            동아리 카테고리 <RedAsterisk>*</RedAsterisk>
          </TitleText>
          <CategoryContainer>
            <CategoryButton
              selected={selectedCategory === '웹/앱 개발'}
              onClick={() => handleCategoryClick('웹/앱 개발')}
            >
              웹/앱 개발
            </CategoryButton>
            <CategoryButton
              selected={selectedCategory === '인공지능'}
              onClick={() => handleCategoryClick('인공지능')}
            >
              인공지능
            </CategoryButton>
            <CategoryButton
              selected={selectedCategory === '데이터'}
              onClick={() => handleCategoryClick('데이터')}
            >
              데이터
            </CategoryButton>
            <CategoryButton
              selected={selectedCategory === '디자인'}
              onClick={() => handleCategoryClick('디자인')}
            >
              디자인
            </CategoryButton>
            <CategoryButton
              selected={selectedCategory === '마케팅'}
              onClick={() => handleCategoryClick('마케팅')}
            >
              마케팅
            </CategoryButton>
            <CategoryButton
              selected={selectedCategory === '게임'}
              onClick={() => handleCategoryClick('게임')}
            >
              게임
            </CategoryButton>
            <CategoryButton
              selected={selectedCategory === '기타'}
              onClick={() => handleCategoryClick('기타')}
            >
              기타
            </CategoryButton>
          </CategoryContainer>
        </Section>

        {/* 동아리 기본 정보 섹션 */}
        <Section>
          <TitleText>
            동아리 기본 정보 <RedAsterisk>*</RedAsterisk>
          </TitleText>

          {/* 이름 입력 */}
          <InputContainer>
            <InputLabel>이름<RedAsterisk>*</RedAsterisk></InputLabel>
            <InputField type="text" placeholder="예시) TectTect" />
          </InputContainer>

          {/* 한 줄 소개 입력 */}
          <InputContainer>
            <InputLabel>한 줄 소개<RedAsterisk>*</RedAsterisk></InputLabel>
            <InputField type="text" placeholder="예시) IT 벤처 동아리입니다" />
          </InputContainer>

          {/* 연락방법 섹션 */}
          <InputContainer>
            <InputLabel>연락방법</InputLabel>
            <SmallText>이메일, 오픈채팅방, 인스타그램 등 연락 방법을 입력해주세요</SmallText>
          </InputContainer>

          {/* 연락방법 박스 */}
          <ContactBox>
            <ContactInput />

            {/* '추가하기' 텍스트 */}
            <AddText visible={contactMethods.length === 0}>+ 추가하기</AddText>
          </ContactBox>
        </Section>

        <Section>
          <TitleText>
            활동 및 프로젝트 <RedAsterisk>*</RedAsterisk>
          </TitleText>
          <TextAreaContainer>
            <InputContainer>
              <TextAreaField
                placeholder="프로젝트, 활동 이력, 수상 내역 등 우리 동아리에 대해 간단히 소개해주세요"
              />
            </InputContainer>
          </TextAreaContainer>

    
          <ActivityImageUpload onClick={handleAcitivityClick} />
          
     
          <ImageRectanglesContainer>
           {Array.from({ length: 8 }).map((_, index) => (
           <ImageRectangle
            key={index}
           onClose={() => alert(`Close button clicked for rectangle ${index + 1}`)}
           />
          ))}
         </ImageRectanglesContainer>
        </Section>
      </React.Fragment>
    </FormContainer>
  );
};

export default ClubInfoForm;

const ImageRectanglesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0; 
  padding: 0; 
  margin: 0;  
`;


const FormContainer = styled.div`
  background-color: white;
  width: 94%;
  max-width: 1000px;
  min-height: 1500px;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  margin-top: 45px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const TitleText = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  color: #212121;
  margin-bottom: 25px;
`;

const RedAsterisk = styled.span`
  color: #FF2626;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.selected ? '#DDFCF0' : '#F3F3F3')};
  border: 2px solid ${(props) => (props.selected ? '#08D485' : '#C2C2C2')};
  border-radius: 30px;
  color: ${(props) => (props.selected ? '#08D485' : '#707070')};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  min-width: 90px;
  height: 37px;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: #e0f9f1;
    color: #08D485;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 25px;  
  color: #E1E1E1;
`;

const InputLabel = styled.label`
  font-size: 18px;
  color: #414141;
  font-weight: 500;
  display: block;
  margin-bottom: 9px;
`;

const InputField = styled.input`
  width: 95%;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #E1E1E1;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #B0B0B0;
  }
`;

const TextAreaField = styled.textarea`
  width: 95%;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Pretendard';
  border: 2px solid #E1E1E1;
  border-radius: 5px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #C2C2C2;
  }

  height: 200px; 
  resize: none; 
`;

const SmallText = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #707070;
  margin-top: 5px;
  margin-bottom: 0; 
`;

const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F3F3F3;
  padding: 15px;
  border-radius: 8px;
  height: 250px;  
  margin-top: -5px; 
  margin-bottom: 0;  
  position: relative;  
`;

const AddText = styled.div`
  position: absolute;
  left: 15px;
  bottom: 15px;
  color: #0d29b7;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const TextAreaContainer = styled.div`
  margin-bottom: 30px;
`; 