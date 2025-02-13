import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Banner from '../components/common/banner/Banner';
import ProjectImageUploadForm from '../components/teamregister/ProjectImageUploadForm';
import ClubInfoForm from '../components/teamregister/ClubInfoForm';
import axios from 'axios';

const TeamRegistration = () => {
  const fileInputRefProfile = useRef(null);
  const fileInputRefBanner = useRef(null);
  const [teamInfo, setTeamInfo] = useState({
    name: '',
    intro: '',
    contact: '',
    category: '',
    activities: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleProfileClick = () => {
    fileInputRefProfile.current.click();
  };

  const handleBannerClick = () => {
    fileInputRefBanner.current.click();
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'profile') {
      setProfileImage(file);
    } else if (type === 'banner') {
      setBannerImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 로딩 상태 시작
    setIsLoading(true);
    setErrorMessage('');
    
    // FormData 준비
    const formData = new FormData();
    formData.append('name', teamInfo.name);
    formData.append('intro', teamInfo.intro);
    formData.append('contact', teamInfo.contact);
    formData.append('category', teamInfo.category);
    formData.append('activities', teamInfo.activities);
    if (profileImage) formData.append('profileImage', profileImage);
    if (bannerImage) formData.append('bannerImage', bannerImage);

    // 로컬 스토리지에서 JWT 토큰 가져오기
    const token = localStorage.getItem('authToken');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
    console.log("Request URL:", `${API_BASE_URL}/api/partnerd/register`);  
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/partnerd/register`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('팀 등록 성공:', response.data);
      // 성공 처리 후, 사용자에게 알림 등 추가 기능
    } catch (error) {
      console.error('팀 등록 실패:', error);
      setErrorMessage('팀 등록에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };
  
  return (
    <>
      <Banner 
        largeText="프로젝트 등록하기" 
        smallText="팀원을 모집하고 싶다면 나의 프로젝트를 등록해보세요!" 
      />
      <Container>
        <ProjectImageUploadForm 
          handleProfileClick={handleProfileClick} 
          handleBannerClick={handleBannerClick}
          handleFileChange={handleFileChange}
        />
        <ClubInfoForm 
          teamInfo={teamInfo}
          setTeamInfo={setTeamInfo}
        />
        <SubmitButton onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? '등록 중...' : '팀 등록'}
        </SubmitButton>
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

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
