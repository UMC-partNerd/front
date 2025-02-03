import React, { useState, useRef } from 'react';
import * as S from '../../../styled-components/common-styles/styled-BannerImageUpload';  // 스타일 컴포넌트
import ImageRectangle from './ImageRectangle';  // 이미지 랙탱글 컴포넌트

const BannerImageUpload = () => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // 업로드된 이미지 미리보기 상태

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // 파일 업로드 로직 (예: S3 업로드 후 URL 받기)
      const imageURL = URL.createObjectURL(file);  // 로컬에서 미리보기 URL 생성
      setImagePreview(imageURL);  // 이미지 미리보기 업데이트

      console.log("배너 이미지 업로드 완료");
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생", error);
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
      <ImageRectangle imagePreview={imagePreview} onClose={() => setImagePreview(null)} />
    </S.UploadGroup>
  );
};

export default BannerImageUpload;