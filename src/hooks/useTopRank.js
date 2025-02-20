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
              if (item.profileKeyName && item.profileKeyName.trim() !== '') {
                try {
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
                  
                  if (presignedUrlResponse.data.isSuccess && presignedUrlResponse.data.result) {
                    return {
                      ...item,
                      profileImageUrl: presignedUrlResponse.data.result.cloudFrontUrl
                    };
                  }
                  return { ...item, profileImageUrl: null };
                } catch (err) {
                  console.error('프로필 이미지 URL 생성 실패:', err, 'profileKeyName:', item.profileKeyName);
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
