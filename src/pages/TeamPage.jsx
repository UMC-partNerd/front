import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import BannerPhoto from '../components/teamdetail/BannerPhoto';
import ProfilePhoto from '../components/teamdetail/ProfilePhoto';
import TeamInfo from '../components/teamdetail/TeamInfo';
import Activities from '../components/teamdetail/Activities';
import CollaborationFeed from '../components/teamdetail/CollaborationFeed';
import Chatlist from '../components/common/Chatlist_owner';
import ChatListALL from '../components/common/Chatlist_members';
import useBannerPhoto from '../hooks/useBannerPhoto';
import Button, { TYPES } from "../components/common/button";
import CustomModal, { VERSIONS } from "../components/common/modal/CustomModal";

const DefaultImage = '/default-image.png'; // 기본 이미지 

const TeamPageWrapper = styled.div`
  display: flex;
  justify-content: center;  
`;

const TeamPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1400px;
  margin-left: 70px;
  box-sizing: border-box;
`;

const ChatWrapp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 20px;
`;

const TeamPage = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 동아리 정보 로드
  useEffect(() => {
    console.log("클럽 ID:", clubId); // clubId가 변경될 때마다 실행됨
    const fetchClubDetails = async () => {
      const token = localStorage.getItem('jwtToken');
      try {
        const response = await axios.get(`https://api.partnerd.site/api/partnerd/${clubId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setClub(response.data.result);  // club 상태 업데이트 -> 리렌더링 발생 가능
      } catch (err) {
        setError('동아리 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchClubDetails();
  }, [clubId]); // clubId가 바뀔 때만 실행
  

  // club이 로드된 후, useBannerPhoto 훅을 호출
  const { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, isLoading: bannerLoading, error: bannerError } = useBannerPhoto(
    'ClubBannerImage',
    club?.bannerImage ? club.bannerImage.split('/').pop() : null,
    club?.profileImage ? club.profileImage.split('/').pop() : null,
    club?.activity?.activityImageKeyNames ? club.activity.activityImageKeyNames.map(key => key.split('/').pop()) : []
  );

  if (isLoading || bannerLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || bannerError) {
    return <div>오류: {error || bannerError}</div>;
  }

  if (!club) {
    return <div>동아리를 찾을 수 없습니다.</div>;
  }

  const [openFirstModal, setopenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  // 버튼 클릭 시 모달1을 띄우는 함수
  const clubJoinHandler = () => {
    setopenFirstModal(true);
  };

  // 모달: 승인 함수
  const joinHandler = async () => {
    // 참여 요청 보내기
    // await api.joinClub();

    // 모달2 열기 
    setOpenSecondModal(true);
    // 모달1 닫기
    setopenFirstModal(false);
  };

  return (
    <>
      <BannerPhoto src={bannerPhotoUrl || DefaultImage} />
      <ProfilePhoto src={mainPhotoUrl || DefaultImage} />
      <TeamPageWrapper>
        <TeamPageContainer>
          <TeamInfo 
            name={club.name} 
            description={club.intro} 
            category={club.category} 
            contact={club.contactMethod || []}
            clubId={clubId} 
          />
          <Activities activities={club.activity.intro} images={eventPhotoUrls || []} />
          <CollaborationFeed feed={club.collabPosts} />
        </TeamPageContainer>
        <ChatWrapp>
          <Button
            type={TYPES.NEXT}
            text='동아리 참여하기'
            onClick={clubJoinHandler}
          /> 
          <CustomModal
            openModal={openFirstModal} 
            closeModal={() => setopenFirstModal(false)}
           
            boldface='동아리에 참여하시겠습니까?'
            regular='동아리 가입을 위해서는 동아리 리더진의 승인을 기다려야 합니다.'
            text='참여하기'
            onClickHandler={joinHandler}
            variant={VERSIONS.VER3}
          />
          
          <CustomModal
            openModal={openSecondModal} 
            closeModal={() => setOpenSecondModal(false)}

            boldface='동아리 참여 완료!'
            regular='동아리 가입 신청이 완료되었습니다. 승인 후 자동으로 참여됩니다.'
            variant={VERSIONS.VER2}
          />
          <Chatlist />
          <ChatListALL />
        </ChatWrapp>
      </TeamPageWrapper>
    </>
  );
};

export { TeamPage };
