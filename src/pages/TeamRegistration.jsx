import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // useNavigate 추가
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
    contact: [],
    category: '',
    activities: '',
  });
  const [activityIntro, setActivityIntro] = useState('');
  const [activityImageKeyNames, setActivityImageKeyNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const isEditMode = location.pathname.includes('manage');

  const navigate = useNavigate();  // useNavigate 훅 추가

  const handleTeamInfoChange = (newTeamInfo) => {
    setTeamInfo((prevState) => ({
      ...prevState,
      ...newTeamInfo,
    }));
  };

  const handleNameChange = (name) => handleTeamInfoChange({ name });
  const handleIntroChange = (intro) => handleTeamInfoChange({ intro });
  const handleCategoryChange = (category) => handleTeamInfoChange({ category });
  const handleContactMethodsChange = (methods) => handleTeamInfoChange({ contact: methods });
  const handleActivityIntroChange = (intro) => setActivityIntro(intro);
  const handleActivityImageChange = (imageKeyNames) => setActivityImageKeyNames(imageKeyNames);

  const onClickHandler = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        name: teamInfo.name,
        intro: teamInfo.intro,
        contactMethod: teamInfo.contact,
        categoryId: teamInfo.category,
        activity: {
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
      setOpenModal(true);  // 등록 후 모달 열기
    } catch (error) {
      console.error('등록 실패', error);
      setErrorMessage('팀 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    navigate('/find');  // 모달 닫고 /find 페이지로 이동
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
          closeModal={handleModalClose}  // 모달 닫기 처리
          boldface='동아리 등록 완료!'
          regular='팀페이지 관리는 마이페이지 > 팀페이지에서 가능합니다.'
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


