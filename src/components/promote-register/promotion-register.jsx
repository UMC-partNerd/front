import React, { useState } from 'react';
import styled from 'styled-components';
import Banner from '../common/banner/Banner';
import ProfileImageUpload from '../common/images/ProfileImageUpload';
import ActivityImageUpload from '../common/images/ActivityImageUpload';
import ImageRectangle from '../common/images/ImageRectangle';
import TeamMemberRegistration from '../contact/member-registration';
import ContactForm from '../contact/contactForm';
import ButtonBlue from '../mypage/button_blue';
import useProjectPromote from '../../hooks/useProjectPromote';

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

const SmallText = styled.p`
  font-size: 14px;
  color: #C2C2C2;
  margin-bottom: 10px;
`;

const PreviewBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 120px;
  height: 120px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 18px;
  color: #666;
  cursor: pointer;
`;

const EmptyPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #E1E1E1;
`;

const ServiceImagesSection = styled.div`
  margin-top: 30px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const ContactMethodContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const ContactSelect = styled.select`
  padding: 12px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const ContactInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #0D29B7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const PromotionRegister = () => {
  const { uploadImage, registerProject, loading, error } = useProjectPromote();

  const [projectInfo, setProjectInfo] = useState({
    name: '',
    intro: '',
    description: '',
    contactMethods: []
  });

  const [serviceImages, setServiceImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentContact, setCurrentContact] = useState({ method: '', link: '' });

  const handleImageUpload = async (file) => {
    try {
      const keyName = await uploadImage(file, 4); // INTRO
      if (serviceImages.length < 10) {
        setServiceImages([...serviceImages, keyName]);
      }
    } catch (error) {
      console.error('서비스 이미지 업로드 실패:', error);
    }
  };

  const handleProfileImageUpload = async (file) => {
    try {
      const keyName = await uploadImage(file, 3); // THUMBNAIL
      setProfileImage(keyName);
      setProfileImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error('프로필 이미지 업로드 실패:', error);
    }
  };

  const handleImageRemove = (index) => {
    setServiceImages(serviceImages.filter((_, i) => i !== index));
  };

  const handleProfileImageRemove = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handleMemberSearch = (query) => {
    setSearchQuery(query);
    // 실제 구현에서는 API 호출로 대체
    const mockResults = [
      { id: 1, nickname: '사용자1', profileImage: 'url1' },
      { id: 2, nickname: '사용자2', profileImage: 'url2' }
    ].filter(user => user.nickname.includes(query));
    setSearchResults(mockResults);
  };

  const handleMemberAdd = (member) => {
    if (!teamMembers.find(m => m.id === member.id)) {
      setTeamMembers([...teamMembers, member]);
    }
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleMemberRemove = (memberId) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        title: projectInfo.name,
        info: projectInfo.intro,
        description: projectInfo.description,
        thumbnailKeyName: profileImage,
        projectImgKeyNameList: serviceImages,
        promotionProjectMember: teamMembers.map(member => member.id),
        contactMethod: projectInfo.contactMethods.map(contact => ({
          contactType: contact.method,
          contactUrl: contact.link
        }))
      };

      const response = await registerProject(formData);
      if (response.isSuccess) {
        console.log('프로젝트 등록 성공:', response);
        // 성공 후 처리 (예: 페이지 이동)
      }
    } catch (error) {
      console.error('프로젝트 등록 실패:', error);
    }
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
              folderName="projects"
              type={3}
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
          <Section>
            <TeamMemberRegistration 
              teamMembers={teamMembers}
              searchResults={searchResults}
              handleSearch={handleMemberSearch}
              handleAddMember={handleMemberAdd}
              handleRemoveMember={handleMemberRemove}
            />
          </Section>
          <Section>
            <ContactForm 
              onContactUpdate={(contacts) => setProjectInfo(prev => ({
                ...prev,
                contactMethods: contacts
              }))} 
            />
          </Section>
        </FormGroup>

        <ButtonBlue 
          onClick={handleSubmit}
          style={{ 
            width: '250px', 
            height: '40px', 
            marginTop: '20px', 
            fontSize: '16px' 
          }}
        >
          프로젝트 등록하기
        </ButtonBlue>
      </Container>
    </>
  );
};

export default PromotionRegister;
