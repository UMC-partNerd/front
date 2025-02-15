import React from 'react';
import styled from 'styled-components';
import ProjectComment from './ProjectComment'; 

const ProjectCommentListWrapper = styled.div`
  margin-top: 20px;
  width: 600px;
`;

const ProjectCommentList = ({ comments, onReply, onDelete, onUpdate }) => {
  return (
    <ProjectCommentListWrapper>
      {comments.map((comment, index) => (
        <ProjectComment
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
    </ProjectCommentListWrapper>
  );
};

export default ProjectCommentList;
