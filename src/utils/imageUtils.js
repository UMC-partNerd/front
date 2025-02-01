// imageUtils.js
import axios from 'axios';

const getPreSignedUrl = async (file) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // 서버의 API URL
  const formData = {
    folderName: "collabPost",  // 이미지 폴더
    type: 0,  // 이미지 타입
    filename: file.name,  // 파일 이름
    contentType: file.type,  // 파일 MIME 타입
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/api/s3/preSignedUrl`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.isSuccess) {
      return response.data.result.preSignedUrl;  // 성공 시 preSignedUrl 반환
    } else {
      throw new Error('preSignedUrl 생성 실패');
    }
  } catch (error) {
    console.error("preSignedUrl 요청 실패:", error);
    throw error;
  }
};

const uploadImageToS3 = async (file, preSignedUrl) => {
  try {
    // 파일을 S3에 업로드
    const response = await axios.put(preSignedUrl, file, {
      headers: {
        'Content-Type': file.type,  // 업로드할 파일의 MIME 타입 설정
        'x-amz-meta-Content-Type': file.type,  // 이미지 파일 MIME 타입을 메타데이터로 설정
        'x-amz-meta-fileType': 'image/png',    // 필요에 따라 추가적인 메타데이터 설정
      },
    });

    if (response.status === 200) {
      console.log("파일 업로드 성공");
    } else {
      throw new Error('파일 업로드 실패');
    }
  } catch (error) {
    console.error("S3 파일 업로드 실패:", error);
    throw error;
  }
};


export { getPreSignedUrl, uploadImageToS3 };
