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
  const navigate = useNavigate();

  // 동아리 정보
  useEffect(() => {
    console.log("클럽 ID:", clubId); 
  
    const fetchClubDetails = async () => {
      // 로컬 스토리지에서 토큰을 가져옵니다.
      const token = localStorage.getItem('jwtToken');
      console.log('Retrieved Token:', token);  // 디버깅: 로컬 스토리지에서 가져온 토큰을 확인
  
      // 토큰이 없는 경우 처리
      if (!token) {
        console.error('토큰이 없습니다!');
        setError('토큰이 없습니다. 로그인을 확인해주세요.');
        setIsLoading(false);
        return;  // 토큰이 없으면 요청을 보내지 않습니다.
      }
  
      try {
        const response = await axios.get(`https://api.partnerd.site/api/partnerd/${clubId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        console.log('API Response:', response.data);  // 디버깅: 서버 응답 확인
        setClub(response.data.result);  
      } catch (err) {
        console.error('API Error:', err);  // 디버깅: 오류 발생 시 에러 로그 확인
        setError('동아리 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchClubDetails();
  }, [clubId]);
  
  // 배너 이미지 및 메인 사진 로드
  const { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, isLoading: bannerLoading, error: bannerError } = useBannerPhoto(
    'club',
    club?.bannerImage ? club.bannerImage.split('/').pop() : null,
    club?.profileImage ? club.profileImage.split('/').pop() : null,
    club?.activity?.activityImageKeyNames ? club.activity.activityImageKeyNames.map(key => key.split('/').pop()) : []
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
      // 삭제 성공 후 리디렉션
      alert('팀이 삭제되었습니다.');
      navigate('/find');  // 삭제 후 동아리 목록 페이지로 이동
    } catch (err) {
      alert('삭제 실패. 다시 시도해 주세요.');
    }
  };

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
          <Chatlist />
          <ChatListALL />
        </ChatWrapp>
      </TeamPageWrapper>
    </>
  );
};

export { TeamPage };
