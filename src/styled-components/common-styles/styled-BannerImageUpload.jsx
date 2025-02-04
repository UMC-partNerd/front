import styled from 'styled-components';

export const UploadGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

export const UploadRectangle = styled.div`
  width: 1000px;
  height: 250px;
  background: #F3F3F3;
  border-radius: 9px;
  display: flex;
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