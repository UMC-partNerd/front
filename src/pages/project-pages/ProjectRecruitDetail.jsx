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
  const [openFirstModal, setopenFirstModal] = useState(false); // 첫 번째 모달 (삭제 확인)
  const [openSecondModal, setOpenSecondModal] = useState(false); // 두 번째 모달 (삭제 완료)
  const navigate = useNavigate();

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

    // 댓글 데이터 조회 API 호출 (GET)
    axios.get(`https://api.partnerd.site/api/project/recruit/${recruitProjectId}/comment`)
      .then((response) => {
        if (response.data.isSuccess) {
          setComments(response.data.result); // 댓글 목록을 상태에 저장
        } else {
          console.error('댓글 조회 실패');
        }
      })
      .catch((error) => {
        console.error('댓글 조회 중 오류 발생:', error);
      });
  }, [recruitProjectId]);

  const { thumbnailPhotoUrl, introPhotoUrl, isLoading, error } = useBannerPhoto(
    'projects',
    null, 
    null, 
    [], 
    projectData?.thumbnailKeyName, 
    projectData?.projectImgKeyNameList[0]
  );

  const images = projectData?.projectImgKeyNameList || [DefaultImage, DefaultImage, DefaultImage];
  if (introPhotoUrl) {
    images.unshift(introPhotoUrl);
  }

  // 댓글 추가 함수 (POST)
  const handleAddComment = async (newComment, type) => {
    try {
      let url;
      // 타입에 맞는 경로 선택
      if (type === 'recruit') {
        url = `https://api.partnerd.site/api/project/recruit/${recruitProjectId}/comment`; // 모집 댓글 경로
      } else {
        url = `https://api.partnerd.site/api/project/${projectId}/comment`; // 다른 프로젝트 댓글 경로
      }

      const response = await axios.post(url, { contents: newComment }, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.isSuccess) {
        const addedComment = response.data.result;
        setComments([...comments, addedComment]); // 새 댓글을 댓글 목록에 추가
      } else {
        console.error('댓글 추가 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
    }
  };

  // 대댓글 추가 함수 (POST)
  const handleAddReply = async (parentId, replyText) => {
    try {
      const response = await axios.post(
        `https://api.partnerd.site/api/project/recruit/${recruitProjectId}/${parentId}/comment`, 
        {
          contents: replyText, // 대댓글 내용
        },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`, // 인증 토큰
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        const addedReply = response.data.result; // 대댓글 생성 성공 시 응답 받은 데이터
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.projectCommentId === parentId
              ? { ...comment, replies: [...(comment.replies || []), addedReply] }
              : comment
          )
        );
      } else {
        console.error('대댓글 추가 실패:', response.data.message);
      }
    } catch (error) {
      console.error('대댓글 추가 중 오류 발생:', error);
    }
  };

  // 댓글 삭제 함수 (DELETE)
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `https://api.partnerd.site/api/project/recruit/comment/${commentId}`,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        setComments(comments.filter((comment) => comment.projectCommentId !== commentId)); // 삭제된 댓글 제외
      } else {
        console.error('댓글 삭제 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  // 댓글 수정 함수 (PATCH)
  const handleUpdateComment = async (commentId, updatedText) => {
    try {
      const response = await axios.patch(
        `https://api.partnerd.site/api/project/recruit/comment/${commentId}`, 
        {
          contents: updatedText, // 수정된 댓글 내용
        },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        const updatedComments = comments.map((comment) =>
          comment.projectCommentId === commentId
            ? { ...comment, contents: updatedText } // 수정된 댓글 내용 반영
            : comment
        );
        setComments(updatedComments); // 댓글 목록 업데이트
      } else {
        console.error('댓글 수정 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
    }
  };

  // 삭제 버튼 클릭 시 첫 번째 모달 띄우기
  const buttonHandler = () => {
    setopenFirstModal(true);
  };

  // 삭제 모달에서 삭제 버튼 클릭 시
  const deleteHandler = () => {
    // 모달2 열기 (삭제 완료)
    setOpenSecondModal(true);

    // 모달1 닫기
    setopenFirstModal(false);

    // 삭제 완료 후 프로젝트 목록 페이지로 이동
    // navigate('/project/recruit');
  };

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <S.SContainer>
      <S.SImageBoxContainer>
        <S.SImageBox>
          {isLoading ? <p>Loading...</p> : error ? <p>Error loading image: {error}</p> : <img src={thumbnailPhotoUrl || DefaultImage} alt="Project Thumbnail" />}
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
        <CommentForm onAddComment={handleAddComment} type="recruit" />
      </S.SCommentFormWrapper>

      <S.SProjectCommentListWrapper>
        <ProjectCommentList
          comments={comments}
          onReply={handleAddReply} // 대댓글 처리
          onDelete={handleDeleteComment}
          onUpdate={handleUpdateComment}
        />
      </S.SProjectCommentListWrapper>
    </S.SContainer>
  );
};

export default ProjectRecruitDetail;
