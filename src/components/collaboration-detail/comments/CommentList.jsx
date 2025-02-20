import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, collabPostId, onReply, onDelete, onUpdate }) => {
  return (
    <div>
      {comments.map((comment) => (
    <Comment
    key={comment.id || comment.nickname}  // id가 없으면 닉네임을 key로 사용
    collabPostId={collabPostId}
    collabInquiryId={comment.id}
    text={comment.contents}
    user={comment.nickname || '임시 닉네임'}
    date={comment.date}
    replies={comment.replies}
    onReply={(replyText) => onReply(comment.id, replyText)}
    onDelete={() => onDelete(comment.id)}
    onUpdate={onUpdate}
  />
  
      ))}
    </div>
  );
};

export default CommentList;
