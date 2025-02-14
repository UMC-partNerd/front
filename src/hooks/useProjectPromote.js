import { useState } from 'react';
import axios from 'axios';

const useProjectPromote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            'Content-Type': file.type
          }
        }
      );

      return presignedResponse.data.result.keyName;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
  };

  const registerProject = async (projectData) => {
    const token = checkAuth();
    if (!token) return null;

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion`,
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
      setError('프로젝트 등록 실패');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 프로젝트 수정 API
  const updateProject = async (promotionProjectId, projectData) => {
    const token = checkAuth();
    if (!token) return null;

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion/${promotionProjectId}`,
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
      setError('프로젝트 수정 실패');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 프로젝트 삭제 API
  const deleteProject = async (promotionProjectId) => {
    const token = checkAuth();
    if (!token) return null;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion/${promotionProjectId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      setError('프로젝트 삭제 실패');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    registerProject,
    updateProject,
    deleteProject,
    loading,
    error
  };
};

export default useProjectPromote; 