import { useState, useEffect } from 'react';
import axios from 'axios';

const useProjectCollaboration = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('endDate');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: null, name: '전체' },
    { id: 1, name: '웹/앱 개발' },
    { id: 2, name: '인공지능' },
    { id: 3, name: '데이터' },
    { id: 4, name: '디자인' },
    { id: 5, name: '마케팅' },
    { id: 6, name: '게임' },
    { id: 7, name: '기타' }
  ];

  const fetchProjects = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_BASE_URL}/api/collabPosts?page=${currentPage}&sortBy=${sortBy}`;
      
      if (selectedCategory) {
        url += `&categories=${selectedCategory}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (response.data.isSuccess) {
        const result = response.data.result;
        setProjects(result.collabPostPreviewDTOLList || []);
        setTotalPages(result.totalPage || 1);
      }
    } catch (err) {
      setError(err.message);
      console.error('프로젝트 데이터 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = async (keyName) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      alert('로그인이 필요합니다.');
      return null;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/s3/preSignedUrl?keyName=${keyName}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          }
        }
      );

      if (response.data.isSuccess) {
        return response.data.result.cloudFrontUrl;
      }
      return null;
    } catch (err) {
      console.error('이미지 URL 조회 실패:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, sortBy, selectedCategory]);

  return {
    projects,
    currentPage,
    setCurrentPage,
    totalPages,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    categories,
    loading,
    error,
    getImageUrl
  };
};

export default useProjectCollaboration;
