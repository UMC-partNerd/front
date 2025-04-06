import { useState, useEffect } from "react";
import api from "../api/api";

import axios from "axios";

// 카테고리 목록
const categories = [
  { id: null, name: "전체" },
  { id: 1, name: "웹/앱 개발" },
  { id: 2, name: "인공지능" },
  { id: 3, name: "게임" },
  { id: 4, name: "데이터" },
  { id: 5, name: "기획/디자인" },
  { id: 6, name: "기타" },
];

// 정렬 옵션 상수
export const SORT_OPTIONS = {
  RECENT: "recent",
  POPULAR: "popular",
};

export const usePartnerSearch = (
  selectedCategories = [null],
  order = SORT_OPTIONS.RECENT,
  page = 1
) => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 프로필 이미지 URL 반환
  const getImageUrl = (profileImage) => {
    if (!profileImage) return "/default-image.jpg";
    if (profileImage.startsWith("http")) return profileImage;
    return `https://www.partnerd.site/${profileImage}`;
  };

  // 결과 데이터 가공
  const processPartnerData = (items) => {
    return items.map((item) => {
      const category = categories.find((cat) => cat.id === item.categoryId);
      return {
        ...item,
        categoryName: category ? category.name : "기타",
        profileImage: getImageUrl(item.profileImage),
      };
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchPartners = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          sort: order === SORT_OPTIONS.RECENT ? "latest" : "popular",
        });

        if (selectedCategories[0] !== null) {
          params.append("categoryID", selectedCategories[0]);
        }

        const { data } = await api.get(`/api/partnerd?${params}`);

        if (!data.isSuccess) {
          throw new Error(data.message || "데이터를 불러오는데 실패했습니다.");
        }

        if (isMounted) {
          const processed = processPartnerData(data.result);
          setPartners(processed);
        }
      } catch (err) {
        console.error("❌ 파트너 조회 실패:", err);
        if (err.response?.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        }
        if (isMounted) {
          setError(err.message || "예상치 못한 오류가 발생했습니다.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPartners();

    return () => {
      isMounted = false;
    };
  }, [selectedCategories, order, page]);

  return {
    partners,
    isLoading,
    error,
    categories,
  };
};
