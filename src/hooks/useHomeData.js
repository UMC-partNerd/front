import { useState, useEffect } from "react";
import { fetchHomeData } from "../apis/config";
import axios from "axios";

// baseURL 설정
const api = axios.create({
  baseURL: "https://api.partnerd.site", // 실제 백엔드 서버 URL로 변경
});

export const useHomeData = () => {
  const [homeData, setHomeData] = useState({
    collabPost: [],
    clubs: [],
    projects: [],
    promotionProjects: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (profileImage) => {
    return `https://www.partnerd.site/${profileImage}`;
  };

  const processImageUrls = (items) => {
    return Promise.all(
      items.map(async (item) => {
        if (item.profileImage) {
          const cloudFrontUrl = getImageUrl(item.profileImage);
          return {
            ...item,
            thumbnail: cloudFrontUrl || "",
            imageUrl: cloudFrontUrl || "",
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

        const [
          processCollabPost,
          processedClubs,
          processedProjects,
          processedPromotionProjects,
        ] = await Promise.all([
          processImageUrls(data.result.recentCollabPosts || []),
          processImageUrls(data.result.popularClubs || []),
          processImageUrls(data.result.recentProjects || []),
          processImageUrls(data.result.popularPromotionProjects || []),
        ]);
        setHomeData({
          collabPost: processCollabPost,
          clubs: processedClubs,
          projects: processedProjects,
          promotionProjects: processedPromotionProjects,
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
