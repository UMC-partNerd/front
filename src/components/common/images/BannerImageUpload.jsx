import React, { useState, useRef } from 'react';
import * as S from '../../../styled-components/common-styles/styled-BannerImageUpload'; // BannerImageUpload 스타일 컴포넌트

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

      setImageKey(keyName); // 서버로 이미지 키 전송

      await fetch(preSignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,  
          'x-amz-meta-cache-control': 'max-age=864000'  // 캐시 제어 헤더 추가
        },
        body: file,
      });

      // 로컬 미리보기 업데이트
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);  // 미리보기 이미지를 업데이트
      setImagePreviewState(imageUrl);

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
          <S.ImagePreview src='/image.png' alt='Icon' /> {/* 여기에 업로드된 이미지 미리보기 */}
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

export default BannerImageUpload;
