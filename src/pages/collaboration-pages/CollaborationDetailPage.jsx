import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BannerPhoto from '../../components/teamdetail/BannerPhoto';
import InfoSection from '../../components/collaboration-detail/InfoSection';
import EventOverview from '../../components/collaboration-detail/EventOverview';
import EventGuide from '../../components/collaboration-detail/EventGuide';
// import InquiryForm from '../../components/collaboration-detail/InquiryForm';  // InquiryForm 임포트 주석 처리
// import CommentList from '../../components/collaboration-detail/comments/CommentList';  // CommentList 임포트 주석 처리

const DefaultImage = '/default-image.png';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
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
  position: relative; /* Add position relative */
`;

const SingleDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #000;
  border-radius: 50%;
  margin-bottom: 5px;
  cursor: pointer; /* 클릭 가능하도록 변경 */
`;

const EventOverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
  margin-left: 360px;
  width: 550px;
`;

const EventGuideWrapper = styled.div`
  margin-top: 65px;
  margin-left: 340px;
  width: 550px;
`;

const MoreOptionsMenu = styled.div`
  position: absolute;
  top: 30px; /* Adjusted to position below the dots */
  left: 0; /* Adjusted to align with the dots */
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

const CollaborationDetailPage = () => {
  const { id } = useParams();
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptionsMenu = () => {
    setShowOptions(!showOptions);
  };

  const [comments, setComments] = useState([
    { text: "참여 인원은 어느 정도 생각하고 계신가요?", user: "하나", date: "2025. 01. 12" },
    // 더 많은 댓글 데이터...
  ]);

  const handleAddComment = (text) => {
    const newComment = {
      text,
      user: "사용자 이름", // 실제 사용자 이름으로 변경 필요
      date: new Date().toISOString().split('T')[0], // 현재 날짜로 변경
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
      i === index ? { ...comment, replies: [...comment.replies, { text: replyText, user: 'CurrentUser', date: new Date().toISOString().split('T')[0] }] } : comment
    );
    setComments(updatedComments);
  };

  return (
    <>
      <BannerPhoto src={DefaultImage} />
      <Wrapper>
        <ImageContainer>
          <img src={DefaultImage} alt="Default" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
        </ImageContainer>

        <MoreIconWrapper>
          <SingleDot onClick={toggleOptionsMenu} />
          <SingleDot onClick={toggleOptionsMenu} />
          <SingleDot onClick={toggleOptionsMenu} />
          {/* 옵션 메뉴를 SingleDot 클릭 시에만 표시 */}
          <MoreOptionsMenu show={showOptions}>
            <MenuItem>수정하기</MenuItem>
            <Divider />
            <MenuItem>삭제하기</MenuItem>
          </MoreOptionsMenu>
        </MoreIconWrapper>

        <InfoSection />
      </Wrapper>

      <EventOverviewWrapper>
        <EventOverview />
      </EventOverviewWrapper>

      <EventGuideWrapper>
        <EventGuide />
      </EventGuideWrapper>

      {/* 댓글 및 문의하기 폼 */}
      {/* <InquiryForm onAddComment={handleAddComment} />

      <div style={{ marginTop: '40px' }}>
        <CommentList
          comments={comments}
          onReply={handleReply}
          onDelete={handleDeleteComment}
          onUpdate={handleUpdateComment}
        />
      </div> */}
    </>
  );
};


export default CollaborationDetailPage;