import { useState, useEffect } from "react";
import { BASE_URL } from "../apis/config";
import axios from "axios";

// baseURL 설정
const api = axios.create({
  baseURL: BASE_URL,
});

// 카테고리 상수 업데이트
const categories = [
  { id: null, name: "전체" },
  { id: 1, name: "웹/앱 개발" },
  { id: 2, name: "인공지능" },
  { id: 3, name: "게임" },
  { id: 4, name: "데이터" },
  { id: 5, name: "기획/디자인" },
  { id: 6, name: "기타" },
];

export const usePartnerSearch = (
  selectedCategories = [null],
  order = "recent",
  page = 1
) => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // S3 pre-signed URL을 가져오는 함수
  const getImageUrl = async (profileImage) => {
    if (!profileImage) return "/default-image.jpg";
    if (profileImage.startsWith("http")) return profileImage; // 이미 URL인 경우 그대로 반환

    try {
      const response = `https://www.partnerd.site/${profileImage}`;
      return response;
    } catch (err) {
      console.error("이미지 URL 가져오기 실패:", err);
      return "/default-image.jpg";
    }
  };

  // 이미지 URL 처리를 위한 함수
  const processImageUrls = async (items) => {
    const processedItems = await Promise.all(
      items.map(async (item) => {
        const imageUrl = await getImageUrl(item.profileImage);
        return {
          ...item,
          profileImage: imageUrl,
        };
      })
    );
    return processedItems;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        const params = new URLSearchParams({
          page: page.toString(),
          sort: order === "recent" ? "latest" : "popular",
        });

        if (selectedCategories[0] !== null) {
          params.append("categoryID", selectedCategories[0]);
        }

        const response = await api.get(`/api/partnerd?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.isSuccess) {
          throw new Error(
            response.data.message || "데이터를 불러오는데 실패했습니다."
          );
        }

        if (isMounted) {
          const processedData = await processImageUrls(
            response.data.result.map((item) => {
              const matchingCategory = categories.find(
                (cat) => cat.id === item.categoryId
              );
              return {
                ...item,
                categoryName: matchingCategory ? matchingCategory.name : "기타",
              };
            })
          );
          setPartners(processedData);
        }
      } catch (err) {
        console.error("Error:", err);
        if (err.response?.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        }
        if (isMounted) {
          setError(err.message || "데이터를 불러오는데 실패했습니다.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
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
    categories, // categories 배열도 반환
  };
};

// 불필요한 상수 제거
export const SORT_OPTIONS = {
  RECENT: "recent",
  POPULAR: "popular",
};
