import React from 'react';
import CommuRegist from '../components/community/Postregist';
import PostList from '../components/community/PostList'; 
import styled from 'styled-components';

const CommunityPage = () => {
  return (
    <PageWrapper>
      <CommuRegist /> 
      <PostListWrapper>
        <PostList /> 
      </PostListWrapper>
    </PageWrapper>
  );
};

export default CommunityPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-end; 
  padding: 20px;
`;

const PostListWrapper = styled.div`
  max-width: 800px; 
  width: 100%;
`;
