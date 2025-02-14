import React, { useState, useRef } from 'react';
import * as S from '../../../styled-components/common-styles/styled-ActivityImageUpload';

const ActivityImageUpload = ({ folderName, type, setImageKey, setImagePreview, setImageUrlForClubInfo }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState(null);  // 로컬 미리보기 상태

  const handleClick = () => {
    fileInputRef.current.click();  // 파일 선택 창 열기
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 로컬 미리보기 이미지 생성
    const imageUrl = URL.createObjectURL(file);
    setLocalPreview(imageUrl);  // 로컬 미리보기 상태 업데이트
    setImagePreview(imageUrl);  // 부모 컴포넌트로 미리보기 전달

    setUploading(true);
    try {
      // 서버로 파일 업로드 요청 (POST)
      const response = await fetch('https://api.partnerd.site/api/s3/preSignedUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-amz-meta-cache-control': 'max-age=864000'
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

      setImageKey(keyName);  // 이미지 키만 설정

      // 실제 파일을 S3로 업로드
      await fetch(preSignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,  
          'x-amz-meta-cache-control': 'max-age=864000'  // 캐시 제어 헤더 추가
        },
        body: file,
      });
   
      setImageUrlForClubInfo(keyName);  

      console.log('이미지 업로드 완료: ', keyName);
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
