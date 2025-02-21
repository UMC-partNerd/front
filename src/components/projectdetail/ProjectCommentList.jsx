import React from 'react';
import styled from 'styled-components';
import ProjectComment from './ProjectComment';

const ProjectCommentListWrapper = styled.div`
  margin-top: 20px;
  width: 600px;
`;

const DefaultProfileImage = '/default-profile.png';

const ProjectCommentList = ({ comments, onReply, onDelete, onUpdate, type, profileImageUrl }) => {
  return (
    <ProjectCommentListWrapper>
      {comments.map((comment) => {
        // 댓글 ID 처리: recruit와 promote를 구분
        const commentId = type === 'recruit' ? comment.projectCommentId : comment.promotionProjectCommentId;
        
        return (
          <ProjectComment
          key={commentId}
          commentId={commentId} // 댓글 ID
          text={comment.contents} // 댓글 내용
          user={comment.user} // 댓글 작성자 정보
          date={comment.createdDate} // 댓글 작성일
          replies={comment.children || []} // 대댓글 목록
          profileImageUrl={comment.profileImageUrl || DefaultProfileImage} 
          nickname={comment.nickname} // 닉네임 전달
          onReply={(replyText) => {
            console.log("onReply 호출됨:", replyText);
            onReply(commentId, replyText, type);
          }}
          onDelete={() => onDelete(commentId, type)}  // 댓글 삭제
          onUpdate={(commentId, newText, type) => onUpdate(commentId, newText, type)} 
        />
        
        );
      })}
    </ProjectCommentListWrapper>
  );
};

export default ProjectCommentList;




