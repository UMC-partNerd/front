import { useState, useEffect } from 'react';
import { BASE_URL } from '../apis/config';
import axios from 'axios';

// baseURL 설정
const api = axios.create({
  baseURL: BASE_URL
});

export const usePartnerSearch = (category = '전체', order = 'recent', page = 1) => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // S3 pre-signed URL을 가져오는 함수
  const getImageUrl = async (profileImage) => {
    try {
      if (!profileImage) return null;
      
      const response = await api.get(`/api/s3/preSignedUrl`, {
        params: {
          keyName: profileImage
        }
      });
      
      return response.data.result.cloudFrontUrl;
    } catch (err) {
      console.error('이미지 URL 가져오기 실패:', err);
      return null;
    }
  };

  // 이미지 URL 처리를 위한 함수
  const processImageUrls = async (items) => {
    return Promise.all(
      items.map(async (item) => {
        if (item.profileImage) {
          const cloudFrontUrl = await getImageUrl(item.profileImage);
          return {
            ...item,
            profileImage: cloudFrontUrl || '/default-image.jpg'
          };
        }
        return {
          ...item,
          profileImage: '/default-image.jpg'
        };
      })
    );
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
          alert('로그인이 필요합니다.');
          setError('로그인이 필요합니다.');
          return;
        }

        const params = new URLSearchParams({
          page: page.toString(),
          sort: order === 'recent' ? 'latest' : 'popular'
        });

        if (category !== '전체') {
          params.append('categoryID', CATEGORY_MAPPING[category]);
        }

        const response = await api.get(`/api/partnerd?${params}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // 응답 데이터 확인
        if (!response.data.isSuccess) {
          throw new Error(response.data.message || '데이터를 불러오는데 실패했습니다.');
        }

        // API 응답의 result 배열 처리
        const processedData = await processImageUrls(response.data.result);
        setPartners(processedData);
        
      } catch (err) {
        console.error('Error:', err);
        if (err.response?.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        }
        setError(err.message || '데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [category, order, page]);

  return {
    partners,
    isLoading,
    error,
  };
};

// 카테고리와 정렬 옵션을 상수로 관리
export const PARTNER_CATEGORIES = [
  '전체',
  '웹/앱개발',
  '인공지능',
  '게임',
  '데이터',
  '기획/디자인',
  '기타'
];

export const SORT_OPTIONS = {
  RECENT: 'recent',
  POPULAR: 'popular'
};

// 카테고리 매핑
export const CATEGORY_MAPPING = {
  '전체': '1',
  '웹/앱개발': '2',
  '인공지능': '3',
  '게임': '4',
  '데이터': '5',
  '기획/디자인': '6',
  '기타': '7'
}; 