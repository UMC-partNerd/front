import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  height: auto;  
  padding-top: 20px;  
  flex-direction: column;  
`;

export const STitle = styled.h1`
  font-size: 36px;  // 큰 글씨
  font-weight: bold;
  color: #212121;
  text-align: center;
`;

export const SSubtitle = styled.p`
  font-size: 16px;  // 작은 글씨
  color: #414141;
  text-align: center;
  margin-top: 10px;
  line-height: 1.5;
`;

export const SSectionTitle = styled.h2`
  font-size: 24px;  // 프로젝트와 같은 글씨 크기
  font-weight: bold;
  color: #212121;
  margin-top: 30px;
  text-align: center;
`;

export const SSectionDescription = styled.p`
  font-size: 16px;  // 작은 글씨
  color: #414141;
  text-align: center;
  margin-top: 10px;
  line-height: 1.5;
`;
