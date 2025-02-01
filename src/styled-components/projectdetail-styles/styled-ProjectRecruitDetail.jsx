import styled from 'styled-components';

export const SContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  height: auto;  
  padding-top: 20px;  
  flex-direction: column;  
`;

export const SImageBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 45px;  
  text-align: center;
`;

export const SImageBox = styled.div`
  width: 185px;  
  height: 145px;  
  flex-shrink: 0;
  border-radius: 5px;
  background: url('<path-to-image>') lightgray 50% / cover no-repeat;
`;

export const STextBox = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #212121;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
`;

export const STitle = styled.h2`
  font-size: 25px;
  color: #212121;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
`;

export const SDescription = styled.p`
  font-size: 16px;
  color: #414141;
`;

export const SImageSliderWrapper = styled.div`
  margin-top: 100px;  
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;
