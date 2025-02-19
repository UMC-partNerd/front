import { useState, useEffect } from 'react';
import api from '../api/api';

export const CATEGORY_MAPPING = {
  '전체': null,
  '웹/앱 개발': 1,
  '인공지능': 2,
  '데이터': 3,
  '디자인': 4,
  '마케팅': 5,
  '게임': 6,
  '기타': 7
};

export const useCollaborationList = (page, sortBy, category) => {
  const [collaborations, setCollaborations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCollaborations = async () => {
      try {
        setIsLoading(true);
        let url = `/api/collab-posts?page=${page}&sortBy=${sortBy}`;
        
        if (category && category !== '전체') {
          url += `&categories=${CATEGORY_MAPPING[category]}`;
        }

        const response = await api.get(url);
        
        if (response.data.isSuccess) {
          const { collabPostPreviewDTOLList, totalPage } = response.data.result;
          setCollaborations(collabPostPreviewDTOLList);
          setTotalPages(totalPage);
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        setError(err.message);
        console.error('콜라보레이션 데이터 로딩 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollaborations();
  }, [page, sortBy, category]);

  return { collaborations, isLoading, error, totalPages };
}; 