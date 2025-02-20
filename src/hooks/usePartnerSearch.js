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
    if (!profileImage) return '/default-image.jpg';
    if (profileImage.startsWith('http')) return profileImage; // 이미 URL인 경우 그대로 반환
    
    try {
      const response = await api.get(`/api/s3/preSignedUrl`, {
        params: { keyName: profileImage }
      });
      return response.data.result.cloudFrontUrl;
    } catch (err) {
      console.error('이미지 URL 가져오기 실패:', err);
      return '/default-image.jpg';
    }
  };

  // 이미지 URL 처리를 위한 함수
  const processImageUrls = async (items) => {
    const processedItems = await Promise.all(
      items.map(async (item) => {
        const imageUrl = await getImageUrl(item.profileImage);
        return {
          ...item,
          profileImage: imageUrl
        };
      })
    );
    return processedItems;
  };

  useEffect(() => {
    let isMounted = true; // 컴포넌트 마운트 상태 추적

    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
          throw new Error('로그인이 필요합니다.');
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

        if (!response.data.isSuccess) {
          throw new Error(response.data.message || '데이터를 불러오는데 실패했습니다.');
        }

        if (isMounted) {
          const processedData = await processImageUrls(response.data.result);
          setPartners(processedData);
        }
        
      } catch (err) {
        console.error('Error:', err);
        if (err.response?.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        }
        if (isMounted) {
          setError(err.message || '데이터를 불러오는데 실패했습니다.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPartners();

    return () => {
      isMounted = false; // 클린업 함수
    };
  }, [category, order, page]);

  return { partners, isLoading, error };
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