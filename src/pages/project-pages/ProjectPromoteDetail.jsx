import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectPromoteDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectPromoteForm from '../../components/projectdetail/ProjectPromoteForm';
//import ProjectCommentList from '../../components/projectdetail/ProjectCommentList';
//import CommentForm from '../../components/projectdetail/CommentForm';

import CustomModal, { VERSIONS } from "../../components/common/modal/CustomModal";
import { useNavigate } from 'react-router-dom';

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


  // 수정하기/삭제하기

  // 삭제하기 > 모달
  const [openFirstModal, setopenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const navigate = useNavigate();

  // 버튼 클릭 시 모달1을 띄우는 함수
  const buttonHandler = () => {
    setopenFirstModal(true);
  };

  // 모달: 삭제하기
  const deleteHandler = async () => {
    // 모달2 열기 
    setOpenSecondModal(true);
    // 모달1 닫기
    setopenFirstModal(false);

    // 삭제 요청 보내기
    // await api.joinClub();
  };

  // 삭제 성공 시, 
  // setOpenSecondModal(false);
  // navigate('/project/promote');
  
  return (
    <S.SContainer>
      <S.SImageBoxContainer>
        <S.SImageBox />
        <S.STextBox>
          <S.STitle>프로젝트 홍보</S.STitle>
          <S.SDescription>당신의 프로젝트를 홍보하세요!</S.SDescription>
        </S.STextBox>
      </S.SImageBoxContainer>

      {/* 수정하기/삭제하기 추가 */}

      <CustomModal
        openModal={openFirstModal} 
        closeModal={() => setopenFirstModal(false)}

        boldface='프로젝트 홍보 삭제'
        regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
        text='삭제하기'
        onClickHandler={deleteHandler}
        variant={VERSIONS.VER3}
      />

      <CustomModal
        openModal={openSecondModal} 
        closeModal={() => setOpenSecondModal(false)}

        boldface='프로젝트 홍보 삭제'
        regular='프로젝트가 삭제되었습니다.'
        variant={VERSIONS.VER2}
      />

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
