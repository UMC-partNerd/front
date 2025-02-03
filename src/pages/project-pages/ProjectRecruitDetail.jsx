import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectRecruitDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectDetailForm from '../../components/projectdetail/ProjectDetailForm';
import JoinProjectInfo from '../../components/projectdetail/JoinProjectInfo';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList'; 
import CommentForm from '../../components/projectdetail/CommentForm'; 

const DefaultImage = '/default-image.png';

const ProjectRecruitDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const [comments, setComments] = useState([]); // 댓글 상태 관리

  // 임시 이미지 데이터
  const images = [DefaultImage, DefaultImage, DefaultImage];

  // 댓글 추가 함수
  const handleAddComment = (newComment) => {
    setComments([
      ...comments,
      {
        text: newComment,
        user: '사용자', // 임시 사용자
        date: new Date().toLocaleString(),
        replies: [], // 기본적으로 빈 답글 배열
      },
    ]);
  };


  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };


  const handleUpdateComment = (index, newText) => {
    const updatedComments = [...comments];
    updatedComments[index].text = newText;
    setComments(updatedComments);
  };

  return (
    <S.SContainer>
      <S.SImageBoxContainer>
        <S.SImageBox />
        <S.STextBox>
          <S.STitle>파트너드</S.STitle>
          <S.SDescription>IT 동아리 협업 네트워킹 플랫폼, ‘파트너드’</S.SDescription>
        </S.STextBox>
      </S.SImageBoxContainer>

      <S.SImageSliderWrapper>
        <ImageSlider images={images} />
      </S.SImageSliderWrapper>

      <S.SFormContainer>
        <ProjectDetailForm />
      </S.SFormContainer>

      <S.SJoinProjectInfoWrapper>
        <JoinProjectInfo />
      </S.SJoinProjectInfoWrapper>

      {/* 댓글 폼  */}
      <S.SCommentFormWrapper>
        <CommentForm onAddComment={handleAddComment} />
      </S.SCommentFormWrapper>

      <S.SProjectCommentListWrapper>
        <ProjectCommentList
          comments={comments}
          onReply={() => {}}
          onDelete={handleDeleteComment}
          onUpdate={handleUpdateComment}
        />
      </S.SProjectCommentListWrapper>
    </S.SContainer>
  );
};

export default ProjectRecruitDetail;
