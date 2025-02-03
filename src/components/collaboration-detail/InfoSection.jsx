import React from 'react';
import * as S from '../../styled-components/collab-styles/styled-InfoSection';

const InfoSection = () => {
  return (
    <S.SInfoContainer>
      <S.SHeaderText>2025 IT 컨퍼런스 공동 개최</S.SHeaderText>
      <S.SInfoBox>
        <S.SInfoRow>
          <S.SInfoText>카테고리</S.SInfoText>
          <S.SBadgeContainer>
            <S.SBadge>웹/앱개발</S.SBadge>
            <S.SBadge>인공지능</S.SBadge>
          </S.SBadgeContainer>
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>행사 유형</S.SInfoText>  
          <S.SEventInfoText>강연/세미나</S.SEventInfoText> 
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>개최 희망일</S.SInfoText>  
          <S.SEventInfoText>2025. 01. 31</S.SEventInfoText>  
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>콜라보 마감일</S.SInfoText> 
          <S.SEventInfoText>2025. 01. 04~2025. 01. 12</S.SEventInfoText>  
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>콜라보 대상</S.SInfoText> 
          <S.SEventInfoText>스타트업</S.SEventInfoText>
        </S.SInfoRow>
      </S.SInfoBox>
    </S.SInfoContainer>
  );
};

export default InfoSection;