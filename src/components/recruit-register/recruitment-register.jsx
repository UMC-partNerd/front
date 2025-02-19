import React, { useState } from 'react';
import styled from 'styled-components';
import Banner from '../common/banner/Banner';
import ProjectImageUploadForm from '../teamregister/ProjectImageUploadForm';
import ActivityImageUpload from '../common/images/ActivityImageUpload';
import ImageRectangle from '../common/images/ImageRectangle';
import DateList from '../common/DateList';
import Button, { TYPES } from "../common/button";


import TeamMemberRegistration from '../contact/member-registration';
import ContactForm from '../contact/contactForm';
import ProfileImageUpload from '../common/images/ProfileImageUpload';
import useProjectRecruit from '../../hooks/useProjectRecruit';

const RecruitmentRegister = () => {
  const [projectInfo, setProjectInfo] = useState({
    name: '',
    intro: '',
    description: '',
    developmentStatus: '',
    techStack: {
      development: '',
      planning: '',
      design: ''
    },
    recruitment: {
      categories: [],
      requiredParts: [],
      requiredMembers: '',
      requiredSkills: ''
    },
    deadline: {
      startDate: null,
      endDate: null
    },
    contactMethods: []
  });
  
  const [serviceImages, setServiceImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentContact, setCurrentContact] = useState({ method: '', link: '' });

  // 카테고리 옵션
  const categories = ['Web', 'Server', 'iOS', 'Android', 'Design', 'PM', 'AI/데이터', '게임 개발', '기타'];

  const handleImageUpload = (imageKey) => {
    if (serviceImages.length < 10) {
      setServiceImages([...serviceImages, imageKey]);
    }
  };

  const handleImageRemove = (index) => {
    setServiceImages(serviceImages.filter((_, i) => i !== index));
  };

  const handleCategoryToggle = (category) => {
    setProjectInfo(prev => {
      const categories = prev.recruitment.categories;
      const newCategories = categories.includes(category)
        ? categories.filter(c => c !== category)
        : [...categories, category];
      
      return {
        ...prev,
        recruitment: {
          ...prev.recruitment,
          categories: newCategories
        }
      };
    });
  };

  const handleContactAdd = () => {
    if (currentContact.method && currentContact.link) {
      setProjectInfo(prev => ({
        ...prev,
        contactMethods: [...prev.contactMethods, { ...currentContact }]
      }));
      setCurrentContact({ method: '', link: '' });
    }
  };

  const handleContactRemove = (index) => {
    setProjectInfo(prev => ({
      ...prev,
      contactMethods: prev.contactMethods.filter((_, i) => i !== index)
    }));
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

  const handleProfileImageUpload = (imageUrl) => {
    setProfileImage(imageUrl);
    setProfileImagePreview(imageUrl);
  };

  const handleProfileImageRemove = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const handleSubmit = async () => {
    try {
      const { uploadImage, registerProject } = useProjectRecruit();

      // 프로필 이미지 업로드
      let thumbnailKeyName = null;
      if (profileImage) {
        thumbnailKeyName = await uploadImage(profileImage, 3);
      }

      // 서비스 소개 이미지들 업로드
      const projectImgKeyNameList = await Promise.all(
        serviceImages.map(image => uploadImage(image, 4))
      );

      const projectData = {
        title: projectInfo.name,
        info: projectInfo.intro,
        description: projectInfo.description,
        current_progress: projectInfo.developmentStatus,
        skill: projectInfo.recruitment.requiredSkills,
        part: projectInfo.recruitment.requiredParts,
        recruitNum: projectInfo.recruitment.requiredMembers,
        dev_stack: projectInfo.techStack.development,
        pm_stack: projectInfo.techStack.planning,
        design_stack: projectInfo.techStack.design,
        startDate: projectInfo.deadline.startDate,
        endDate: projectInfo.deadline.endDate,
        thumbnailKeyName,
        projectImgKeyNameList,
        projectMember: teamMembers.map(member => member.id),
        projectCategoryPrefer: projectInfo.recruitment.categories.map(category => {
          const categoryMap = {
            'Web': 1, 'Server': 2, 'iOS': 3, 'Android': 4,
            'Design': 5, 'PM': 6, 'AI/데이터': 7, '게임 개발': 8, '기타': 9
          };
          return categoryMap[category];
        }),
        contactMethod: projectInfo.contactMethods.map(contact => ({
          contactType: contact.method,
          contactUrl: contact.link
        }))
      };

      const response = await registerProject(projectData);
      if (response.isSuccess) {
        alert('프로젝트가 성공적으로 등록되었습니다.');
        // 등록 성공 후 리다이렉트 또는 추가 작업
      }
    } catch (error) {
      alert('프로젝트 등록에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <>
      <Banner 
        largeText="프로젝트 등록하기" 
        smallText="팀원을 모집하고 싶다면 나의 프로젝트를 등록해보세요!" 
      />
      <Container>
        <FormGroup>
          {/* 프로젝트 프로필 사진 & 기본 정보 */}
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
        </FormGroup>

        <FormGroup>
          {/* 프로젝트 설명, 개발 상황, 기술 스택 */}
          <Section>
            <Title>프로젝트 설명<Required>*</Required></Title>
            <TextArea 
              placeholder="프로젝트에 대해 자세히 설명해주세요"
              value={projectInfo.description}
              onChange={(e) => setProjectInfo({...projectInfo, description: e.target.value})}
            />
          </Section>

          <Section>
            <Title>개발 상황 및 발전 방향<Required>*</Required></Title>
            <TextArea 
              placeholder="현재 개발 상황과 앞으로의 발전 방향에 대해 설명해주세요"
              value={projectInfo.developmentStatus}
              onChange={(e) => setProjectInfo({...projectInfo, developmentStatus: e.target.value})}
            />
          </Section>

          <Section>
            <Title>사용한 기술 스택<Required>*</Required></Title>
            <TechStackContainer>
              <TechStackGroup>
                <Label>개발</Label>
                <Input 
                  type="text" 
                  placeholder="React, TypeScript, JWT, AWS"
                  value={projectInfo.techStack.development}
                  onChange={(e) => setProjectInfo({
                    ...projectInfo,
                    techStack: { ...projectInfo.techStack, development: e.target.value }
                  })}
                />
              </TechStackGroup>
              <TechStackGroup>
                <Label>기획</Label>
                <Input 
                  type="text" 
                  placeholder="Figma, Notion"
                  value={projectInfo.techStack.planning}
                  onChange={(e) => setProjectInfo({
                    ...projectInfo,
                    techStack: { ...projectInfo.techStack, planning: e.target.value }
                  })}
                />
              </TechStackGroup>
              <TechStackGroup>
                <Label>디자인</Label>
                <Input 
                  type="text" 
                  placeholder="Figma, Illustrator"
                  value={projectInfo.techStack.design}
                  onChange={(e) => setProjectInfo({
                    ...projectInfo,
                    techStack: { ...projectInfo.techStack, design: e.target.value }
                  })}
                />
              </TechStackGroup>
            </TechStackContainer>
          </Section>
        </FormGroup>

        <FormGroup>
          {/* 모집 정보 & 마감일 */}
          <Section>
            <Title>이런 분을 찾아요<Required>*</Required></Title>
            <RecruitmentContainer>
              <CategoryGroup>
                <Label>카테고리<Required>*</Required></Label>
                <CategoryButtons>
                  {categories.map(category => (
                    <CategoryButton
                      key={category}
                      selected={projectInfo.recruitment.categories.includes(category)}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </CategoryButton>
                  ))}
                </CategoryButtons>
              </CategoryGroup>

              <InputGroup>
                <Label>필요한 파트<Required>*</Required></Label>
                <Input 
                  type="text"
                  placeholder="프론트엔드 개발자, UI/UX 디자이너"
                  value={projectInfo.recruitment.requiredParts}
                  onChange={(e) => setProjectInfo({
                    ...projectInfo,
                    recruitment: { ...projectInfo.recruitment, requiredParts: e.target.value }
                  })}
                />
              </InputGroup>

              <InputGroup>
                <Label>필요한 인원<Required>*</Required></Label>
                <Input 
                  type="text"
                  placeholder="프론트엔드 2명, 디자이너 1명"
                  value={projectInfo.recruitment.requiredMembers}
                  onChange={(e) => setProjectInfo({
                    ...projectInfo,
                    recruitment: { ...projectInfo.recruitment, requiredMembers: e.target.value }
                  })}
                />
              </InputGroup>

              <InputGroup>
                <Label>필요한 역량<Required>*</Required></Label>
                <TextArea 
                  placeholder="필요한 기술 스택이나 역량을 자세히 설명해주세요"
                  value={projectInfo.recruitment.requiredSkills}
                  onChange={(e) => setProjectInfo({
                    ...projectInfo,
                    recruitment: { ...projectInfo.recruitment, requiredSkills: e.target.value }
                  })}
                />
              </InputGroup>
            </RecruitmentContainer>
          </Section>

          <Section>
            <Title>모집 기간<Required>*</Required></Title>
            <DateContainer>
              <DateWrapper>
                <Label>시작 날짜</Label>
                <DateList 
                  selectedDate={projectInfo.deadline.startDate}
                  onDateChange={(date) => setProjectInfo({
                    ...projectInfo, 
                    deadline: {
                      ...projectInfo.deadline,
                      startDate: date
                    }
                  })}
                  placeholder="시작일 선택"
                />
              </DateWrapper>
              <DateDivider>~</DateDivider>
              <DateWrapper>
                <Label>종료 날짜</Label>
                <DateList 
                  selectedDate={projectInfo.deadline.endDate}
                  onDateChange={(date) => setProjectInfo({
                    ...projectInfo, 
                    deadline: {
                      ...projectInfo.deadline,
                      endDate: date
                    }
                  })}
                  placeholder="마감일 선택"
                />
              </DateWrapper>
            </DateContainer>
          </Section>
        </FormGroup>

        <FormGroup>
          {/* 팀원 & 연락방법 */}
          <TeamMemberRegistration 
            onMembersUpdate={(members) => setTeamMembers(members)} 
          />
          <ContactForm 
            onContactUpdate={(contacts) => setProjectInfo(prev => ({
              ...prev,
              contactMethods: contacts
            }))} 
          />
        </FormGroup>

        <ButtonWrapper>
          <Button
            type={TYPES.NEXT}
            text="최종 등록하기"
            onClick={handleSubmit}
          /> 
        </ButtonWrapper>
        <Button
          type={TYPES.NEXT}
          sign='true'
          text='프로젝트 등록하기'
          onClick={handleSubmit}
        /> 
      </Container>
    </>
  );
};

export default RecruitmentRegister;

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

const TechStackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TechStackGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RecruitmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CategoryGroup = styled.div`
  margin-bottom: 16px;
`;

const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.selected ? '#0D29B7' : '#E1E1E1'};
  background-color: ${props => props.selected ? '#EAF1FF' : 'white'};
  color: ${props => props.selected ? '#0D29B7' : '#212121'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0D29B7;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
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

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
`;

const DateWrapper = styled.div`
  flex: 1;
`;

const DateDivider = styled.span`
  color: #212121;
  font-size: 20px;
  font-weight: 500;
  margin-top: 25px;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 60px;
  width: 95%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
`;
