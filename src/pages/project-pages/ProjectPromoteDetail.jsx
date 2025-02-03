import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectPromoteDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectPromoteForm from '../../components/projectdetail/ProjectPromoteForm';
//import ProjectCommentList from '../../components/projectdetail/ProjectCommentList';
//import CommentForm from '../../components/projectdetail/CommentForm';

const DefaultImage = '/default-image.png';

const ProjectPromoteDetail = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  // 임시 이미지 데이터
  const images = [DefaultImage, DefaultImage, DefaultImage];


  const handleAddComment = (newComment) => {
    setComments([
      ...comments,
      {
        text: newComment,
        user: '사용자',
        date: new Date().toLocaleString(),
        replies: [],
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
          <S.STitle>프로젝트 홍보</S.STitle>
          <S.SDescription>당신의 프로젝트를 홍보하세요!</S.SDescription>
        </S.STextBox>
      </S.SImageBoxContainer>

      <S.SImageSliderWrapper>
        <ImageSlider images={images} />
      </S.SImageSliderWrapper>

      <S.SFormContainer>
        <ProjectPromoteForm />
      </S.SFormContainer>

      {/*
       <S.SCommentFormWrapper>
        <CommentForm onAddComment={handleAddComment} />
      </S.SCommentFormWrapper> */}

      {/*
      <S.SProjectCommentListWrapper>
        <ProjectCommentList
          comments={comments}
          onReply={() => {}}
          onDelete={handleDeleteComment}
          onUpdate={handleUpdateComment}
        />
      </S.SProjectCommentListWrapper> */}
    </S.SContainer>
  );
};

export default ProjectPromoteDetail;
