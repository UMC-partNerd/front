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
          replies={comment.children || []}
          onReply={(replyText) => {
            console.log("onReply 호출됨:", replyText);
            onReply(comment.projectCommentId, replyText, type);
          }}
          onDelete={() => onDelete(comment.projectCommentId, type)}  // 댓글 삭제
          onUpdate={(commentId, newText, type) => onUpdate(commentId, newText, type)} // 댓글 수정
        />
      ))}
    </ProjectCommentListWrapper>
  );
};


export default ProjectCommentList;




