import React, { useRef } from 'react';
import * as S from '../../../styled-components/common-styles/Styled-ActivityImageUpload';


const ActivityImageUpload = ({ imagePreview, onClick }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <S.UploadGroup>
      <S.UploadRectangle onClick={handleClick}>
        <S.CenterContainer>
          <S.ImagePreview src={imagePreview || "/image.png"} alt="Banner Image" />
          <S.UploadText>이미지 업로드하기</S.UploadText>
        </S.CenterContainer>
      </S.UploadRectangle>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </S.UploadGroup>
  );
};

export default ActivityImageUpload;
