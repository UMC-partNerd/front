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

import Button, { TYPES } from "../../components/common/button";

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

  // 응원하기
  const [cheers, setCheers] = useState(0); 
  const [cheered, setCheered] = useState(false); 
  // const onClickHandler = () => {
  //   setCheers(cheers + (cheered ? -1 : 1)); 
  //   setCheered(!cheered);
  // }

  const onClickHandler = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("로그인이 필요합니다.");
        return;
      }

      const response = await axios.patch(
        `https://api.partnerd.site/api/project/promotion/${promotionProjectId}/votes`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.isSuccess) {
        console.log("응원 성공: ", response.data.message);
        setCheers((prev) => (cheered ? prev - 1 : prev + 1));
        setCheered((prev) => !prev);
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
  };
    
  // 모달: 삭제하기
  const buttonHandler = () => {
    setopenFirstModal(true);
  };

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
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

      <Button
        type = {TYPES.VOTE}
        count={cheers}
        onClick={onClickHandler}
      />

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
