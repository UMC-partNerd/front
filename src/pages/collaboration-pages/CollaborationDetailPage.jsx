import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BannerPhoto from '../../components/teamdetail/BannerPhoto';
import InfoSection from '../../components/collaboration-detail/InfoSection';
import EventGuide from '../../components/collaboration-detail/EventGuide';
import InquiryForm from '../../components/collaboration-detail/InquiryForm';
import CommentList from '../../components/collaboration-detail/comments/CommentList';
import EventImages from '../../components/collaboration-detail/EventImages';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import axios from 'axios';
import PersonalContact from '../../components/common/contact';
import EventOverview from '../../components/collaboration-detail/EventOverview';

const DefaultImage = '/default-image.png';

const CollaborationDetailPage = () => {
  const { collabPostId } = useParams(); // collabId를 collabPostId로 변경
  const [collabData, setCollabData] = useState(null);
  const [isLoadingCollab, setIsLoadingCollab] = useState(true);
  const [errorCollab, setErrorCollab] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchCollabData = async () => {
      try {
        const response = await axios.get(`https://api.partnerd.site/api/collabPosts/${collabPostId}`); // collabId를 collabPostId로 변경
        if (response.data.isSuccess) {
          setCollabData(response.data.result);
        } else {
          setErrorCollab('콜라보 데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setErrorCollab('네트워크 오류가 발생했습니다.');
      } finally {
        setIsLoadingCollab(false);
      }
    };

    fetchCollabData();
  }, [collabPostId]); // collabId를 collabPostId로 변경

  const bannerImageFileName = collabData?.bannerKeyName ? collabData.bannerKeyName.split('/').pop() : null;
  const mainImageFileName = collabData?.mainKeyName ? collabData.mainKeyName.split('/').pop() : null;
  const eventImageFileNames = collabData?.eventImgKeyNameList ? collabData.eventImgKeyNameList.map(key => key.split('/').pop()) : [];

  // BANNER와 MAIN 이미지 각각 로드
  const { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, isLoading: bannerLoading, error: bannerError } = useBannerPhoto(
    'collabPost',
    bannerImageFileName,
    mainImageFileName,
    eventImageFileNames
  );

  const [comments, setComments] = useState([
    { text: '참여 인원은 어느 정도 생각하고 계신가요?', user: '하나', date: '2025. 01. 12' }
  ]);

  const handleAddComment = (text) => {
    const newComment = {
      text,
      user: '사용자 이름',
      date: new Date().toISOString().split('T')[0],
    };
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const handleUpdateComment = (index, newText) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
  };

  const handleReply = (index, replyText) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, replies: [...(comment.replies || []), { text: replyText, user: 'CurrentUser', date: new Date().toISOString().split('T')[0] }] } : comment
    );
    setComments(updatedComments);
  };

  const toggleOptionsMenu = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      {/* 배너 이미지 */}
      {bannerLoading ? <div>로딩 중...</div> :
        bannerError ? <div>{bannerError}</div> :
          <BannerPhoto src={bannerPhotoUrl || DefaultImage} />}

      <Wrapper>
        {/* MAIN 이미지 */}
        <ImageContainer>
          {bannerLoading ? <div>로딩 중...</div> :
            bannerError ? <div>{bannerError}</div> :
              <img src={mainPhotoUrl || DefaultImage} alt="Main" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />}
        </ImageContainer>

        <MoreIconWrapper>
          <SingleDot onClick={toggleOptionsMenu} />
          <SingleDot onClick={toggleOptionsMenu} />
          <SingleDot onClick={toggleOptionsMenu} />
          <MoreOptionsMenu show={showOptions}>
            <MenuItem>수정하기</MenuItem>
            <Divider />
            <MenuItem>삭제하기</MenuItem>
          </MoreOptionsMenu>
        </MoreIconWrapper>

        {isLoadingCollab ? <div>로딩 중...</div> :
          errorCollab ? <div>{errorCollab}</div> :
            <InfoSection collabData={collabData} />}
      </Wrapper>

      <EventOverviewWrapper>
        {collabData ? <EventOverview eventData={collabData} /> : <div>데이터를 불러오는 중...</div>}
      </EventOverviewWrapper>

      <EventGuideWrapper>
        {collabData ? <EventGuide collabData={collabData} /> : <div>데이터를 불러오는 중...</div>}
      </EventGuideWrapper>

      <EventImagesWrapper>
        {collabData ? <EventImages images={eventPhotoUrls} /> : null}
      </EventImagesWrapper>

      {/* PersonalContact 컴포넌트 추가 */}
      <PersonalContactWrapper>
        <ContactTitle>컨택하러 가기</ContactTitle>
        <PersonalContact />
      </PersonalContactWrapper>

      <InquiryAndCommentsWrapper>
    <InquiryForm collabPostId={collabPostId} onAddComment={handleAddComment} />
    <div style={{ marginTop: '40px' }}>
    <CommentList
      comments={comments}
      onReply={handleReply}
      onDelete={handleDeleteComment}
      onUpdate={handleUpdateComment}
    />
   </div>
</InquiryAndCommentsWrapper>

    </>
  );
};

export default CollaborationDetailPage;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
`;

const InfoSectionWrapper = styled.div`
  margin-left: 100px; 
  width: 555px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;


const ImageContainer = styled.div`
  border-radius: 4px;
  background: #d9d9d9;
  width: 520px;
  height: 340px;
  flex-shrink: 0;
  margin-left: 20px;
`;

const MoreIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2px;
  margin-right: 90px;
  margin-top: 0;
  padding: 10px;
  position: relative;
  position: relative;
`;

const SingleDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #000;
  border-radius: 50%;
  margin-bottom: 5px;
  cursor: pointer; 
  cursor: pointer; 
`;

const EventOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 70px;
  margin-top: 70px;
  margin-left: 360px;
  width: 555px;
  width: 555px;
`;

const EventGuideWrapper = styled.div`
  margin-top: 65px;
  margin-left: 340px;
  width: 550px;
`;

const EventImagesWrapper = styled.div`
  margin-top: 20px;
  margin-left: 340px;
  width: 550px;
`;


const MoreOptionsMenu = styled.div`
  position: absolute;
  top: 30px; 
  left: 0; 
  top: 30px; 
  left: 0; 
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
`;

const MenuItem = styled.div`
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

const Divider = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  margin: 0 auto;
`;

const PersonalContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 100px;
  margin-left: 350px;
  width: 555px;
`;

const ContactTitle = styled.div`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-weight: 700;
  margin: 0 0 35px 0;
`;

{/*const InquiryTitle = styled.div`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
`;*/}


const InquiryAndCommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 80px;
  margin-left: 350px;
  width: 555px;
  margin-bottom: 100px;
`;
