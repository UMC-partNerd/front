import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const CommentListWrapper = styled.div`
  margin-top: 20px;
  width: 540px;
`;

const CommentList = ({ comments, onReply, onDelete, onUpdate }) => {
  return (
    <CommentListWrapper>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          text={comment.text}
          user={comment.user}
          date={comment.date}
          replies={comment.replies}
          onReply={(replyText) => onReply(index, replyText)}
          onDelete={() => onDelete(index)}
          onUpdate={(newText) => onUpdate(index, newText)}
        />
      ))}
    </CommentListWrapper>
  );
};

export default CommentList;