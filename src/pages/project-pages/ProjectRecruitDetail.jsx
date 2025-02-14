import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectRecruitDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectDetailForm from '../../components/projectdetail/ProjectDetailForm';
import JoinProjectInfo from '../../components/projectdetail/JoinProjectInfo';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList'; 
import CommentForm from '../../components/projectdetail/CommentForm';
import useBannerPhoto from '../../hooks/useBannerPhoto';  // 훅 import
import CustomModal, { VERSIONS } from "../../components/common/modal/CustomModal";
import { useNavigate } from 'react-router-dom';

const DefaultImage = '/default-image.png';

const ProjectRecruitDetail = () => {
  const { recruitProjectId } = useParams(); // URL에서 recruitProjectId 가져오기
  const [projectData, setProjectData] = useState(null); // 프로젝트 데이터 상태 관리
  const [comments, setComments] = useState([]); // 댓글 상태 관리

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

  // useBannerPhoto 훅 사용 (folderName: 'projects', 썸네일만 사용)
  const { thumbnailUrl, introPhotoUrl, isLoading, error } = useBannerPhoto(
    'projects', // 폴더 이름
    projectData?.thumbnailKeyName, // THUMBNAIL
    null, // MAIN (없으면 null)
    null, // EVENT (없으면 null)
    projectData?.thumbnailKeyName, // THUMBNAIL
    projectData?.introKeyName // INTRO
  );

  // 임시 이미지 데이터
  const images = projectData?.projectImgKeyNameList || [DefaultImage, DefaultImage, DefaultImage];

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
  // navigate('/project/recruit');
  
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
            <img src={thumbnailUrl || DefaultImage} alt="Project Thumbnail" />
          )}
        </S.SImageBox>
        <S.STextBox>
          <S.STitle>{projectData.title}</S.STitle>
          <S.SDescription>{projectData.intro}</S.SDescription>
        </S.STextBox>
      </S.SImageBoxContainer>

      {/* 수정하기/삭제하기 추가 */}

      <CustomModal
        openModal={openFirstModal} 
        closeModal={() => setopenFirstModal(false)}

        boldface='프로젝트 모집 삭제'
        regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
        text='삭제하기'
        onClickHandler={deleteHandler}
        variant={VERSIONS.VER3}
      />

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

      <S.SFormContainer>
        <ProjectDetailForm description={projectData.description} />
      </S.SFormContainer>

      <S.SJoinProjectInfoWrapper>
        <JoinProjectInfo leaderInfo={projectData.leaderInfo} />
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
