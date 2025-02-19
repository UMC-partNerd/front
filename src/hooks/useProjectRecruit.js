import axios from 'axios';

const useProjectRecruit = () => {
  const checkAuth = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return false;
    }
    return token;
  };

  const uploadImage = async (file, type) => {
    const token = checkAuth();
    if (!token) return null;

    try {
      // 1. PreSigned URL 요청
      const presignedResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/s3/preSignedUrl`,
        {
          folderName: "projects",
          type: type, // 3: THUMBNAIL, 4: INTRO
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

      // 2. PreSigned URL을 사용하여 이미지 업로드
      await axios.put(
        presignedResponse.data.result.preSignedUrl,
        file,
        {
          headers: {
            'Content-Type': file.type,
            'x-amz-meta-cache-control': 'max-age=31536000' // S3 메타데이터 추가
          }
        }
      );

      return presignedResponse.data.result.keyName;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      if (error.response) {
        console.error('에러 응답:', error.response.data);
      }
      throw error;
    }
  };

  const registerProject = async (projectData) => {
    const token = checkAuth();
    if (!token) return null;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/recruit`,
        projectData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('프로젝트 등록 실패:', error);
      if (error.response) {
        console.error('에러 응답:', error.response.data);
      }
      throw error;
    }
  };

  return {
    uploadImage,
    registerProject
  };
};

export default useProjectRecruit; 