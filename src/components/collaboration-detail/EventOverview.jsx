import React from 'react';
import styled from 'styled-components';

const EventOverview = ({ eventData }) => {

  if (!eventData) return <div>데이터를 불러오는 중...</div>;

  return (
    <>
      <EventOverviewHeader>행사 개요</EventOverviewHeader>
      <EventOverviewContainer>
        {/* 카테고리 */}
        <InfoContainer>
          <Label>카테고리</Label>
          <BadgeContainer>
            {eventData.categoryDTOList && eventData.categoryDTOList.map((category) => (
              <Badge key={category.id}>{category.name}</Badge>
            ))}
          </BadgeContainer>
        </InfoContainer>

        {/* 행사 유형 */}
        <InfoContainer>
          <Label>행사 유형</Label>
          <InfoText>{eventData.eventType || '정보 없음'}</InfoText>
        </InfoContainer>

        {/* 행사명 */}
        <InfoContainer>
          <Label>행사명</Label>
          <InfoText>{eventData.title || '정보 없음'}</InfoText>
        </InfoContainer>

        {/* 한 줄 소개 */}
        <InfoContainer>
          <Label>한 줄 소개</Label>
          <InfoText>{eventData.intro || '정보 없음'}</InfoText>
        </InfoContainer>

        {/* 개최 희망일 */}
        <InfoContainer>
          <Label>개최 희망일</Label>
          <InfoText>{eventData.startDate ? eventData.startDate.split("T")[0] : '정보 없음'}</InfoText>
        </InfoContainer>

        {/* 콜라보 마감일 */}
        <InfoContainer>
          <Label>콜라보 마감일</Label>
          <InfoText>{eventData.openDate ? eventData.openDate.split("T")[0] : '정보 없음'} ~ {eventData.closeDate ? eventData.closeDate.split("T")[0] : '정보 없음'}</InfoText>
        </InfoContainer>

        {/* 콜라보 대상 */}
        <InfoContainer>
          <Label>콜라보 대상</Label>
          <InfoText>{eventData.collabTarget || '정보 없음'}</InfoText>
        </InfoContainer>

        {/* 온/오프라인 */}
        <InfoContainer>
          <Label>온/오프라인</Label>
          <BadgeContainer>
            {eventData.eventMode === 1 ? (
              <OnlineBadge>온라인</OnlineBadge>
            ) : eventData.eventMode === 2 ? (
              <OfflineBadge>오프라인</OfflineBadge>
            ) : (
              <InfoText>온/오프라인</InfoText>
            )}
          </BadgeContainer>
        </InfoContainer>
      </EventOverviewContainer>
    </>
  );
};

export default EventOverview;


const EventOverviewHeader = styled.h2`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

const EventOverviewContainer = styled.div`
  display: flex;
  width: 470px;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 4px;
  border: 1.3px solid #C2C2C2;
  background: #fff;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #A0A0A0;
  margin-right: 8px;
  width: 120px;
  text-align: left;
  display: inline-block; 
`;

const InfoText = styled.p`
  font-size: 14px;
  margin: 4px 0;
  display: inline;
  color: #414141;
  font-weight: 600;
  flex: 1; 
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin: 8px 0;
`;

const Badge = styled.span`
  color: #08D485;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  padding: 4px 10px;
  min-width: 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  background: #DDFCF0;
`;

const OfflineBadge = styled(Badge)`
  background: #EAF1FF;
  color: #0B2ED9;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start; 
`;

const OnlineBadge = styled(Badge)`
   background: #EAF1FF;
  color: #0B2ED9;
`;
