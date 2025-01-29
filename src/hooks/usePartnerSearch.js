import { useState, useEffect } from 'react';
import { BASE_URL } from '../apis/config';

export const usePartnerSearch = (category = '전체', order = 'recent', page = 1) => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          categoryID: CATEGORY_MAPPING[category],
          order: order.toLowerCase(),
          page: page.toString()
        });

        // 하드코딩된 Authorization 헤더
        const headers = {
          'Authorization': 'Bearer YOUR_HARDCODED_TOKEN_HERE', // 여기에 하드코딩된 토큰을 입력하세요
          'Content-Type': 'application/json'
        };

        console.log('Request URL:', `${BASE_URL}/api/partnerd?${params}`);
        console.log('Request Headers:', headers);
        console.log('Request Parameters:', {
          categoryID: CATEGORY_MAPPING[category],
          order: order.toLowerCase(),
          page: page.toString()
        });

        const response = await fetch(`${BASE_URL}/api/partnerd?${params}`, {
          headers: headers
        });
        
        console.log('Response Status:', response.status);
        console.log('Response Status Text:', response.statusText);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.log('Error Response Data:', errorData);
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Success Response Data:', data);
        setPartners(data || []);
      } catch (err) {
        console.error('Detailed Error Information:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
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