import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BannerPhoto from '../../components/teamdetail/BannerPhoto';
import InfoSection from '../../components/collaboration-detail/InfoSection';
import EventOverview from '../../components/collaboration-detail/EventOverview';
import EventGuide from '../../components/collaboration-detail/EventGuide';
import InquiryForm from '../../components/collaboration-detail/InquiryForm';
import CommentList from '../../components/common/CommentList';

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
`;

const SingleDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #000;
  border-radius: 50%;
  margin-bottom: 5px;
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

const InquiryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
  width: 520px;
  margin-left: 360px;
  margin-right: auto;
`;

const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 520px;
  margin-left: 360px;
  margin-right: auto;
`;

const CollaborationDetailPage = () => {
  const { id } = useParams(); // 경로 매개변수가 올바르게 사용되는지 확인
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
          <SingleDot />
          <SingleDot />
          <SingleDot />
        </MoreIconWrapper>

        <InfoSection />
      </Wrapper>

      <EventOverviewWrapper>
        <EventOverview />
      </EventOverviewWrapper>

      <EventGuideWrapper>
        <EventGuide />
      </EventGuideWrapper>

      {/* 문의하기, 댓글 */}
      {/*<InquiryWrapper>
        <InquiryForm onAddComment={handleAddComment} />
      </InquiryWrapper>

      <CommentListWrapper>
        <CommentList
          comments={comments}
          onReply={handleReply}
          onDelete={handleDeleteComment}
          onUpdate={handleUpdateComment}
        />
      </CommentListWrapper> */}
    </>
  );
};

export default CollaborationDetailPage;
