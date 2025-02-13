import React, { useState, useRef } from 'react';
import * as S from '../../../styled-components/common-styles/Styled-ActivityImageUpload';

const ActivityImageUpload = ({ folderName, type, setImageKey, setImagePreview }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();  // 파일 선택 창 열기
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);  // 업로드 중 상태로 변경
    try {
      // 서버로 파일 업로드 요청 (POST)
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

      setImageKey(keyName);  // 이미지 키 설정

      const formData = new FormData();
      formData.append('file', file);
      
      await fetch(preSignedUrl, {
        method: 'PUT',
        body: file,  // Content-Type을 지정하지 않음
      });
      

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);  // 미리보기 이미지 설정
      console.log('이미지 업로드 완료:', imageUrl);
    } catch (error) {
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
          <S.UploadText>이미지 업로드하기</S.UploadText>
        </S.CenterContainer>
      </S.UploadRectangle>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {uploading && <p>업로드 중...</p>}
    </S.UploadGroup>
  );
};

export default ActivityImageUpload;
