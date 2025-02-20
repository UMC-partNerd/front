import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/common/banner/Banner';
import ClubInfoForm from '../components/teamregister/ClubInfoForm'; 
import ProjectImageUploadForm from '../components/teamregister/ProjectImageUploadForm';  
import styled from 'styled-components';
import Button, { TYPES } from "../components/common/button";
import axios from 'axios';
import { PermissionRegistration } from '../components/contact/permission-registration';
import CustomModal, { VERSIONS } from "../components/common/modal/CustomModal";


const TeamRegistration = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [teamInfo, setTeamInfo] = useState({
    name: '',
    intro: '',
    contact: [], // 연락처 배열을 초기화
    category: '',
    activities: '', // activities 필드도 수정된 경우 필요 없을 수 있습니다
  });
  const [activityIntro, setActivityIntro] = useState('');
  const [activityImageKeyNames, setActivityImageKeyNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  // 현재 경로 확인
  const location = useLocation();
  const isEditMode = location.pathname.includes('manage'); 

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
        contactMethod: teamInfo.contact, // teamInfo.contact 배열을 그대로 전달
        categoryId: teamInfo.category,
        activity: {  // 'activities'에서 'activity'로 변경
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
      setOpenModal(true); // 등록 후 모달 열기
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
        
        <CustomModal
          openModal={openModal} 
          closeModal={() => setOpenModal(false)}
          boldface='동아리 등록 완료!'
          regular='팀페이지 관리는 마이페이지 > 팀페이지지에서 가능합니다.'
          variant={VERSIONS.VER2}
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


