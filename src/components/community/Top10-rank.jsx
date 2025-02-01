import React from 'react';

import{
    RankingContainer,
    RankingTitle,
    RankingList,
    RankingItem,
    Rank,
    ContentWrapper,
    AuthorInfo,
    Profile,
    Author,
    PartInfo,
    Title
} from "../../styled-components/styled-Top10-rank";

const Top10Rank = () => {
  // 실제 데이터는 API를 통해 받아올 예정
  const rankingData = [
    {
        id: 1,
        author: '노브',
        profile: '🧑‍💻',
        part: 'PM',
        project: 'TectTect',
        title: 'UMC 7기 프로젝트 파트너드 배포'
      },
      {
        id: 2,
        author: '희수',
        profile: '👩‍🎨',
        part: '디자인',
        project: 'Picshare',
        title: 'UMC 7기 프로젝트 UI 개선 완료'
      },
      {
        id: 3,
        author: '태호',
        profile: '🧑‍💼',
        part: '기획',
        project: 'EventFlow',
        title: 'UMC 7기 프로젝트 기획안 제출'
      },
      {
        id: 4,
        author: '가영',
        profile: '👩‍💻',
        part: '백엔드',
        project: 'CloudSync',
        title: 'UMC 7기 프로젝트 서버 배포 완료'
      },
      {
        id: 5,
        author: '준혁',
        profile: '🧑‍💻',
        part: '프론트엔드',
        project: 'QuickCart',
        title: 'UMC 7기 프로젝트 리액트 적용'
      },
      {
        id: 6,
        author: '소연',
        profile: '👩‍💼',
        part: 'PM',
        project: 'EcoTrack',
        title: 'UMC 7기 프로젝트 일정 관리'
      },
      {
        id: 7,
        author: '민수',
        profile: '🧑‍💻',
        part: '백엔드',
        project: 'DataVault',
        title: 'UMC 7기 프로젝트 DB 설계 완료'
      },
      {
        id: 8,
        author: '유진',
        profile: '👩‍🎨',
        part: '디자인',
        project: 'Artify',
        title: 'UMC 7기 프로젝트 디자인 리소스 완성'
      },
      {
        id: 9,
        author: '지훈',
        profile: '🧑‍💻',
        part: '프론트엔드',
        project: 'ShopEase',
        title: 'UMC 7기 프로젝트 UI 컴포넌트 개발'
      },
      {
        id: 10,
        author: '수아',
        profile: '👩‍💻',
        part: '백엔드',
        project: 'SecurePay',
        title: 'UMC 7기 프로젝트 API 보안 강화'
      }
    // ... 나머지 데이터
  ];

  return (
    <RankingContainer>
      <RankingTitle>주간 인기 TOP 10</RankingTitle>
      <RankingList>
        {rankingData.map((item, index) => (
          <RankingItem key={item.id}>
            <Rank>{index + 1}</Rank>
            <ContentWrapper>
              <AuthorInfo>
                <Profile>{item.profile}</Profile>
                <Author>{item.author}</Author>
                <PartInfo>@{item.part} / {item.project}</PartInfo>
              </AuthorInfo>
              <Title>{item.title}</Title>
            </ContentWrapper>
          </RankingItem>
        ))}
      </RankingList>
    </RankingContainer>
  );
};



export default Top10Rank;
