import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import styled from 'styled-components';


const CommentList = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ liked }) => (liked ? 'red' : '#ddd')};
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ProjectCommentList = () => {
  const [comments, setComments] = useState([]);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(), // 고유 ID 생성
      text,
      likes: 0, // 좋아요 기본값
      liked: false, // 좋아요 여부
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // 좋아요/취소 
  const handleLikeComment = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked, // 좋아요 상태 토글
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1, // 좋아요 수 증가/감소
            }
          : comment
      )
    );
  };

  return (
    <div>
      <ReplyForm onAddComment={handleAddComment} />
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <p>{comment.text}</p>
            <LikeButton liked={comment.liked} onClick={() => handleLikeComment(comment.id)}>
              <CiHeart />
              {comment.likes}
            </LikeButton>
          </CommentItem>
        ))}
      </CommentList>
    </div>
  );
};

export default ProjectCommentList;
