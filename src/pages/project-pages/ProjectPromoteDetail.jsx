import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectPromoteDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectPromoteForm from '../../components/projectdetail/ProjectPromoteForm';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList';
import CommentForm from '../../components/projectdetail/CommentForm';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import MemberForm from '../../components/projectdetail/MemberForm';
import CustomModal, { VERSIONS } from "../../components/common/modal/CustomModal";
import Button, { TYPES } from "../../components/common/button";

const DefaultImage = '/default-image.png';

const ProjectPromoteDetail = () => {
  const { promotionProjectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [comments, setComments] = useState([]);
  const [openFirstModal, setOpenFirstModal] = useState(false); // 첫 번째 모달 (삭제 확인)
  const [openSecondModal, setOpenSecondModal] = useState(false); // 두 번째 모달 (삭제 완료)

  // 프로젝트 및 댓글 데이터 조회
  useEffect(() => {
    // 프로젝트 데이터 조회
    axios.get(`https://api.partnerd.site/api/project/promotion/${promotionProjectId}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setProjectData(response.data.result);
        } else {
          console.error('프로젝트 데이터 조회 실패');
        }
      })
      .catch((error) => {
        console.error('프로젝트 데이터 조회 중 오류 발생:', error);
      });

    // 댓글 데이터 조회
    axios.get(`https://api.partnerd.site/api/project/promotion/${promotionProjectId}/comment`)
      .then((response) => {
        if (response.data.isSuccess) {
          // 삭제된 댓글 제외하고 상태에 저장
          const filteredComments = response.data.result.filter(comment => !comment.isDeleted);
          setComments(filteredComments);
        } else {
          console.error('댓글 조회 실패');
        }
      })
      .catch((error) => {
        console.error('댓글 조회 중 오류 발생:', error);
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

  const images = projectData?.projectImgKeyNameList || [DefaultImage, DefaultImage, DefaultImage];
  if (introPhotoUrl) {
    images.unshift(introPhotoUrl);
  }

  // 댓글 추가 함수 (POST)
  const handleAddComment = async (newComment) => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      alert("로그인을 해주세요!");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.partnerd.site/api/project/promotion/${promotionProjectId}/comment`,
        { contents: newComment },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        const addedComment = response.data.result;
        setComments([...comments, addedComment]);
        console.log('댓글 추가 성공:', addedComment);
      } else {
        console.error('댓글 추가 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
    }
  };

  // 대댓글 추가 함수 (POST)
  const handleAddReply = async (parentId, replyText) => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      alert("로그인을 해주세요!");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.partnerd.site/api/project/promotion/${promotionProjectId}/${parentId}/comment`,
        { contents: replyText }, 
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        const addedReply = response.data.result;

        // 댓글 목록에서 해당 댓글을 찾아 대댓글을 추가
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.promotionProjectCommentId === parentId
              ? { 
                  ...comment, 
                  replies: [...(comment.replies || []), addedReply] 
                }
              : comment
          )
        );
        console.log('대댓글 추가 성공:', addedReply);
      } else {
        console.error('대댓글 추가 실패:', response.data.message);
      }
    } catch (error) {
      console.error('대댓글 추가 중 오류 발생:', error);
    }
  };

  // 댓글 삭제 함수 (DELETE)
  const handleDeleteComment = async (commentId) => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
      alert("로그인을 해주세요!");
      return;
    }

    try {
      const response = await axios.delete(
        `https://api.partnerd.site/api/project/promotion/comment/${commentId}`,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API 응답:', response.data);

      if (response.data.isSuccess) {
        console.log('댓글 삭제 성공:', commentId);

        // 삭제 후 댓글 목록 재조회
        const updatedResponse = await axios.get(`https://api.partnerd.site/api/project/promotion/${promotionProjectId}/comment`);
        if (updatedResponse.data.isSuccess) {
          const filteredComments = updatedResponse.data.result.filter(comment => !comment.isDeleted);
          setComments(filteredComments);
        } else {
          console.error('댓글 재조회 실패');
        }
      } else {
        console.error('댓글 삭제 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }
  };

  // 댓글 수정 함수 (PATCH)
  const handleUpdateComment = async (commentId, newText) => {
    const jwtToken = localStorage.getItem('jwtToken');
  
    if (!jwtToken) {
      alert("로그인을 해주세요!");
      return;
    }
  
    if (!newText || newText.trim() === "") {
      alert("댓글 내용을 입력해주세요!");
      return;
    }
  
    console.log("업데이트할 댓글 ID:", commentId);  
  
    try {
      const response = await axios.patch(
        `https://api.partnerd.site/api/project/promotion/comment/${commentId}`,
        { contents: newText },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.isSuccess) {
        const updatedComment = response.data.result;
  
        const updatedComments = comments.map((comment) =>
          comment.promotionProjectCommentId === updatedComment.promotionProjectCommentId
            ? { ...comment, contents: updatedComment.contents }
            : comment
        );
  
        setComments(updatedComments);
        console.log('댓글 수정 성공:', updatedComment);
      } else {
        console.error('댓글 수정 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
    }
  };
  

  // 삭제 버튼 클릭 시 첫 번째 모달 띄우기
  const buttonHandler = () => {
    setOpenFirstModal(true);
  };

  // 삭제 모달에서 삭제 버튼 클릭 시
  const deleteHandler = () => {
    setOpenSecondModal(true);
    setOpenFirstModal(false);
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
        closeModal={() => setOpenFirstModal(false)}
        boldface='프로젝트 홍보 삭제'
        regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
        text='삭제하기'
        onClickHandler={deleteHandler}
        variant={VERSIONS.VER3}
      />

      {/* 삭제 완료 모달 */}
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

      <S.SFormWrapper>
        <S.SFormContainer>
          <ProjectPromoteForm projectData={projectData} />
        </S.SFormContainer>
      </S.SFormWrapper>

      <S.SMemberFormWrapper>
        <MemberForm
         leaderInfo={projectData?.leaderInfo}
         projectMembers={projectData?.projectMembers}
         promotionProjectMembers={projectData?.promotionProjectMembers}
         isPromote={true} 
        />
       </S.SMemberFormWrapper>

      {/* 댓글 폼 */}
      <S.SCommentFormWrapper>
        <CommentForm onAddComment={handleAddComment} />
      </S.SCommentFormWrapper>

      <S.SProjectCommentListWrapper>
        <ProjectCommentList
          comments={comments}
          onReply={handleAddReply}
          onDelete={handleDeleteComment} 
          onUpdate={handleUpdateComment} 
          type="promote"  
        />
      </S.SProjectCommentListWrapper>
    </S.SContainer>
  );
};

export default ProjectPromoteDetail;