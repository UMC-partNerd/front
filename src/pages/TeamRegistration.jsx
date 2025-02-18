import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/common/banner/Banner';
import ClubInfoForm from '../components/teamregister/ClubInfoForm'; 
import ProjectImageUploadForm from '../components/teamregister/ProjectImageUploadForm';  
import styled from 'styled-components';
import Button, { TYPES } from "../components/common/button";
import axios from 'axios';
import { PermissionRegistration } from '../components/contact/permission-registration';

const TeamRegistration = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [teamInfo, setTeamInfo] = useState({
    name: '',
    intro: '',
    contact: '',
    category: '',
    activities: '',
  });
  const [activityIntro, setActivityIntro] = useState(''); // 활동 소개 추가
  const [activityImageKeyNames, setActivityImageKeyNames] = useState([]); // 활동 이미지 추가
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 현재 경로 확인
  const location = useLocation();
  const isEditMode = location.pathname.includes('manage'); // 'manage' 경로가 있으면 edit 모드

  // 팀 정보 업데이트 함수
  const handleTeamInfoChange = (newTeamInfo) => {
    setTeamInfo((prevState) => ({
      ...prevState,
      ...newTeamInfo,
    }));
  };

  // 이름 변경 처리 함수
  const handleNameChange = (name) => {
    handleTeamInfoChange({ name });
  };

  // 한 줄 소개 변경 처리 함수
  const handleIntroChange = (intro) => {
    handleTeamInfoChange({ intro });
  };

  // 카테고리 변경 처리 함수
  const handleCategoryChange = (category) => {
    handleTeamInfoChange({ category });
  };

  // 연락 방법 변경 처리 함수
  const handleContactMethodsChange = (methods) => {
    handleTeamInfoChange({ contact: methods });
  };

  // 활동 소개 변경 처리 함수
  const handleActivityIntroChange = (intro) => {
    setActivityIntro(intro);
  };

  // 활동 이미지 변경 처리 함수
  const handleActivityImageChange = (imageKeyNames) => {
    setActivityImageKeyNames(imageKeyNames);
  };

  const onClickHandler = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        name: teamInfo.name,
        intro: teamInfo.intro,
        contact: teamInfo.contact,
        categoryId: teamInfo.category,
        activities: {
          intro: activityIntro,
          activityImageKeyNames: activityImageKeyNames,
        },
        bannerKeyName: bannerImage ? bannerImage : null,
        mainKeyName: profileImage ? profileImage : null,
      };

      const token = localStorage.getItem('jwtToken');
      
      const response = await axios.post('https://api.partnerd.site/api/partnerd/register', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('등록 성공', response.data);
    } catch (error) {
      console.error('등록 실패', error);
      setErrorMessage('팀 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Banner 
        largeText={isEditMode ? '팀 수정하기' : '팀 등록하기'}  
        smallText={isEditMode ? '팀 정보를 수정하세요!' : '팀을 모집하고 싶다면 나의 팀을 등록해보세요!'} 
      />
      <Container>
        <ProjectImageUploadForm 
          setProfileImage={setProfileImage}
          setBannerImage={setBannerImage}
        />
        <ClubInfoForm 
          teamInfo={teamInfo}
          handleNameChange={handleNameChange}
          handleIntroChange={handleIntroChange}
          handleCategoryChange={handleCategoryChange}
          handleContactMethodsChange={handleContactMethodsChange}
          handleActivityIntroChange={handleActivityIntroChange}
          handleActivityImageChange={handleActivityImageChange}
          activityIntro={activityIntro}
          activityImageKeyNames={activityImageKeyNames}
          isEditMode={isEditMode}
        />
        
        <PermissionRegistration />
        
        <Button
          type={TYPES.NEXT}
          text={isLoading ? '등록 중...' : isEditMode ? '수정 완료' : '최종 등록하기'}
          onClick={onClickHandler}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </>
  );
};

export default TeamRegistration;



const Container = styled.div`
  background-color: #F3F4F7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  & > :first-child {
    margin-bottom: 30px;
  }
`;


const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;



