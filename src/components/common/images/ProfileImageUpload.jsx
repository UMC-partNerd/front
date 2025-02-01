import React, { useState, useRef } from 'react';
import { getPreSignedUrl, uploadImageToS3 } from '../../../utils/imageUtils';
import { UploadGroup, UploadRectangle, CenterContainer, ImagePreview, UploadText } from '../../../styled-components/common-styles/styled-ProfileImageUpload'; 

const ProfileImageUpload = ({ onClick, imagePreview }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click(); // 파일 업로드 버튼 클릭 시 파일 선택 창 띄우기
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true); // 업로드 시작 시 loading 상태
    try {
      // 1단계: pre-signed URL 요청
      const preSignedUrl = await getPreSignedUrl(file);

      // 2단계: S3에 파일 업로드
      await uploadImageToS3(file, preSignedUrl);

      // 업로드 성공 후 이미지 미리보기 설정
      onClick(URL.createObjectURL(file)); // onClick을 이용해 이미지 미리보기 설정

      console.log("이미지 업로드 완료");
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생", error);
    } finally {
      setUploading(false); // 업로드 완료 후 loading 상태 해제
    }
  };

  return (
    <UploadGroup>
      <UploadRectangle onClick={handleClick}>
        <CenterContainer>
          <ImagePreview src={imagePreview || "/image.png"} alt="Profile Image" />
          <UploadText>이미지 업로드하기</UploadText>
        </CenterContainer>
      </UploadRectangle>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // 파일 input 숨기기
        onChange={handleFileChange}  // 파일 선택 후 처리
      />
      {uploading ? <p>업로드 중...</p> : null}  {/* 업로드 중 표시 */}
      {imagePreview && <img src={imagePreview} alt="미리보기" />}
    </UploadGroup>
  );
};

export default ProfileImageUpload;
