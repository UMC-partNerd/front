import React, { useState } from 'react';
import Banner from '../../components/common/banner/Banner';
import EventInfoForm from '../../components/collabregister/EventInfoForm'; 
import EventGuideForm from '../../components/collabregister/EventGuideForm';  
import EventImageUploadForm from '../../components/collabregister/EventImageUploadForm';
import styled from 'styled-components';
import Button, { TYPES } from '../../components/common/button';

import axios from 'axios';

const CollabRegistration = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [eventInfo, setEventInfo] = useState({
    title: '',
    intro: '',
    openDate: new Date().toISOString(),
    closeDate: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    collabTarget: '',
    eventTypeId: 1,
    eventMode: 0,
    description: '',
    bannerKeyName: '',
    mainKeyName: '',
    eventImgKeyNameList: [],
    contactMethodDTOList: [],
    categoryIds: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEventInfoChange = (newEventInfo) => {
    setEventInfo((prevState) => ({
      ...prevState,
      ...newEventInfo,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        title: eventInfo.title,
        intro: eventInfo.intro,
        openDate: eventInfo.openDate ? new Date(eventInfo.openDate).toISOString() : null,
        closeDate: eventInfo.closeDate ? new Date(eventInfo.closeDate).toISOString() : null,
        startDate: eventInfo.startDate ? new Date(eventInfo.startDate).toISOString() : null,
        endDate: eventInfo.endDate ? new Date(eventInfo.endDate).toISOString() : null,
        collabTarget: eventInfo.collabTarget,
        eventTypeId: eventInfo.eventTypeId,
        eventMode: eventInfo.eventMode,
        description: eventInfo.description, 
        bannerKeyName: bannerImage ? bannerImage : null,
        mainKeyName: profileImage ? profileImage : null,
        eventImgKeyNameList: eventInfo.eventImgKeyNameList,
        contactMethodDTOList: eventInfo.contactMethodDTOList.map(contact => ({
          contactType: contact.contactType,
          contactUrl: contact.contactUrl,
        })),
        categoryIds: eventInfo.categoryIds.map(id => parseInt(id, 10)),
      };

      const token = localStorage.getItem('jwtToken');

      const response = await axios.post('https://api.partnerd.site/api/collabPosts/', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('등록 성공', response.data);
    } catch (error) {
      console.error('등록 실패', error);
      setErrorMessage('등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Banner 
        largeText="행사 정보 입력하기"  
        smallText="협업 글을 작성하고 다양한 협업을 경험해보세요!" 
      />
      <Container>
        <EventImageUploadForm 
          setProfileImage={setProfileImage}
          setBannerImage={setBannerImage}
        />
        <EventInfoForm onDataChange={handleEventInfoChange} />
        <EventGuideForm onDataChange={handleEventInfoChange} />

        <Button
          type={TYPES.NEXT}
          sign='true'
          text={isLoading ? '등록 중...' : '최종 등록하기'}
          onClick={handleSubmit}
        /> 
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    </>
  );
};

export default CollabRegistration;



const Container = styled.div`
  background-color: #F3F4F7;
  width: 97.5%;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 10px;
`;