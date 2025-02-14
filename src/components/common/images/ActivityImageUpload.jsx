import React, { useRef } from 'react';
import * as S from '../../../styled-components/common-styles/Styled-ActivityImageUpload';


const ActivityImageUpload = ({ imagePreview, onClick }) => {
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