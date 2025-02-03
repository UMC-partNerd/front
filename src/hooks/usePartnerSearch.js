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
        const params = new URLSearchParams({
          categoryID: CATEGORY_MAPPING[category],
          order: order.toLowerCase(),
          page: page.toString()
        });

        const headers = {
          'Authorization': `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
          'Content-Type': 'application/json'
        };

        const response = await fetch(`${BASE_URL}/api/partnerd?${params}`, {
          headers: headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Original API Response:', data);

        // 이미지 URL 처리
        const processedData = await processImageUrls(data.result);
        console.log('Processed Data with Images:', processedData);

        setPartners(processedData || []);
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError(err);
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