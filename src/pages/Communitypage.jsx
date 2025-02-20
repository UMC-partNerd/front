import React from 'react';
import CommuRegist from '../components/community/Postregist';
import PostList from '../components/community/PostList'; 
import Top10Rank from '../components/community/Top10-rank';
import styled from 'styled-components';

const CommunityPage = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <RankWrapper>
          <Top10Rank />
        </RankWrapper>
        <MainContentWrapper>
          <CommuRegist /> 
          <PostListWrapper>
            <PostList /> 
          </PostListWrapper>
        </MainContentWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default CommunityPage;

const PageWrapper = styled.div`
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const RankWrapper = styled.div`
  width: 300px;
  flex-shrink: 0;
  margin-left: -10px;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PostListWrapper = styled.div`
  max-width: 800px; 
  width: 100%;
`;
