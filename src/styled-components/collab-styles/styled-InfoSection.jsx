import styled from 'styled-components';

export const SHeaderText = styled.div`
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

export const SInfoBox = styled.div`
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

export const SInfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 7px 0;  
`;

export const SInfoText = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #707070;
  margin-right: 5px;  
  min-width: 80px;  
  margin: 5px;
`;

export const SEventInfoText = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #414141;  
  white-space: nowrap;  
`;

export const SBadgeContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; 
  gap: 8px;
`;

export const SBadge = styled.div`
  background-color: #DDFCF0;
  color: #08D485;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 4px;
`;

export const SInfoContainer = styled.div`
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