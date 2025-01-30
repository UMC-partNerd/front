import React, { useRef } from 'react';
import styled from 'styled-components';

const BannerImageUpload = ({ imagePreview, onClick}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <UploadGroup>
      <UploadRectangle onClick={handleClick}>
        <CenterContainer>
          <ImagePreview src={imagePreview || "/image.png"} alt="Banner Image" />
          <UploadText>이미지 업로드하기</UploadText>
        </CenterContainer>
      </UploadRectangle>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </UploadGroup>
  );
};

const UploadGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
`;

const UploadRectangle = styled.div`
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

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 30px;  // 고정된 너비
  height: 30px;  // 고정된 높이
`;

const UploadText = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #A0A0A0;
  margin-top: 10px;
`;

export default BannerImageUpload;
