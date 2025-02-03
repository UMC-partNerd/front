import React from "react";
import * as S from '../../styled-components/collab-styles/styled-EventOverview';

const EventOverview = () => {
  return (
    <>
      <S.SEventOverviewHeader>행사 개요</S.SEventOverviewHeader>
      <S.SEventOverviewContainer>

        <S.SInfoContainer>
          <S.SLabel>카테고리</S.SLabel>
          <S.SBadgeContainer>
            <S.SBadge>웹/앱 개발</S.SBadge>
            <S.SBadge>인공지능</S.SBadge>
          </S.SBadgeContainer>
        </S.SInfoContainer>

        {/* 행사 유형 */}
        <S.SInfoContainer>
          <S.SLabel>행사 유형</S.SLabel>
          <S.SInfoText>강연 / 세미나</S.SInfoText>
        </S.SInfoContainer>

        {/* 행사명 */}
        <S.SInfoContainer>
          <S.SLabel>행사명</S.SLabel>
          <S.SInfoText>2025 IT 컨퍼런스 공동 개최</S.SInfoText>
        </S.SInfoContainer>

        {/* 한 줄 소개 */}
        <S.SInfoContainer>
          <S.SLabel>한 줄 소개</S.SLabel>
          <S.SInfoText>학생과 사회초년생을 위한 개발 및 인공지능 컨퍼런스</S.SInfoText>
        </S.SInfoContainer>

        {/* 개최 희망일 */}
        <S.SInfoContainer>
          <S.SLabel>개최 희망일</S.SLabel>
          <S.SInfoText>2025. 01. 31</S.SInfoText>
        </S.SInfoContainer>

        {/* 콜라보 마감일 */}
        <S.SInfoContainer>
          <S.SLabel>콜라보 마감일</S.SLabel>
          <S.SInfoText>2025. 01. 04 ~ 2025. 01. 12</S.SInfoText>
        </S.SInfoContainer>

        {/* 콜라보 대상 */}
        <S.SInfoContainer>
          <S.SLabel>콜라보 대상</S.SLabel>
          <S.SInfoText>인공지능 및 개발 동아리</S.SInfoText>
        </S.SInfoContainer>

        {/* 온/오프라인 */}
        <S.SInfoContainer>
          <S.SLabel>온/오프라인</S.SLabel>
          <S.SBadgeContainer>
            <S.SOfflineBadge>오프라인</S.SOfflineBadge>
          </S.SBadgeContainer>
        </S.SInfoContainer>
      </S.SEventOverviewContainer>
    </>
  );
};

export default EventOverview;