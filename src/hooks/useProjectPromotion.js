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

  const fetchTopProjects = async () => {
    const token = checkAuth();
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion/top3`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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

  const fetchProjects = async (page, sortBy) => {
    const token = checkAuth();
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion?page=${page}&sort=${sortBy === 'popular' ? 1 : 2}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
      setError('프로젝트 목록 조회 실패');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchProjects = async (page, keyword) => {
    const token = checkAuth();
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/promotion/search?page=${page}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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