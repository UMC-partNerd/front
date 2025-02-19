import React, { useState, useEffect, useRef } from 'react';
import CommCommentList from './CommCommentList'; 
import CommentInput from './CommentInput'; 
import OptionMenu from '../../components/common/button/optionMenu';

import { 
  PostWrapper, PostHeader, UserInfo, UserName, Role, PostDate,
  PostContent, PostTitle, PostSummary, ImageSection, LargeImageWrapper,
  SmallImageWrapper, ImageBox, CommentSection, CommentWrapper 
} from '../../styled-components/community-styles/styled-PostItem';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const PostItem = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []); // 댓글 상태 추가

  const handleAddComment = (commentText) => {
    setComments([...comments, { text: commentText, user: '사용자', date: new Date().toLocaleString(), replies: [] }]);
  };

  return (
    <PostWrapper>
      <PostHeader>
        <UserInfo>
          <UserName>{post.nickname} <Role>@{post.role} / {post.team}</Role></UserName>
          <PostDate>{formatDate(post.date)}</PostDate>
        </UserInfo>
        
        {/* OptionMenu 컴포넌트 분리 */}
        <OptionMenu/>

      </PostHeader>
      <PostContent>
        <PostTitle>{post.title}</PostTitle>
        <PostSummary>{post.summary}</PostSummary>
        <ImageSection>
          <LargeImageWrapper>
            <ImageBox large />
            <ImageBox large />
          </LargeImageWrapper>
          <SmallImageWrapper>
            <ImageBox />
            <ImageBox />
            <ImageBox />
          </SmallImageWrapper>
        </ImageSection>
      </PostContent>
      <CommentSection>
        <CommentWrapper>
          <CommentInput onAddComment={handleAddComment} /> {/* 댓글 입력창 추가 */}
          <CommCommentList 
            comments={comments} 
            onReply={(index, replyText) => console.log(`댓글 ${index}에 대한 답글: ${replyText}`)} 
            onDelete={(index) => console.log(`댓글 ${index} 삭제`)}
            onUpdate={(index, newText) => console.log(`댓글 ${index} 업데이트: ${newText}`)} 
          />
        </CommentWrapper>
      </CommentSection>
    </PostWrapper>
  );
};

export default PostItem;
