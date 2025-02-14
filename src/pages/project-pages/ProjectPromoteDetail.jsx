import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectPromoteDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectPromoteForm from '../../components/projectdetail/ProjectPromoteForm';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList'; 
import CommentForm from '../../components/projectdetail/CommentForm';
import useBannerPhoto from '../../hooks/useBannerPhoto';  
import CustomModal, { VERSIONS } from "../../components/common/modal/CustomModal";

const DefaultImage = '/default-image.png';

const ProjectPromoteDetail = () => {
  const { promotionProjectId } = useParams(); 
  const [projectData, setProjectData] = useState(null);
  const [comments, setComments] = useState([]);
  const [openFirstModal, setopenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const navigate = useNavigate();

  // API 호출
  useEffect(() => {
    axios.get(`https://api.partnerd.site/api/project/promotion/${promotionProjectId}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setProjectData(response.data.result);
        } else {
          console.error('API 호출 실패');
        }
      })
      .catch((error) => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [promotionProjectId]);

  const { thumbnailPhotoUrl, introPhotoUrl, isLoading, error } = useBannerPhoto(
    'projects', 
    null, 
    null, 
    [], 
    projectData?.thumbnailKeyName, 
    projectData?.projectImgKeyNameList[0] 
  );

  console.log('Intro Image URL:', introPhotoUrl);

  // 이미지 데이터
  const images = projectData?.projectImgKeyNameList || [DefaultImage, DefaultImage, DefaultImage];
  if (introPhotoUrl) {
    images.unshift(introPhotoUrl); 
  }

  // 댓글 추가
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

  // 댓글 삭제
  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  // 댓글 수정
  const handleUpdateComment = (index, newText) => {
    const updatedComments = [...comments];
    updatedComments[index].text = newText;
    setComments(updatedComments);
  };

  // 모달: 삭제하기
  const buttonHandler = () => {
    setopenFirstModal(true);
  };

  const deleteHandler = async () => {
    setOpenSecondModal(true);
    setopenFirstModal(false);
    // 삭제 요청 보내기
  };

  if (!projectData) {
    return <div>Loading...</div>; 
  }

  return (
    <S.SContainer>
      <S.SImageBoxContainer>
        <S.SImageBox>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading image: {error}</p>
          ) : (
            <img src={thumbnailPhotoUrl || DefaultImage} alt="Project Thumbnail" />
          )}
        </S.SImageBox>
        <S.STextBox>
          <S.STitle>{projectData.title}</S.STitle>
          <S.SDescription>{projectData.intro}</S.SDescription>
        </S.STextBox>
      </S.SImageBoxContainer>

      {/* 모달 1: 삭제 확인 */}
      <CustomModal
        openModal={openFirstModal}
        closeModal={() => setopenFirstModal(false)}
        boldface='프로젝트 홍보 삭제'
        regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
        text='삭제하기'
        onClickHandler={deleteHandler}
        variant={VERSIONS.VER3}
      />

      {/* 모달 2: 삭제 성공 */}
      <CustomModal
        openModal={openSecondModal}
        closeModal={() => setOpenSecondModal(false)}
        boldface='프로젝트 홍보 삭제'
        regular='프로젝트가 삭제되었습니다.'
        variant={VERSIONS.VER2}
      />

      {/* 이미지 슬라이더 */}
      <S.SImageSliderWrapper>
        <ImageSlider images={images} />
      </S.SImageSliderWrapper>

      {/* 프로젝트 홍보 폼 */}
      <S.SFormContainer>
        <ProjectPromoteForm projectData={projectData} />
      </S.SFormContainer>

      {/* 댓글 추가 폼 */}
      <S.SCommentFormWrapper>
        <CommentForm onAddComment={handleAddComment} />
      </S.SCommentFormWrapper>

      {/* 댓글 리스트 */}
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

export default ProjectPromoteDetail;
