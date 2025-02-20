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

import useTopRank from '../../hooks/useTopRank';

const Top10Rank = () => {
  const { topRankData, isLoading, error } = useTopRank();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <RankingContainer>
      <RankingTitle>주간 인기 TOP 10</RankingTitle>
      <RankingList>
        {topRankData.map((item, index) => (
          <RankingItem key={item.id}>
            <Rank>{index + 1}</Rank>
            <ContentWrapper>
              <AuthorInfo>
                <Profile>
                  {item.profileImageUrl ? (
                    <img src={item.profileImageUrl} alt="프로필 이미지" />
                  ) : (
                    <div>기본 이미지</div>
                  )}
                </Profile>
                <Author>{item.nickName}</Author>
                <PartInfo>@{item.occupation_of_interest} / {item.belong_to_club}</PartInfo>
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
