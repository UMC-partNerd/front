import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectRecruitDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectDetailForm from '../../components/projectdetail/ProjectDetailForm';
import JoinProjectInfo from '../../components/projectdetail/JoinProjectInfo';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList'; 
import CommentForm from '../../components/projectdetail/CommentForm';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import CustomModal, { VERSIONS } from "../../components/common/modal/CustomModal";

const DefaultImage = '/default-image.png';

const ProjectRecruitDetail = () => {
  const { recruitProjectId } = useParams(); 
  const [projectData, setProjectData] = useState(null); 
  const [comments, setComments] = useState([]); 

  // API 호출
  useEffect(() => {
    axios.get(`https://api.partnerd.site/api/project/recruit/${recruitProjectId}`)
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
  }, [recruitProjectId]);

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

  // 삭제 관련 모달 상태
  const [openFirstModal, setopenFirstModal] = useState(false); // 첫 번째 모달 (삭제 확인)
  const [openSecondModal, setOpenSecondModal] = useState(false); // 두 번째 모달 (삭제 완료)
  const navigate = useNavigate();

  // 삭제 버튼 클릭 시 첫 번째 모달 띄우기
  const buttonHandler = () => {
    setopenFirstModal(true);
  };

  // 삭제 모달에서 삭제 버튼 클릭 시
  const deleteHandler = async () => {
    // 삭제 요청을 보낼 수 있는 로직 추가 (예: axios.delete)
    // axios.delete(`/api/project/recruit/${recruitProjectId}`); // 예시
    
    // 모달2 열기 (삭제 완료)
    setOpenSecondModal(true);

    // 모달1 닫기
    setopenFirstModal(false);

    // 삭제 완료 후 프로젝트 목록 페이지로 이동
    // navigate('/project/recruit');
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

      {/* 삭제 확인 모달 */}
      <CustomModal
        openModal={openFirstModal} 
        closeModal={() => setopenFirstModal(false)}
        boldface='프로젝트 모집 삭제'
        regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
        text='삭제하기'
        onClickHandler={deleteHandler}
        variant={VERSIONS.VER3}
      />

      {/* 삭제 완료 모달 */}
      <CustomModal
        openModal={openSecondModal} 
        closeModal={() => setOpenSecondModal(false)}
        boldface='프로젝트 모집 삭제'
        regular='프로젝트가 삭제되었습니다.'
        variant={VERSIONS.VER2}
      />

      <S.SImageSliderWrapper>
        <ImageSlider images={images} />
      </S.SImageSliderWrapper>

      <S.SFormWrapper>
        <S.SFormContainer>
          <ProjectDetailForm projectData={projectData} />
        </S.SFormContainer>

        <S.SJoinProjectInfoWrapper>
          <JoinProjectInfo projectData={projectData} />
        </S.SJoinProjectInfoWrapper>
      </S.SFormWrapper>

      {/* 댓글 폼 */}
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

      {/* 삭제 버튼 */}
      <S.SDeleteButton onClick={buttonHandler}>삭제하기</S.SDeleteButton>
    </S.SContainer>
  );
};

export default ProjectRecruitDetail;
