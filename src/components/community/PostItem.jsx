import React, { useState, useEffect, useRef } from 'react';
import { MdMoreVert } from 'react-icons/md';
import CommCommentList from './CommCommentList'; 
import CommentInput from './CommentInput'; 
import { 
  PostWrapper, PostHeader, UserInfo, UserName, Role, PostDate,
  MoreOptionsWrapper, VerticalIcon, SMoreOptionsMenu, SMenuItem, SDivider, 
  PostContent, PostTitle, PostSummary, ImageSection, LargeImageWrapper,
  SmallImageWrapper, CommentSection, CommentWrapper
} from '../../styled-components/community-styles/styled-PostItem';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const PostItem = ({ post }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [comments, setComments] = useState(post.comments || []); // 댓글 상태 추가
  const menuRef = useRef(null); // 메뉴를 감지할 ref 추가

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    console.log('수정하기 클릭');
  };

  const handleDeleteClick = () => {
    console.log('삭제하기 클릭');
  };

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
        <MoreOptionsWrapper ref={menuRef}>
          <VerticalIcon onClick={() => setShowOptions(!showOptions)} />
          <SMoreOptionsMenu show={showOptions ? "true" : undefined}>
            <SMenuItem onClick={handleEditClick}>수정하기</SMenuItem>
            <SDivider />
            <SMenuItem onClick={handleDeleteClick}>삭제하기</SMenuItem>
          </SMoreOptionsMenu>
        </MoreOptionsWrapper>
      </PostHeader>
      <PostContent>
        <PostTitle>{post.title}</PostTitle>
        <PostSummary>{post.summary}</PostSummary>
        <ImageSection>
          <LargeImageWrapper>
            <img src="/c.png" alt="Large Image 1" style={{ width: '48%', borderRadius: '3px', objectFit: 'cover' }} />
            <img src="/2.png" alt="Large Image 2" style={{ width: '48%', borderRadius: '3px', objectFit: 'cover' }} />
          </LargeImageWrapper>

          <SmallImageWrapper>
            <img src="/3.png" alt="Image 1" style={{ width: '30%', borderRadius: '3px', objectFit: 'cover' }} />
            <img src="/4.png" alt="Image 2" style={{ width: '30%', borderRadius: '3px', objectFit: 'cover' }} />
            <img src="/5.png" alt="Image 3" style={{ width: '30%', borderRadius: '3px', objectFit: 'cover' }} />
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
