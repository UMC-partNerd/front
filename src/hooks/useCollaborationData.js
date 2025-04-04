import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/api";

export const useCollaborationData = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = async (profileImage) => {
    return `https://www.partnerd.site/${profileImage}`;
  };

  const processCollabImageUrls = async (items) => {
    try {
      console.log("처리할 아이템들:", items);

      return Promise.all(
        items.map(async (item) => {
          console.log("현재 처리중인 아이템:", item);

          let imageUrl = "";
          if (item.clubProfileImage && item.clubProfileImage !== "string") {
            console.log("이미지 URL 요청 시작:", item.clubProfileImage);
            const cloudFrontUrl = await getImageUrl(item.clubProfileImage);
            imageUrl = cloudFrontUrl || "";
            console.log("받은 이미지 URL:", imageUrl);
          }

          return {
            ...item,
            thumbnail: imageUrl,
            imageUrl: imageUrl,
          };
        })
      );
    } catch (error) {
      console.error("이미지 처리 중 에러 발생:", error);
      return items.map((item) => ({
        ...item,
        thumbnail: "",
        imageUrl: "",
      }));
    }
  };

  useEffect(() => {
    const fetchCollaborations = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/home");

        // 데이터 구조 확인 및 로깅
        console.log("API 응답:", response.data?.result?.recentCollabPosts);

        const collabData = response.data?.result?.recentCollabPosts || [];
        const processedCollabs = await processCollabImageUrls(collabData);

        console.log("처리된 데이터:", processedCollabs);
        setCollaborations(processedCollabs || []);
      } catch (err) {
        setError(err);
        console.error("콜라보레이션 데이터 로딩 실패:", err);
        setCollaborations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollaborations();
  }, []);

  return { collaborations, isLoading, error };
};
