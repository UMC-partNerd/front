import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './PostItem';
import styled from 'styled-components';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 2; // 한 번에 불러올 게시글 개수

    const allPosts = [
      {
        profileImage: '/images/profile1.png',
        nickname: '노브',
        role: 'PM',
        team: 'TectTect',
        title: 'UMC 7기 프로젝트 파트너드 배포',
        summary: `UMC 7기 프로젝트 파트너드 (partNerd)를 소개합니다!\n\n파트너드는 IT 동아리 네트워킹 플랫폼으로, 3월 21일을 출시 목표로 하고 있습니다.\n많은 관심 부탁드립니다!!`,
        date: '2025-02-03',
      },
      {
        profileImage: '/images/profile2.png',
        nickname: '선샤인',
        role: 'Server',
        team: 'LVflower',
        title: 'Git 충돌 해결하는 법이 뭘까요?',
        summary: '최근 팀 프로젝트를 진행하면서 Git 충돌을 겪고 있습니다ㅜㅜ\n\n이걸 해결할 수 있는 최적의 방법이 뭔지 모르겠어요;; 혹시 여러분은 이럴 때 어떻게 해결하시...',
        date: '2025-02-02',
      },
      {
        profileImage: '/images/profile3.png',
        nickname: '데이터맨',
        role: 'Data',
        team: 'InsightClub',
        title: '데이터 분석을 위한 SQL 꿀팁!',
        summary: '데이터 분석을 하면서 SQL을 효과적으로 활용하는 방법을 공유합니다.',
        date: '2025-02-01',
      },
      // 임시 데이터 추가
      {
        profileImage: '/images/profile4.png',
        nickname: '알렉스',
        role: 'Frontend',
        team: 'TechSquad',
        title: 'React에서 상태 관리 라이브러리 선택하기',
        summary: 'React에서 상태 관리 라이브러리를 선택할 때 고려해야 할 사항과 라이브러리별 장단점을 소개합니다.',
        date: '2025-01-31',
      }
    ]; //임시 데이터
    

  useEffect(() => {
    fetchMorePosts(); 
  }, []);

  const fetchMorePosts = () => {
    setTimeout(() => {
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const newPosts = allPosts.slice(startIndex, endIndex);
  
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  
     
      if (endIndex >= allPosts.length) {
        setHasMore(false);
      }
  
      setPage((prevPage) => prevPage + 1);
    }, 1000); 
  };
  

  return (
    <PostListWrapper>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>로딩 중...</h4>}
        endMessage={<p>모든 게시물을 불러왔습니다.</p>}
      >
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </InfiniteScroll>
    </PostListWrapper>
  );
};

const PostListWrapper = styled.div`
  padding: 10px;
`;

export const PostItemWrapper = styled.div`
  white-space: pre-line;  
`;

const PostSummary = styled.p`
  font-size: 0.9rem;
  color: #414141;
  white-space: pre-line; 
  margin: 0;
  padding: 0;
  text-indent: 0;
  line-height: 1.4em;
  font-weight: 500;
  font-size: 15px;
  word-break: break-word; 
`;

export default PostList;
