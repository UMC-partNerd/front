import React, { useState, useRef } from 'react';
import * as S from '../../../styled-components/common-styles/styled-BannerImageUpload';

const BannerImageUpload = ({ folderName, type, setImageKey, setImagePreview }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreviewState] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click(); // 이미지 파일 선택
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await fetch('https://api.partnerd.site/api/s3/preSignedUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          folderName,
          type,
          contentType: file.type,
        }),
      });

      const data = await response.json();
      const { preSignedUrl, keyName } = data.result;

      setImageKey(keyName);

      await fetch(preSignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setImagePreviewState(imageUrl);

      console.log('이미지 업로드 완료:', imageUrl);
      console.log('이미지 업로드 완료:', imageUrl);
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생', error);
      console.error('이미지 업로드 중 오류 발생', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <S.UploadGroup>
      <S.UploadRectangle onClick={handleClick}>
        <S.CenterContainer>
          <S.ImagePreview src='/image.png' alt='Icon' /> 
          <S.ImagePreview src='/image.png' alt='Icon' /> 
          <S.UploadText>이미지 업로드하기</S.UploadText>
        </S.CenterContainer>
      </S.UploadRectangle>
      <input
        type='file'
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {uploading && <p>업로드 중...</p>}
      {uploading && <p>업로드 중...</p>}
    </S.UploadGroup>
  );
};

export default BannerImageUpload;