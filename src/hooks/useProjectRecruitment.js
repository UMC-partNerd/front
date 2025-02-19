import { useState, useEffect } from 'react';
import axios from 'axios';

const useProjectRecruitment = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedCategories, setSelectedCategories] = useState(['전체']);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const statusMap = {
    '전체': '',
    '모집중': '0',
    '모집완료': '1'
  };

  const categoryMap = {
    '전체': '',
    'Web': '1',
    'Server': '2',
    'iOS': '3',
    'Android': '4',
    'Design': '5',
    'PM': '6',
    'AI/데이터': '7',
    '게임 개발': '8',
    '기타': '9'
  };

  const fetchProjects = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      setLoading(true);
      const status = statusMap[selectedStatus];
      const categories = selectedCategories.includes('전체') 
        ? '' 
        : selectedCategories.map(cat => categoryMap[cat]).join(',');

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/project/recruit`,
        {
          params: {
            page: currentPage,
            status: status,
            category: categories,
            keyword: searchTerm
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      );

      const { result } = response.data;
      const projectsWithImages = await Promise.all(
        result.projectPreviewDTOList.map(async (project) => {
          if (project.thumbnailKeyName) {
            const imageResponse = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/api/s3/preSignedUrl`,
              {
                params: { keyName: project.thumbnailKeyName },
                headers: { Authorization: `Bearer ${jwtToken}` }
              }
            );
            return {
              ...project,
              imageUrl: imageResponse.data.result.cloudFrontUrl
            };
          }
          return project;
        })
      );

      setProjects(projectsWithImages);
      setTotalPages(result.totalPage);
    } catch (error) {
      console.error('프로젝트 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, selectedStatus, selectedCategories, searchTerm]);

  return {
    projects,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedStatus,
    setSelectedStatus,
    selectedCategories,
    setSelectedCategories,
    searchTerm,
    setSearchTerm,
    loading
  };
};

export default useProjectRecruitment;
