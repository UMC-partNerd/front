import React from 'react';
import styled from 'styled-components';
import CommComment from './CommComment';

const CommCommentListWrapper = styled.div`
  margin-top: 20px;
  width: 680px;
`;

const CommCommentList = ({ comments, onReply, onDelete, onUpdate }) => {
  if (!Array.isArray(comments)) {
    return <div>No comments available</div>; 
  }

  return (
    <CommCommentListWrapper>
      {comments.map((comment, index) => (
        <CommComment
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
    </CommCommentListWrapper>
  );
};

export default CommCommentList;
