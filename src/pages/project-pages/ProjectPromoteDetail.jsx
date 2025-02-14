import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectPromoteDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectPromoteForm from '../../components/projectdetail/ProjectPromoteForm';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList';
import CommentForm from '../../components/projectdetail/CommentForm';
import useBannerPhoto from '../../hooks/useBannerPhoto';  

const DefaultImage = '/default-image.png';

const ProjectPromoteDetail = () => {
  const { promotionProjectId } = useParams(); 
  const [projectData, setProjectData] = useState(null); 
  const [comments, setComments] = useState([]); 

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
    projectData?.thumbnailKeyName, // 썸네일 이미지
    projectData?.projectImgKeyNameList[0] // intro 이미지
  );
  
  console.log('Intro Image URL:', introPhotoUrl);  
  
  // 임시 이미지 데이터
  const images = projectData?.projectImgKeyNameList || [DefaultImage, DefaultImage, DefaultImage];

  // introPhotoUrl을 이미지 리스트에 포함
  if (introPhotoUrl) {
    images.unshift(introPhotoUrl);  // introPhotoUrl을 첫 번째 이미지로 넣음
  }

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

  if (!projectData) {
    return <div>Loading...</div>; // 데이터가 없으면 로딩 화면 표시
  }

  return (
    <S.SContainer>
      <S.SImageBoxContainer>
        <S.SImageBox>
          {/* 썸네일 이미지 로딩 처리 */}
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

      <S.SImageSliderWrapper>
        {/* ImageSlider에 images 배열을 전달 */}
        <ImageSlider images={images} />
      </S.SImageSliderWrapper>

        <S.SFormContainer>
          <ProjectPromoteForm projectData={projectData} />
        </S.SFormContainer>


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

export default ProjectPromoteDetail;
