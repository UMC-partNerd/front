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
import CustomModal, { VERSIONS } from "../components/common/button/CustomModal";

const DefaultImage = '/default-image.png'; // 기본 이미지

const TeamPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0% 10% 0% 10%;
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
  margin-top: 30px;
  margin-bottom: 20px;  // 여기서 버튼 밑에 마진을 추가
`;


const TeamPage = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [collabPosts, setCollabPosts] = useState([]);  // 콜라보레이션 피드 상태 추가
  const navigate = useNavigate();

  const [openFirstModal, setopenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  // 동아리 정보 및 콜라보레이션 피드 가져오기
  useEffect(() => {
    const fetchClubDetails = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('로그인이 필요합니다.');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching club details...');
        // 동아리 정보 및 콜라보레이션 포스트 가져오기
        const clubResponse = await axios.get(`https://api.partnerd.site/api/partnerd/${clubId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        console.log('Club details response:', clubResponse);  // 응답 확인
        setClub(clubResponse.data.result);

        // 콜라보레이션 포스트 가져오기 (팀 페이지 API 응답에 포함)
        const collabPosts = clubResponse.data.result.collaborationPosts || []; // 새롭게 추가된 부분
        setCollabPosts(collabPosts.slice(0, 2));  // 최신 2개 피드만 저장
      } catch (err) {
        console.error('Error fetching data:', err);  // 오류 메시지 출력
        setError('동아리 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubId]);

  // 배너 이미지 및 메인 사진 로드
  const { 
    bannerPhotoUrl, 
    mainPhotoUrl, 
    eventPhotoUrls, 
    isLoading: bannerLoading, 
    error: bannerError 
  } = useBannerPhoto(
    'club',  // 폴더 이름 (예: 'club', 'projects' 등)
    club?.bannerImage ? `club/BANNER/${club.bannerImage.split('/').pop()}` : null,  
    club?.profileImage ? `club/MAIN/${club.profileImage.split('/').pop()}` : null,  
    club?.activity?.activityImageKeyNames ? club.activity.activityImageKeyNames.map(key => `club/EVENT/${key.split('/').pop()}`) : [] 
  );

  // 로딩 처리
  if (isLoading || bannerLoading) {
    return <div>로딩 중...</div>;
  }

  if (error || bannerError) {
    return <div>오류: {error || bannerError}</div>;
  }

  if (!club) {
    return <div>동아리를 찾을 수 없습니다.</div>;
  }

  // 삭제 기능
  const onDelete = async (clubId) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await axios.delete(`https://api.partnerd.site/api/partnerd/${clubId}`, {
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

  // 버튼 클릭 시 모달1을 띄우는 함수
  const clubJoinHandler = () => {
    setopenFirstModal(true);
  };

  // 모달: 승인 함수
  const joinHandler = async () => {
    setOpenSecondModal(true);
    setopenFirstModal(false);
  };

  // 리더 확인: 리더의 이름을 기준으로 리더인지 확인
  const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userName = decodedToken?.name;  // jwt 토큰에서 사용자 이름을 가져옴

  // 리더인지 확인하는 로직 (리더의 name과 비교)
  const isLeader = club?.leaderMembers?.some(leader => leader.name === userName);

  // 콘솔로 확인
  console.log('리더?', isLeader);

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
            onDelete={onDelete}
            isLeader={isLeader}  // 리더 여부 전달
          />
          <Activities activities={club.activity.intro} images={eventPhotoUrls || []} />
          <CollaborationFeed feed={collabPosts} />
        </TeamPageContainer>
        <ChatWrapp>
        <Button
         type={TYPES.NEXT}
         text='동아리 참여하기'
         onClick={clubJoinHandler}
         style={{ marginBottom: '20px' }}  // 버튼 밑에 20px 마진 추가
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
          <Chatlist style={{ marginTop: '100px' }} />
          <ChatListALL style={{ marginTop: '30px' }} />
        </ChatWrapp>
      </TeamPageWrapper>
    </>
  );
};

export { TeamPage };
