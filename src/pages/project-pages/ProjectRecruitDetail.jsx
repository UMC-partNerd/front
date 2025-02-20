import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectRecruitDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectDetailForm from '../../components/projectdetail/ProjectDetailForm';
import JoinProjectInfo from '../../components/projectdetail/JoinProjectInfo';
import ProjectCommentList from '../../components/projectdetail/ProjectCommentList';
import CommentForm from '../../components/projectdetail/CommentForm';
import MemberForm from '../../components/projectdetail/MemberForm';
import PersonalContact from '../../components/common/contact';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import CustomModal, { VERSIONS } from "../../components/common/button/CustomModal";
import OptionMenu from '../../components/common/button/optionMenu';

const DefaultImage = '/default-image.png';
const DefaultProfileImage = '/default-profile.png';

const ProjectRecruitDetail = () => {
  const { recruitProjectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [comments, setComments] = useState([]);
  const [openFirstModal, setopenFirstModal] = useState(false); // 첫 번째 모달 (삭제 확인)
  const [openSecondModal, setOpenSecondModal] = useState(false); // 두 번째 모달 (삭제 완료)

  useEffect(() => {
    // 프로젝트 데이터 조회
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

    // 댓글 데이터 조회 API 호출
    axios.get(`https://api.partnerd.site/api/project/recruit/${recruitProjectId}/comment`)
      .then((response) => {
        console.log('댓글 조회 응답:', response.data);  
        if (response.data.isSuccess) {
          // 삭제된 댓글을 제외하고 상태에 저장
          const filteredComments = response.data.result.filter(comment => !comment.isDeleted);
          setComments(filteredComments);
        } else {
          console.error('댓글 조회 실패');
        }
      })
      .catch((error) => {
        console.error('댓글 조회 중 오류 발생:', error);
      });
  }, [recruitProjectId]); // recruitProjectId가 변경될 때마다 호출

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

  const profileKeyName = projectData?.user?.profileImageUrl || DefaultProfileImage;

  // 댓글 추가 함수 (POST)
  const handleAddComment = async (newComment, type) => {
    const jwtToken = localStorage.getItem('jwtToken');  // jwtToken 정의

    if (!jwtToken) {
      alert("로그인을 해주세요!");
      return;
    }

    try {
      let url;
      if (type === 'recruit') {
        url = `https://api.partnerd.site/api/project/recruit/${recruitProjectId}/comment`;
      } else {
        url = `https://api.partnerd.site/api/project/${projectId}/comment`;
      }

      const response = await axios.post(url, { contents: newComment }, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.isSuccess) {
        const addedComment = response.data.result;
        setComments([...comments, addedComment]);
        console.log('댓글 추가 성공:', addedComment); // Success log
      } else {
        console.error('댓글 추가 실패:', response.data.message);
      }
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
    }
  };

  // 대댓글 추가 함수(POST)
  const handleAddReply = async (parentId, replyText) => {
    const jwtToken = localStorage.getItem('jwtToken');  // jwtToken 정의

    if (!jwtToken) {
      alert("로그인을 해주세요!");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.partnerd.site/api/project/recruit/${recruitProjectId}/${parentId}/comment`,
        { contents: replyText }, // 대댓글 내용
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`, // 인증 토큰
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        const addedReply = response.data.result; // 대댓글 생성 성공 시 응답 받은 데이터

        // 댓글 목록에서 해당 댓글을 찾아 대댓글을 추가
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.projectCommentId === parentId
              ? { 
                  ...comment, 
                  replies: [...(comment.replies || []), addedReply] // 대댓글 추가
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
          `https://api.partnerd.site/api/project/recruit/comment/${commentId}`, 
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
          const updatedResponse = await axios.get(`https://api.partnerd.site/api/project/recruit/${recruitProjectId}/comment`);
          if (updatedResponse.data.isSuccess) {
            // 삭제된 댓글을 제외하고 상태에 저장
            const filteredComments = updatedResponse.data.result.filter(comment => !comment.isDeleted);
            setComments(filteredComments);
          } else {
            console.error('댓글 재조회 실패');
          }
        } else {
          console.error('댓글 삭제 실패:', response.data.message);
        }
      } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
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

        <S.SButtonBox>
          <OptionMenu/>
        </S.SButtonBox>
      </S.SHeaderBox>

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

      <S.SMemberFormWrapper>
       <MemberForm 
         leaderInfo={projectData?.leaderInfo} 
         projectMembers={projectData?.projectMembers} 
         isPromote={false}  
       />
      </S.SMemberFormWrapper>

      <S.SPersonalContactWrapper>
        <S.SContactTitle>컨택하러 가기</S.SContactTitle>
        <PersonalContact />
      </S.SPersonalContactWrapper>

      {/* 댓글 폼 */}
      <S.SCommentFormWrapper>
        <CommentForm onAddComment={handleAddComment} type="recruit" />
      </S.SCommentFormWrapper>

      <S.SProjectCommentListWrapper>
        <ProjectCommentList
          comments={comments}
          onReply={handleAddReply} 
          onDelete={(commentId) => handleDeleteComment(commentId)}  // 댓글 삭제
          onUpdate={(commentId, newText, type) => handleUpdateComment(commentId, newText, type)}
          type="recruit"
          profileImageUrl={profileKeyName}
        />
      </S.SProjectCommentListWrapper>
    </S.SContainer>
  );
};

export default ProjectRecruitDetail;
