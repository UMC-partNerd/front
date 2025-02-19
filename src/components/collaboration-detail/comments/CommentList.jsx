import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, collabPostId, onReply, onDelete, onUpdate }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          collabPostId={collabPostId}
          collabInquiryId={comment.id}  
          text={comment.text}
          user={comment.user}
          date={comment.date}
          replies={comment.replies}
          onReply={(replyText) => onReply(comment.id, replyText)} 
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default CommentList;
