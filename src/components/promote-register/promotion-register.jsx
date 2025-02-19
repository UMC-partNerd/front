import React, { useState } from 'react';
import styled from 'styled-components';
import Banner from '../common/banner/Banner';
import ProfileImageUpload from '../common/images/ProfileImageUpload';
import ActivityImageUpload from '../common/images/ActivityImageUpload';
import ImageRectangle from '../common/images/ImageRectangle';
import TeamMemberRegistration from '../contact/member-registration';
import ContactForm from '../contact/contactForm';
import Button, { TYPES } from "../common/button";

const PromotionRegister = () => {
  const [projectInfo, setProjectInfo] = useState({
    name: '',
    intro: '',
    description: '',
  });

  const [serviceImages, setServiceImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const handleImageUpload = (imageKey) => {
    if (serviceImages.length < 10) {
      setServiceImages([...serviceImages, imageKey]);
    }
  };

  const handleImageRemove = (index) => {
    setServiceImages(serviceImages.filter((_, i) => i !== index));
  };

  const handleProfileImageUpload = (imageUrl) => {
    setProfileImage(imageUrl);
    setProfileImagePreview(imageUrl);
  };

  const handleProfileImageRemove = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handleSubmit = async () => {
    console.log('프로젝트 등록 데이터:', {
      ...projectInfo,
      profileImage,
      serviceImages,
      teamMembers
    });
  };

  return (
    <>
      <Banner 
        largeText="프로젝트 홍보하기" 
        smallText="완성된 프로젝트를 홍보하고 싶다면 등록해보세요!" 
      />
      <Container>
        <FormGroup>
          <Section>
            <Title>프로젝트 프로필 사진<Required>*</Required></Title>
            <SmallText>추천 사이즈: 960 x 540 | JPG, PNG | 최대 10MB</SmallText>
            <ProfileImageUpload 
              folderName="projectPost"
              type={1}
              setImageKey={handleProfileImageUpload}
            />
            <PreviewBox>
              {profileImagePreview ? (
                <>
                  <PreviewImage src={profileImagePreview} alt="프로필 이미지" />
                  <DeleteButton onClick={handleProfileImageRemove}>×</DeleteButton>
                </>
              ) : (
                <EmptyPreview />
              )}
            </PreviewBox>
          </Section>

          <Section>
            <Title>프로젝트 기본 정보</Title>
            <InputContainer>
              <Label>이름<Required>*</Required></Label>
              <Input 
                type="text" 
                placeholder="프로젝트 이름을 입력해주세요"
                value={projectInfo.name}
                onChange={(e) => setProjectInfo({...projectInfo, name: e.target.value})}
              />
            </InputContainer>

            <InputContainer>
              <Label>한 줄 소개<Required>*</Required></Label>
              <Input 
                type="text" 
                placeholder="프로젝트를 한 줄로 소개해주세요"
                value={projectInfo.intro}
                onChange={(e) => setProjectInfo({...projectInfo, intro: e.target.value})}
              />
            </InputContainer>

            <ServiceImagesSection>
              <Label>서비스 소개 사진</Label>
              <SmallText>사진은 최대 10장까지 가능합니다</SmallText>
              <ActivityImageUpload 
                folderName="projectPost"
                type={2}
                setImageKey={handleImageUpload}
              />
              <ImageGrid>
                {serviceImages.map((image, index) => (
                  <ImageRectangle 
                    key={index}
                    imagePreview={image}
                    onClose={() => handleImageRemove(index)}
                  />
                ))}
              </ImageGrid>
            </ServiceImagesSection>
          </Section>

          <Section>
            <Title>프로젝트 설명<Required>*</Required></Title>
            <TextArea 
              placeholder="프로젝트에 대해 자세히 설명해주세요"
              value={projectInfo.description}
              onChange={(e) => setProjectInfo({...projectInfo, description: e.target.value})}
            />
          </Section>
        </FormGroup>

        <FormGroup>
          <TeamMemberRegistration />
          <ContactForm />
        </FormGroup>

        <ButtonWrapper>
          <Button
            type={TYPES.NEXT}
            text="최종 등록하기"
            onClick={handleSubmit}
          />
        </ButtonWrapper>
      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  background-color: #F3F4F7;
  width: 97.5%;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  background-color: white;
  width: 95%;
  max-width: 1000px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  color: #212121;
  margin-bottom: 25px;
`;

const Required = styled.span`
  color: #FF2626;
  margin-left: 4px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  color: #212121;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  resize: none;
  font-size: 14px;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const ServiceImagesSection = styled.div`
  margin-top: 30px;
`;

const SmallText = styled.p`
  font-size: 14px;
  color: #C2C2C2;
  margin-bottom: 10px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
`;

const PreviewBox = styled.div`
  width: 120px;
  height: 120px;
  margin: 20px 0;
  border: 1px solid #DFE1E5;
  border-radius: 8px;
  position: relative;
`;

const EmptyPreview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #B6E7B9;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;
  
  &:hover {
    background-color: #A5D6A8;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 60px;
  width: 95%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
`;

export default PromotionRegister;
