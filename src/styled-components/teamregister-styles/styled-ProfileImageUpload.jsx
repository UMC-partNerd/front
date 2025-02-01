import styled from 'styled-components';

export const UploadGroup = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 70px;
`;

export const UploadRectangle = styled.div`
  width: 250px;
  height: 180px;
  background: #F3F3F3;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImagePreview = styled.img`
  width: 30px;  
  height: 30px;  
`;

export const UploadText = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #A0A0A0;
  margin-top: 10px;
`;
