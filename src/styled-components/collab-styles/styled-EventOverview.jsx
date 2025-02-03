import styled from 'styled-components';

export const SEventOverviewHeader = styled.h2`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
  margin: 0 0 16px 0;
`;

export const SEventOverviewContainer = styled.div`
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

export const SLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #A0A0A0;
  margin-right: 8px;
  width: 120px;  
  text-align: left; 
`;

export const SInfoText = styled.p`
  font-size: 14px;
  margin: 4px 0;
  display: inline;
  color: #414141;
  font-weight: 600;
`;

export const SBadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  margin: 8px 0;
`;

export const SBadge = styled.span`
  color: #08D485;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.32px;
  display: inline-flex;
  padding: 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 4px;
  background: #DDFCF0;
`;

export const SOfflineBadge = styled(SBadge)`
  background: #EAF1FF;
  color: #0B2ED9;
`;

export const SInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;