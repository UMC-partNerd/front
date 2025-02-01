// InfoSection.jsx
import React from 'react';
import styled from 'styled-components';

const HeaderText = styled.div`
  width: 100%;
  background-color: #fff;
  text-align: center;
  padding: 10px;
  font-size: 17px;
  font-weight: 700;
  color: #000;
  margin-bottom: 7px;
  margin-top: 5px;
`;

const InfoBox = styled.div`
  width: 220px;
  height: 190px;  
  flex-shrink: 0;
  border-radius: 7px;
  background: #F3F4F7;
  display: flex;
  flex-direction: column;  
  justify-content: flex-start;
  align-items: flex-start;  
  padding: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 7px 0;  
`;

const InfoText = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #707070;
  margin-right: 5px;  
  min-width: 80px;  
  margin: 5px;
`;

const EventInfoText = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #414141;  
  white-space: nowrap;  
`;


const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; 
  gap: 8px;
`;

const Badge = styled.div`
  background-color: #DDFCF0;
  color: #08D485;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  width: 240px; 
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  background: #FFF;
  border-radius: 10px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12); 
`;

const InfoSection = () => {
  return (
    <InfoContainer>
      <HeaderText>2025 IT 컨퍼런스 공동 개최</HeaderText>
      <InfoBox>
        <InfoRow>
          <InfoText>카테고리</InfoText>
          <BadgeContainer>
            <Badge>웹/앱개발</Badge>
            <Badge>인공지능</Badge>
          </BadgeContainer>
        </InfoRow>
        <InfoRow>
          <InfoText>행사 유형</InfoText>  
          <EventInfoText>강연/세미나</EventInfoText> 
        </InfoRow>
        <InfoRow>
          <InfoText>개최 희망일</InfoText>  
          <EventInfoText>2025. 01. 31</EventInfoText>  
        </InfoRow>
        <InfoRow>
          <InfoText>콜라보 마감일</InfoText> 
          <EventInfoText>2025. 01. 04~2025. 01. 12</EventInfoText>  
        </InfoRow>
        <InfoRow>
          <InfoText>콜라보 대상</InfoText> 
          <EventInfoText>스타트업</EventInfoText>
        </InfoRow>
      </InfoBox>
    </InfoContainer>
  );
};

export default InfoSection;
