import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BannerPhoto from '../../components/teamdetail/BannerPhoto';
import InfoSection from '../../components/collaboration-detail/InfoSection';
import PersonalContact from '../../components/common/contact';
import EventGuide from '../../components/collaboration-detail/EventGuide';
import InquiryForm from '../../components/collaboration-detail/InquiryForm';
import CommentList from '../../components/collaboration-detail/comments/CommentList';
import EventImages from '../../components/collaboration-detail/EventImages';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import { FiMoreVertical } from "react-icons/fi";
import axios from 'axios';
import EventOverview from '../../components/collaboration-detail/EventOverview';
import CustomModal, { VERSIONS } from "../../components/common/modal/CustomModal";
import useMypageImg from '../../hooks/useMypagesProfileImg';

const DefaultImage = '/default-image.png';

const CollaborationDetailPage = () => {
  const { collabPostId } = useParams();
  const [collabData, setCollabData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoadingCollab, setIsLoadingCollab] = useState(true);
  const [errorCollab, setErrorCollab] = useState(null);
  const [comments, setComments] = useState([]);

  const handleOptionsClick = () => {
    setShowOptions((prevState) => !prevState); 
  };

  const handleEditClick = () => {
    console.log('Edit clicked');
  };

  useEffect(() => {
    const fetchCollabData = async () => {
      try {
        const response = await axios.get(`https://api.partnerd.site/api/collabPosts/${collabPostId}`);
        if (response.data.isSuccess) {
          console.log("콜라보레이션 데이터", response.data.result);
          setCollabData(response.data.result);
          // 댓글 데이터가 있는 경우에만 설정
          if (response.data.result.collabInquiryList) {
            const validComments = response.data.result.collabInquiryList.filter(
              comment => comment && !comment.isDeleted
            );
            setComments(validComments);
          }
        } else {
          setErrorCollab('콜라보 데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('데이터 로딩 중 오류:', err);
        setErrorCollab('네트워크 오류가 발생했습니다.');
      } finally {
        setIsLoadingCollab(false);
      }
    };

    if (collabPostId) {
      fetchCollabData();
    }
  }, [collabPostId]);

  const bannerImageFileName = collabData?.bannerKeyName 
    ? `collabPost/BANNER/${collabData.bannerKeyName.split('/').pop()}` 
    : null;

  const mainImageFileName = collabData?.mainKeyName 
    ? `collabPost/MAIN/${collabData.mainKeyName.split('/').pop()}` 
    : null;

  const eventImageFileNames = collabData?.eventImgKeyNameList 
    ? collabData.eventImgKeyNameList.map(key => `collabPost/EVENT/${key.split('/').pop()}`) 
    : [];

  const { 
    bannerPhotoUrl, 
    mainPhotoUrl, 
    eventPhotoUrls, 
    isLoading: bannerLoading, 
    error: bannerError 
  } = useBannerPhoto(
    'collabPost', 
    bannerImageFileName, 
    mainImageFileName,   
    eventImageFileNames  
  );

  const handleDeleteClick = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }
  
      const response = await axios.delete(
        `https://api.partnerd.site/api/collabPosts/${collabPostId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.isSuccess) {
        console.log('콜라보 게시물이 성공적으로 삭제되었습니다.');
        window.location.href = '/collaboration'; 
      } else {
        console.error('삭제에 실패했습니다:', response.data.message);
      }
    } catch (error) {
      console.error('콜라보 게시물 삭제 중 오류 발생:', error);
    }
  };
  
  const handleAddComment = async (text) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }

      const response = await axios.post(
        'https://api.partnerd.site/api/collabInquiry/register',
        { collabPostId, contents: text },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      if (response.data.isSuccess) {
        const newComment = {
          id: response.data.result.collabInquiryId,
          contents: response.data.result.contents,
          nickname: response.data.result.nickname,
          date: new Date().toISOString().split('T')[0],
        };
        setComments((prevComments) => [...prevComments, newComment]);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }

    };
  


  
  const handleDeleteComment = async (commentId) => {
    console.log("Deleting comment with ID: ", commentId); 
  
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }
  
      const response = await axios.delete(
        `https://api.partnerd.site/api/collabInquiry/${commentId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.isSuccess) {
        setComments(comments.filter(comment => comment.id !== commentId)); 
      } else {
        console.error('Error deleting comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }; 
  
  

  const handleUpdateComment = async (commentId, newText) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }

      const response = await axios.patch(
        `https://api.partnerd.site/api/collabInquiry/${commentId}`,
        { contents: newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        const updatedComments = comments.map(comment =>
          comment.collabInquiryId === commentId ? { ...comment, text: newText } : comment
        );
        setComments(updatedComments);
      } else {
        console.error('Error updating comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleReply = async (parentId, replyText) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }

      const response = await axios.post(
        `https://api.partnerd.site/api/collabInquiry/${parentId}`, // parentId 사용
        {
          collabPostId: parseInt(collabPostId, 10),
          contents: replyText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        const newReply = {
          collabInquiryId: response.data.result.collabInquiryId,
          text: response.data.result.contents,
          user: response.data.result.nickname,
          date: new Date().toISOString().split('T')[0],
        };
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.collabInquiryId === parentId
              ? { ...comment, replies: [...(comment.replies || []), newReply] }
              : comment
          )
        );
      } else {
        console.error('Error posting reply:', response.data.message);
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('로그인이 필요합니다.');
        return;
      }

      const response = await axios.delete(
        `https://api.partnerd.site/api/collabInquiry/${replyId}/reply`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        setComments(prevComments =>
          prevComments.map(comment =>
            ({
              ...comment,
              replies: comment.replies.filter(reply => reply.collabInquiryId !== replyId)
            })
          )
        );
      } else {
        console.error('Error deleting reply:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const collabRequestHandler = () => {
    setOpenModal(true);
  };

  const sendHandler = async () => {
    setOpenModal(false);
  };

  const {profileImageUrl, isLoading, error} = useMypageImg(collabData?.profileKeyname);

  return (
    <>
      {bannerLoading ? <div>로딩 중...</div> :
        bannerError ? <div>{bannerError}</div> :
          <BannerPhoto src={bannerPhotoUrl || DefaultImage} />}

      <Wrapper>
        <ImageSection>
          <ImageContainer>
            {bannerLoading ? <div>로딩 중...</div> :
              bannerError ? <div>{bannerError}</div> :
                <img src={mainPhotoUrl || DefaultImage} alt="Main" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />}
          </ImageContainer>

          <MoreIconWrapper>
            <FiMoreVertical
              onClick={handleOptionsClick}
              style={{
                position: 'absolute',
                right: '5px',
                top: '-15px',
                cursor: 'pointer',
                fontSize: '20px', 
              }}
            />
          </MoreIconWrapper>

          <MoreOptionsMenu show={showOptions}>
            <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
            <Divider />
            <MenuItem onClick={handleDeleteClick}>삭제하기</MenuItem>
          </MoreOptionsMenu>
        </ImageSection>

        <InfoSectionWrapper>
          {isLoadingCollab ? <div>로딩 중...</div> :
            errorCollab ? <div>{errorCollab}</div> :
              <InfoSection collabData={collabData} />}
        </InfoSectionWrapper>
      </Wrapper>

      <ContentContainer>
        <EventOverview eventData={collabData} />
        <EventGuide collabData={collabData} />
        <EventImages images={eventPhotoUrls} />
        
        <ContactSection>
          <ContactTitle>컨택하러 가기</ContactTitle>
          <PersonalContact
            profileImageUrl={profileImageUrl}
            nickname={collabData?.nickname}
            explan={`${collabData?.contactMethod[1]?.contactUrl || collabData?.contactMethod[0]?.contactUrl ||"open.kakao.partNerd"}`}
          />
        </ContactSection>

        <InquirySection>
          <InquiryForm collabPostId={collabPostId} onSubmit={handleAddComment} />
          <CommentListWrapper>
            <CommentList
              comments={comments}
              collabPostId={collabPostId}
              onReply={handleReply}
              onDelete={handleDeleteComment}
              onUpdate={handleUpdateComment}
            />
          </CommentListWrapper>
        </InquirySection>
      </ContentContainer>

      <CustomModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        boldface='협업 요청하기'
        regular='협업하기 요청을 보내시겠습니까?'
        text='보내기'
        onClickHandler={sendHandler}
        variant={VERSIONS.VER3}
      />
    </>
  );
};

export default CollaborationDetailPage;


const Wrapper = styled.div`
  display: flex;               // flex로 배치
  align-items: flex-start;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
`;

const ImageSection = styled.div`
  position: relative; 
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  border-radius: 4px;
  background: #d9d9d9;
  width: 520px;
  height: 340px;
  flex-shrink: 0;
  margin-left: 20px;
  position: relative;  
`;

const MoreIconWrapper = styled.div`
  position: absolute;
  top: 18px;          
  right: -30px;        
  cursor: pointer;
  z-index: 1010;
`;

const MoreOptionsMenu = styled.div`
  position: absolute;
  top: 40px;           
  right: -50px;       
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.15);
  width: 120px;
  height: 100px;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;
`;



const InfoSectionWrapper = styled.div`
  margin-left: 80px;  
  width: 555px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;


const ContentContainer = styled.div`
  width: 1000px;
  margin: 70px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 70px;  // 섹션 간 간격

  > * {
    width: 520px;  // 모든 자식 요소의 너비를 통일
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width:100%;
`;

const InquirySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 100px;
`;

const CommentListWrapper = styled.div`
  margin-top: 40px;
`;

const EventOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EventGuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EventImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.4px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Divider = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  margin-left: 10px;
`;

const ContactTitle = styled.div`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-weight: 700;
  margin: 0 0 35px 0;
`;