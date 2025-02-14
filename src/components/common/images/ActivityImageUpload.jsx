import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ActivityImageUpload = ({ folderName, type, setImageKey }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const presignedResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/s3/preSignedUrl`,
        {
          folderName: folderName,
          type: type,
          filename: file.name,
          contentType: file.type
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      await axios.put(
        presignedResponse.data.result.preSignedUrl,
        file,
        {
          headers: {
            'Content-Type': file.type,
            'x-amz-meta-cache-control': 'max-age=31536000'
          }
        }
      );

      setImageKey(presignedResponse.data.result.keyName);

    } catch (error) {
      console.error('이미지 업로드 중 오류 발생', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadContainer>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <UploadButton onClick={handleClick} disabled={uploading}>
        {uploading ? '업로드 중...' : '이미지 업로드'}
      </UploadButton>
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  background-color: #0D29B7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default ActivityImageUpload;