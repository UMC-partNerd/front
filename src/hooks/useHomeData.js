import { useState, useEffect } from 'react';
import { fetchHomeData } from '../apis/config';
import axios from 'axios';

// baseURL 설정
const api = axios.create({
  baseURL: 'https://api.partnerd.site'  // 실제 백엔드 서버 URL로 변경
});

export const useHomeData = () => {
  const [homeData, setHomeData] = useState({
    clubs: [],
    projects: [],
    promotionProjects: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = async (profileImage) => {
    try {
      // 백엔드 API로 presigned URL 요청
      const response = await api.get(`/api/s3/preSignedUrl`, {
        params: {
          keyName: profileImage
        }
      });
      
      // cloudFrontUrl 반환
      return response.data.result.cloudFrontUrl;
    } catch (err) {
      console.error('이미지 URL 가져오기 실패:', err);
      return null;
    }
  };

  const processImageUrls = async (items) => {
    return Promise.all(
      items.map(async (item) => {
        if (item.profileImage) {
          const cloudFrontUrl = await getImageUrl(item.profileImage);
          return {
            ...item,
            thumbnail: cloudFrontUrl || '', 
            imageUrl: cloudFrontUrl || ''
          };
        }
        return item;
      })
    );
  };

  const processCollabImageUrls = async (items) => {
    return Promise.all(
      items.map(async (item) => {
        if (item.clubProfileImage) {
          const cloudFrontUrl = await getImageUrl(item.clubProfileImage);  // presigned URL 받아오기
          return {
            ...item,
            thumbnail: cloudFrontUrl || '',
            imageUrl: cloudFrontUrl || ''
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHomeData();
        
        const processedProjects = await processImageUrls(data.result.recentProjects || []);
        const processedPromotionProjects = await processImageUrls(data.result.popularPromotionProjects || []);
        const processedClubs = await processImageUrls(data.result.popularClubs || []);

        setHomeData({
          clubs: processedClubs,
          projects: processedProjects,
          promotionProjects: processedPromotionProjects
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { homeData, isLoading, error };
};
