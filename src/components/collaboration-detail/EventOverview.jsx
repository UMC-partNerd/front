import React from "react";
import styled from "styled-components";

// 행사 개요 제목 스타일
const EventOverviewHeader = styled.h2`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
  margin: 0 0 16px 0;
`;

// 행사 개요 컨테이너 스타일
const EventOverviewContainer = styled.div`
  display: flex;
  width: 470px;
  height: auto;
  padding: 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1.3px solid #C2C2C2;
  background: #fff;
`;

// 행사 정보 라벨 스타일
const Label = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #A0A0A0;
  margin-right: 8px;
  width: 120px;  // 고정 너비 추가
  text-align: left;  // 왼쪽 정렬
`;

// 행사 정보 텍스트 스타일
const InfoText = styled.p`
  font-size: 14px;
  margin: 4px 0;
  display: inline;
  color: #414141;
  font-weight: 600;
`;

// 배지 컨테이너
const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap; /* 배지를 한 줄로 배치 */
  margin: 8px 0;
`;

// 기본 배지 스타일 (크기 줄임)
const Badge = styled.span`
  color: #08D485;
  font-family: Pretendard, sans-serif;
  font-size: 12px;  // 크기 줄임
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.32px;
  display: inline-flex;
  padding: 2px 6px;  // 크기 줄임
  justify-content: center;
  align-items: center;
  gap: 5px;  // 크기 줄임
  border-radius: 4px;
  background: #DDFCF0;
`;

// 오프라인 배지 스타일 (크기 줄임)
const OfflineBadge = styled(Badge)`
  background: #EAF1FF;
  color: #0B2ED9;
`;

// 라벨과 텍스트/배지를 정렬하는 컨테이너
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%; /* 전체 너비 사용 */
`;

const EventOverview = () => {
  return (
    <>
      <EventOverviewHeader>행사 개요</EventOverviewHeader>
      <EventOverviewContainer>
        {/* 카테고리와 배지를 한 줄로 배치 */}
        <InfoContainer>
          <Label>카테고리</Label>
          <BadgeContainer>
            <Badge>웹/앱 개발</Badge>
            <Badge>인공지능</Badge>
          </BadgeContainer>
        </InfoContainer>

        {/* 행사 유형 */}
        <InfoContainer>
          <Label>행사 유형</Label>
          <InfoText>강연 / 세미나</InfoText>
        </InfoContainer>

        {/* 행사명 */}
        <InfoContainer>
          <Label>행사명</Label>
          <InfoText>2025 IT 컨퍼런스 공동 개최</InfoText>
        </InfoContainer>

        {/* 한 줄 소개 */}
        <InfoContainer>
          <Label>한 줄 소개</Label>
          <InfoText>학생과 사회초년생을 위한 개발 및 인공지능 컨퍼런스</InfoText>
        </InfoContainer>

        {/* 개최 희망일 */}
        <InfoContainer>
          <Label>개최 희망일</Label>
          <InfoText>2025. 01. 31</InfoText>
        </InfoContainer>

        {/* 콜라보 마감일 */}
        <InfoContainer>
          <Label>콜라보 마감일</Label>
          <InfoText>2025. 01. 04 ~ 2025. 01. 12</InfoText>
        </InfoContainer>

        {/* 콜라보 대상 */}
        <InfoContainer>
          <Label>콜라보 대상</Label>
          <InfoText>인공지능 및 개발 동아리</InfoText>
        </InfoContainer>

        {/* 온/오프라인 */}
        <InfoContainer>
          <Label>온/오프라인</Label>
          <BadgeContainer>
            <OfflineBadge>오프라인</OfflineBadge>
          </BadgeContainer>
        </InfoContainer>
      </EventOverviewContainer>
    </>
  );
};

export default EventOverview;