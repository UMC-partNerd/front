import { useState, useEffect } from 'react';
import axios from 'axios';

const useTopRank = () => {
  const [topRankData, setTopRankData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRank = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/community/popularity`);
        
        if (response.data.isSuccess && Array.isArray(response.data.result)) {
          const dataWithImages = await Promise.all(
            response.data.result.map(async (item) => {
              console.log('처리 중인 아이템:', item);
              
              if (item.profileKeyName && item.profileKeyName.trim() !== '') {
                try {
                  console.log('프로필 이미지 요청 시작:', item.profileKeyName);
                  const presignedUrlResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/s3/preSignedUrl`, {
                      params: {
                        keyName: item.profileKeyName
                      },
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    }
                  );
                  
                  console.log('프로필 이미지 응답 상태:', presignedUrlResponse.status);
                  console.log('프로필 이미지 응답 데이터:', presignedUrlResponse.data);
                  
                  if (presignedUrlResponse.data.isSuccess && presignedUrlResponse.data.result) {
                    const cloudFrontUrl = presignedUrlResponse.data.result.cloudFrontUrl;
                    console.log('생성된 CloudFront URL:', cloudFrontUrl);
                    return {
                      ...item,
                      profileImageUrl: cloudFrontUrl
                    };
                  }
                  console.warn('프로필 이미지 URL 생성 실패: 응답 데이터가 올바르지 않음');
                  return { ...item, profileImageUrl: null };
                } catch (err) {
                  console.error('프로필 이미지 URL 생성 실패:', {
                    error: err.message,
                    status: err.response?.status,
                    data: err.response?.data,
                    profileKeyName: item.profileKeyName
                  });
                  return { ...item, profileImageUrl: null };
                }
              }
              return { ...item, profileImageUrl: null };
            })
          );
          setTopRankData(dataWithImages);
        } else {
          setError('유효하지 않은 데이터 형식입니다.');
        }
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopRank();
  }, []);

  return { topRankData, isLoading, error };
};

export default useTopRank;
