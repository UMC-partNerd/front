import { useState, useEffect } from 'react';
import axios from 'axios';

const useTopRank = () => {
  const [topRankData, setTopRankData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRank = async () => {
      try {
        // 인기글 데이터 가져오기
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/community/popularity`);
        
        if (response.data.isSuccess) {
          // 각 게시물에 대해 프로필 이미지 URL 가져오기
          const dataWithImages = await Promise.all(
            response.data.result.map(async (item) => {
              // profileKeyName이 있을 때만 이미지 URL 요청
              if (item.profileKeyName) {
                try {
                  const imageResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${item.profileKeyName}`
                  );
                  return {
                    ...item,
                    profileImageUrl: imageResponse.data.result
                  };
                } catch (err) {
                  console.error('프로필 이미지 로딩 실패:', err);
                  return {
                    ...item,
                    profileImageUrl: null
                  };
                }
              }
              // profileKeyName이 없는 경우
              return {
                ...item,
                profileImageUrl: null
              };
            })
          );
          setTopRankData(dataWithImages);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
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
