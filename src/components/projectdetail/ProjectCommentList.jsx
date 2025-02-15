import React from 'react';
import styled from 'styled-components';
import ProjectComment from './ProjectComment';

const ProjectCommentListWrapper = styled.div`
  margin-top: 20px;
  width: 600px;
`;

const ProjectCommentList = ({ comments, onReply, onDelete, onUpdate, type }) => {
  return (
    <ProjectCommentListWrapper>
      {comments.map((comment) => (
        <ProjectComment
          key={comment.projectCommentId}
          commentId={comment.projectCommentId} 
          text={comment.contents}
          user={comment.user}
          date={comment.createdDate}
          replies={comment.replies}
          onReply={(replyText) => onReply(comment.projectCommentId, replyText, type)}
          onDelete={() => onDelete(comment.projectCommentId, type)}
          onUpdate={(commentId, newText, type) => {
            console.log("댓글 수정 처리함:", newText); 
            console.log("commentId in onUpdate:", commentId); 
            console.log("type in onUpdate:", type); 
            onUpdate(commentId, newText, type); 
          }}
        />
      ))}
    </ProjectCommentListWrapper>
  );
};

export default ProjectCommentList;



