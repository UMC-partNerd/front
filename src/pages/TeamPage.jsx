// TeamPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BannerPhoto from '../components/teamdetail/BannerPhoto';
import ProfilePhoto from '../components/teamdetail/ProfilePhoto';
import TeamInfo from '../components/teamdetail/TeamInfo';
import Activities from '../components/teamdetail/Activities';
import CollaborationFeed from '../components/teamdetail/CollaborationFeed';

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

const TeamPage = () => {
  const { clubId } = useParams();

  const clubs = [
    {
      id: '1',
      name: 'TechTech',
      description: '안녕하세요! IT 벤처 연합동아리 TectTect입니다.',
      category: '웹/앱 개발',
      contact: [
        { type: '인스타그램', link: '@tecttect_official' },
        { type: '오픈채팅방', link: 'tecttect1111' }
      ],
      activities: `안녕하세요. IT 벤처 연합 동아리 TectTect 입니다!
                   주요 활동으로는 연합 해커톤과 데모데이 등이 있습니다. 활동 사진을 참고해주세요:)`,
      images: [null, null, null],
      bannerSrc: null,
      profileSrc: null,
      collaborationFeed: [
        {
          id: 1,
          title: '2025 IT 컨퍼런스 공동 개최',
          content: `안녕하세요! 저희는 IT 연합동아리 TectTect 입니다.
                     2025년 1월에 대학생과 IT 산업 전문가가 함께하는 "IT의 미래를 말하다" 컨퍼런스를 준비 중입니다. 이번 행사를 더욱 풍성하게 만들기 위해 함께 협업할 IT 동아리를 찾고 있습니다. 학생과 사회 초년생을 위한 개발 및 인공지능 컨퍼런스라고 생각해주시면 됩니다.
                     1월 31일에 개최하는 것을 목표로 하고 있고 연사자 분은 섭외 중입니다.`,
          date: '2025. 01. 04',
        },
        {
          id: 2,
          title: 'IT 동아리 협업 네트워킹 플랫폼, ‘투게다’',
          content: `“다른 IT 동아리와 협업하거나, 프로젝트를 함께 할 동료를 구할 수는 없을까?”
                     투게다는 IT 동아리 네트워킹 플랫폼으로 타 동아리와의 협업을 촉진하고, 서비스 런칭을 위한 팀원을 모집할 수 있습니다...`,
          date: '2025. 01. 04',
        },
      ]
    }
  ];

  const club = clubs.find(c => c.id === clubId);

  if (!club) {
    return <div>동아리를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <BannerPhoto src={club.bannerSrc || DefaultImage} />
      <ProfilePhoto src={club.profileSrc || DefaultImage} />
      <TeamPageWrapper>
        <TeamPageContainer>
          <TeamInfo 
            name={club.name} 
            description={club.description} 
            category={club.category} 
            contact={club.contact || []} 
          />
          <Activities activities={club.activities} images={club.images || []} />
          <CollaborationFeed feed={club.collaborationFeed} />
        </TeamPageContainer>
      </TeamPageWrapper>
    </>
  );
};

export { TeamPage };  // named export로 변경
