import React from 'react';
import styled from 'styled-components';
import ProjectComment from './ProjectComment';

const ProjectCommentListWrapper = styled.div`
  margin-top: 20px;
  width: 600px;
`;

const ProjectCommentList = ({ comments, onReply, onDelete, onUpdate, type, profileImageUrl }) => {
  return (
    <ProjectCommentListWrapper>
      {comments.map((comment) => {
        // 댓글 ID 처리: recruit와 promote를 구분
        const commentId = type === 'recruit' ? comment.projectCommentId : comment.promotionProjectCommentId;
        
        return (
          <ProjectComment
            key={commentId}
            commentId={commentId} // 여기서 적절한 댓글 ID를 사용
            text={comment.contents}
            user={comment.user}
            date={comment.createdDate}
            replies={comment.children || []}
            profileImageUrl={profileImageUrl} // 프로필 이미지 URL 전달
            onReply={(replyText) => {
              console.log("onReply 호출됨:", replyText);
              onReply(commentId, replyText, type); // 댓글 ID와 type을 전달
            }}
            onDelete={() => onDelete(commentId, type)}  // 댓글 삭제
            onUpdate={(commentId, newText, type) => onUpdate(commentId, newText, type)} // 댓글 수정
          />
        );
      })}
    </ProjectCommentListWrapper>
  );
};

export default ProjectCommentList;




