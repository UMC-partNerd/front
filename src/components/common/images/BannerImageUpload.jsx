import React, { useState, useRef } from 'react';
import { getPreSignedUrl, uploadImageToS3 } from '../../../utils/imageUtils';
import * as S from '../../../styled-components/common-styles/styled-BannerImageUpload'; 

const BannerImageUpload = ({ imagePreview, onClick }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1단계: preSignedUrl 요청
      const preSignedUrl = await getPreSignedUrl(file);

      // 2단계: S3에 파일 업로드
      await uploadImageToS3(file, preSignedUrl);

      // 업로드 성공 후 이미지 미리보기 설정
      onClick(URL.createObjectURL(file));

      console.log("배너 이미지 업로드 완료");
    } catch (error) {
      console.error("배너 이미지 업로드 중 오류 발생", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <S.UploadGroup>
      <S.UploadRectangle onClick={handleClick}>
        <S.CenterContainer>
          <S.ImagePreview src={imagePreview || "/image.png"} alt="Banner Image" />
          <S.UploadText>이미지 업로드하기</S.UploadText>
        </S.CenterContainer>
      </S.UploadRectangle>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {uploading ? <p>업로드 중...</p> : null}
      {imagePreview && <img src={imagePreview} alt="미리보기" />}
    </S.UploadGroup>
  );
};

export default BannerImageUpload;
