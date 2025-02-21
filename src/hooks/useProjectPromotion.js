import { useState } from 'react';
import axios from 'axios';

const useProjectPromotion = () => {
  const [topProjects, setTopProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
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

  const getImageUrl = async (keyName) => {
    const token = checkAuth();
    if (!token) return null;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/s3/preSignedUrl?keyName=${keyName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.result.cloudFrontUrl;
    } catch (error) {
      console.error('이미지 URL 조회 실패:', error);
      return null;
    }
  };

  // 1. 인기 Top3 프로젝트 조회 (GET /api/project/promotion/top3)
  const fetchTopProjects = async () => {
    const token = checkAuth();
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion/top3`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const projectsWithImages = await Promise.all(
        response.data.result.map(async (project) => ({
          ...project,
          imageUrl: await getImageUrl(project.thumbnailKeyName)
        }))
      );
      
      setTopProjects(projectsWithImages);
    } catch (error) {
      setError('인기 프로젝트 조회 실패');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. 프로젝트 홍보 둘러보기 (인기순/최신순)
  // 변경사항: POST 대신 GET 메서드를 사용하고, 응답의 promotionProjectPreviewDTOList와 totalPage를 사용합니다.
  const fetchProjects = async (page, sortBy) => {
    const token = checkAuth();
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      
      const sortValue = sortBy === 'latest' ? 1 : 0;
      console.log('정렬 요청값:', { page, sortBy, sortValue });

      const url = `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion?page=${page}&sort=${sortValue}`;
      console.log('요청 URL:', url);

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('서버 응답:', response.data);
      
      if (!response.data || !response.data.result) {
        throw new Error('잘못된 응답 데이터입니다.');
      }

      if (!Array.isArray(response.data.result.promotionProjectPreviewDTOList)) {
        throw new Error('프로젝트 목록이 올바른 형식이 아닙니다.');
      }

      const projectsWithImages = await Promise.all(
        response.data.result.promotionProjectPreviewDTOList.map(async (project) => {
          try {
            const imageUrl = await getImageUrl(project.thumbnailKeyName);
            return { ...project, imageUrl };
          } catch (error) {
            console.error('이미지 URL 조회 실패:', error);
            return { ...project, imageUrl: null };
          }
        })
      );
      
      setProjects(projectsWithImages);
      setTotalPages(response.data.result.totalPage || 1);
      
    } catch (error) {
      console.error('프로젝트 목록 조회 실패:', error);
      console.error('에러 상세:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('프로젝트 목록 조회 실패');
      setProjects([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // 3. 프로젝트 홍보 검색
  // 변경사항: 검색 엔드포인트의 URL 구성을 명세서에 맞게 수정했습니다.
  const searchProjects = async (page, keyword) => {
    const token = checkAuth();
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion/search?page=${page}&keyword=${keyword}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const projectsWithImages = await Promise.all(
        response.data.result.promotionProjectPreviewDTOList.map(async (project) => ({
          ...project,
          imageUrl: await getImageUrl(project.thumbnailKeyName)
        }))
      );
      
      setProjects(projectsWithImages);
      setTotalPages(response.data.result.totalPage);
    } catch (error) {
      setError('프로젝트 검색 실패');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    topProjects,
    projects,
    totalPages,
    loading,
    error,
    fetchTopProjects,
    fetchProjects,
    searchProjects
  };
};

export default useProjectPromotion;
