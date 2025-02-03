import React, { useState, useRef } from 'react';
import * as S from '../../../styled-components/common-styles/styled-BannerImageUpload';
import ImageRectangle from './ImageRectangle';

const BannerImageUpload = ({ folderName, type, setImageKey, setImagePreview }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreviewState] = useState(null); // imagePreview 상태 추가

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. presigned POST URL 생성
      const response = await fetch('https://api.partnerd.site/api/s3/preSignedUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          folderName,
          type,
          contentType: file.type,  // contentType을 추가
        }),
      });
      

      const data = await response.json();
      const { preSignedUrl, keyName } = data.result;

      // 경로 중복 방지: folderName이 keyName에 두 번 포함되지 않도록 처리
      const finalKeyName = keyName.replace(`${folderName}/`, ''); // folderName이 keyName에 중복될 경우 제거

      // 2. presigned URL을 사용하여 이미지 업로드
      await fetch(preSignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      setImageKey(finalKeyName); // 최종 keyName 설정

      // 3. presigned GET URL 생성
      const getResponse = await fetch(`https://api.partnerd.site/api/s3/preSignedUrl?keyName=${finalKeyName}`, {
        method: 'GET',
      });
      
      const getData = await getResponse.json();
      const { cloudFrontUrl } = getData.result;

      setImagePreview(cloudFrontUrl);
      setImagePreviewState(cloudFrontUrl); // 이미지 미리보기 상태 업데이트

      console.log('이미지 업로드 및 CloudFront URL 생성 완료');
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
          <S.ImagePreview src="/image.png" alt="Icon" />
          <S.UploadText>이미지 업로드하기</S.UploadText>
        </S.CenterContainer>
      </S.UploadRectangle>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {uploading && <p>업로드 중...</p>}
      {/* 항상 ImageRectangle을 표시하고, 업로드된 이미지가 있으면 해당 이미지를 미리보기로 표시 */}
      <ImageRectangle imagePreview={imagePreview} onClose={() => setImagePreviewState(null)} />
    </S.UploadGroup>
  );
};

export default BannerImageUpload;
