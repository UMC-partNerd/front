import React, { useState } from 'react';
import * as S from '../../styled-components/collab-styles/styled-InfoSection';
import Button, { TYPES } from "../common/button";

const InfoSection = ({ collabData, buttonHandler }) => {
  if (!collabData) return null;  // 데이터가 없으면 렌더링하지 않음

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : '정보 없음';
  };
  
  return (
    <S.SInfoContainer>
      <S.SHeaderText>{collabData.title || '제목 없음'}</S.SHeaderText>
      <S.SInfoBox>
        <S.SInfoRow>
          <S.SInfoText>카테고리</S.SInfoText>
          <S.SBadgeContainer>
            {collabData.categoryDTOList && collabData.categoryDTOList.map((category) => (
              <S.SBadge key={category.id}>{category.name}</S.SBadge>
            ))}
          </S.SBadgeContainer>
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>행사 유형</S.SInfoText>  
          <S.SEventInfoText>{collabData.eventType || '정보 없음'}</S.SEventInfoText> 
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>개최 희망일</S.SInfoText>  
          <S.SEventInfoText>{formatDate(collabData.openDate)}</S.SEventInfoText>  
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>콜라보 마감일</S.SInfoText> 
          <S.SEventInfoText>{formatDate(collabData.closeDate)}</S.SEventInfoText>  
        </S.SInfoRow>
        <S.SInfoRow>
          <S.SInfoText>콜라보 대상</S.SInfoText> 
          <S.SEventInfoText>{collabData.collabTarget || '정보 없음'}</S.SEventInfoText>
        </S.SInfoRow>
      </S.SInfoBox>

      <Button
        type={TYPES.NEXT}
        text='협업 요청하기'
        onClick={buttonHandler}
      /> 

    </S.SInfoContainer>
  );
};

export default InfoSection;