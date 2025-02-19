import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectPromoteDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectPromoteForm from '../../components/projectdetail/ProjectPromoteForm';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList';
import CommentForm from '../../components/projectdetail/CommentForm';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import CustomModal, { VERSIONS } from "../../components/common/modal/CustomModal";
import Button, { TYPES } from "../../components/common/button";
import OptionMenu from '../../components/common/button/optionMenu';
import { UserName } from '../../styled-components/community-styles/styled-PostItem';

const DefaultImage = '/default-image.png';

const ProjectPromoteDetail = () => {
  const { promotionProjectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [comments, setComments] = useState([]);
  const [openFirstModal, setOpenFirstModal] = useState(false); // 첫 번째 모달 (삭제 확인)
  const [openSecondModal, setOpenSecondModal] = useState(false); // 두 번째 모달 (삭제 완료)

  const [cheers, setCheers] = useState(0);        // 기존 응원 개수
  const [cheered, setCheered] = useState(false);  // 응원 여부
  const navigate = useNavigate();


  // 프로젝트 및 댓글 데이터 조회
  useEffect(() => {
    // 프로젝트 데이터 조회
    axios.get(`https://api.partnerd.site/api/project/promotion/${promotionProjectId}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setProjectData((prev) => (JSON.stringify(prev) === JSON.stringify(response.data.result) ? prev : response.data.result));
          
          // 응원하기 투표 개수
          setCheers(response.data.result.vote);

          // 본인 투표 여부 응답 데이터에서 확인 필요
          // setCheered(response.data.result.isVotedByMe || false);


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
            comment.projectCommentId === parentId
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
  
    console.log("업데이트할 댓글 ID:", commentId);  // commentId가 제대로 전달되는지 로그로 확인
  
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
          comment.projectCommentId === updatedComment.projectCommentId
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

  // 응원하기
  // const onClickHandler = () => {
  //   setCheers(cheers + (cheered ? -1 : 1)); 
  //   setCheered(!cheered);
  // }

  const onClickHandler = useCallback(async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("로그인이 필요");
        return;
      }

      // 이미 투표 진행한 경우
      if (cheered) {
        setCheered(true);
      }

      const response = await axios.patch(
        `https://api.partnerd.site/api/project/promotion/${promotionProjectId}/votes`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.isSuccess) {
        console.log("응원 성공: ", response.data.message);

        // UI 즉시 업데이트 (사용자 경험 개선)
        setCheers((prev) => (cheered ? prev - 1 : prev + 1)); // 응원 여부 반영한 개수
        setCheered((prev) => !prev);                          // 클릭 상태 반전
      
      } else {
        console.error("응원 실패:", response.data.message);
      }
    } catch (error) {
      console.error("응원 중 오류 발생:", error);
      
      if (error.response) {
        console.error("서버 응답 상태 코드:", error.response.status);
        console.error("서버 응답 데이터:", error.response.data);
      } else {
        console.error("요청이 전송되지 않았습니다.");
      }
    }
  }, [cheered, promotionProjectId]);
    
  // 모달: 삭제하기
  const buttonHandler = () => {
    setOpenFirstModal(true);
  };

    // 삭제 모달에서 삭제 버튼 클릭 시
  const deleteHandler = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("로그인이 필요합니다.");
      return;
    }
  
    try {
      const response = await axios.delete(
        `https://api.partnerd.site/api/project/promotion/${promotionProjectId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.isSuccess) {
        console.log("삭제 성공:", response.data.message);
        setOpenSecondModal(true);
        setopenFirstModal(false);
  
        setTimeout(() => {
          navigate("/project/promote");
        }, 1000);
      } else {
        console.error("삭제 실패:", response.data.message);
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
    }
  };

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <S.SContainer>
      <S.SHeaderBox>
        <S.SButtonBox/>
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
        <S.SButtonBox>
          <OptionMenu/>

          <Button
            type = {TYPES.VOTE}
            count={cheers}            // 서버에서 받은 응원 개수
            onClick={onClickHandler}  // 클릭 시 서버와 동기화
          />
        </S.SButtonBox>
      </S.SHeaderBox>

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
        />
      </S.SProjectCommentListWrapper>
    </S.SContainer>
  );
};


export default ProjectPromoteDetail;
