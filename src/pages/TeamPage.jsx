import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  // 상태 관리
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  // 배너 이미지 및 메인 사진 로드
  const { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, isLoading: bannerLoading, error: bannerError } = useBannerPhoto(
    'club',
    club?.bannerImage ? club.bannerImage.split('/').pop() : null,
    club?.profileImage ? club.profileImage.split('/').pop() : null,
    club?.activity?.activityImageKeyNames ? club.activity.activityImageKeyNames.map(key => key.split('/').pop()) : []
  );

  // 동아리 정보 가져오기
  useEffect(() => {
    const fetchClubDetails = async () => {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        setError('토큰이 없습니다. 로그인을 확인해주세요.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://api.partnerd.site/api/partnerd/${clubId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setClub(response.data.result);
      } catch (err) {
        setError('동아리 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubId]);

  // 삭제 기능
  const onDelete = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      await axios.delete(`https://api.partnerd.site/api/partnerd/${clubId}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      alert('팀이 삭제되었습니다.');
      navigate('/find');
    } catch (err) {
      alert('삭제 실패. 다시 시도해 주세요.');
    }
  };

  // 모달 핸들러
  const clubJoinHandler = () => {
    setOpenFirstModal(true);
  };

  const joinHandler = async () => {
    setOpenSecondModal(true);
    setOpenFirstModal(false);
  };

  if (isLoading || bannerLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || bannerError) {
    return <div>에러: {error || bannerError}</div>;
  }

  return (
    <>
      <BannerPhoto src={bannerPhotoUrl || DefaultImage} />
      <ProfilePhoto src={mainPhotoUrl || DefaultImage} />
      <TeamPageWrapper>
        <TeamPageContainer>
          {/* TeamInfo 컴포넌트에 onDelete 함수 전달 */}
          <TeamInfo 
            name={club.name} 
            description={club.intro} 
            category={club.category} 
            contact={club.contactMethod || []}
            clubId={clubId} 
            onDelete={onDelete}  // 삭제 함수 전달
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
            closeModal={() => setOpenFirstModal(false)}
            boldface="동아리에 가입하시겠습니까?"
            regular="동아리 가입 신청을 하시면 동아리 리더의 승인 후 가입이 완료됩니다."
            text="신청하기"
            onClickHandler={joinHandler}
            variant={VERSIONS.VER3}
          />
          
          <CustomModal
            openModal={openSecondModal}
            closeModal={() => setOpenSecondModal(false)}
            boldface="가입 신청이 완료되었습니다"
            regular="동아리 리더의 승인을 기다려주세요"
            text="확인"
            onClickHandler={() => setOpenSecondModal(false)}
            variant={VERSIONS.VER3}
          />
          <Chatlist />
          <ChatListALL />
        </ChatWrapp>
      </TeamPageWrapper>
    </>
  );
};

export default TeamPage;
