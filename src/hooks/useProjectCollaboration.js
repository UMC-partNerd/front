import { useState, useEffect } from "react";
import axios from "axios";

const useProjectCollaboration = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("endDate");
  const [selectedCategories, setSelectedCategories] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  const [lastEndDate, setLastEndDate] = useState(null);
  const [lastCreatedAt, setLastCreatedAt] = useState(null);
  const [lastId, setLastId] = useState(null);

  const api = axios.create({
    baseURL: "https://api.partnerd.site", // 실제 백엔드 서버 URL로 변경
  });

  const categories = [
    { id: null, name: "전체" },
    { id: 1, name: "웹/앱 개발" },
    { id: 2, name: "인공지능" },
    { id: 3, name: "데이터" },
    { id: 4, name: "디자인" },
    { id: 5, name: "마케팅" },
    { id: 6, name: "게임" },
    { id: 7, name: "기타" },
  ];

  const getImageUrl = async (keyName) => {
    if (!keyName) {
      console.log("🚫 이미지 키 없음:", keyName);
      return null;
    }

    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.log("🚫 JWT 토큰이 없습니다");
      return null;
    }

    try {
      console.log("📡 이미지 URL 요청 keyName:", keyName);
      const response = await api.get(
        `/api/s3/preSignedUrl?keyName=${keyName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("✅ 이미지 URL 응답:", {
        keyName,
        isSuccess: response.data.isSuccess,
        cloudFrontUrl: response.data.result?.cloudFrontUrl,
      });

      if (response.data.isSuccess) {
        return response.data.result.cloudFrontUrl;
      }
      return null;
    } catch (err) {
      console.error("❌ 이미지 URL 조회 실패:", {
        keyName,
        error: err.message,
      });
      return null;
    }
  };

  const fetchProjects = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.log("🚫 JWT 토큰이 없습니다");
      return;
    }

    setLoading(true);
    try {
      // ✅ 카테고리 선택 여부 확인
      const isCategorySelected = !selectedCategories.includes(null);

      // ✅ 카테고리를 선택했을 경우, `categories` 파라미터 추가
      const categoryParam = isCategorySelected
        ? selectedCategories.join(",")
        : null;

      // ✅ No-Offset 방식으로 요청할 파라미터 설정
      const params = new URLSearchParams({
        pageNum: currentPage,
        sortBy: sortBy,
        size: 9, // 한 페이지당 데이터 개수 (백엔드에서 처리할 값)
      });

      // ✅ 첫 페이지가 아닌 경우, lastEndDate / lastCreatedAt / lastId 포함
      if (currentPage > 1) {
        if (sortBy === "endDate" && lastEndDate)
          params.append("lastEndDate", lastEndDate);
        if (sortBy === "createdAt" && lastCreatedAt)
          params.append("lastCreatedAt", lastCreatedAt);
        if (lastId) params.append("lastId", lastId);
      }
      // ✅ 카테고리가 선택된 경우 `categories` 파라미터 추가
      if (isCategorySelected) {
        params.append("categories", categoryParam);
      }

      // ✅ 카테고리 여부에 따라 URL 설정
      const baseURL = isCategorySelected
        ? `${import.meta.env.VITE_API_BASE_URL}/api/collabPosts/categories`
        : `${import.meta.env.VITE_API_BASE_URL}/api/collabPosts`;

      const url = `${baseURL}?${params.toString()}`;

      console.log("📡 프로젝트 데이터 요청:", url);
      const response = await api.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      console.log("✅ 프로젝트 데이터 응답:", response.data);

      if (response.data.isSuccess) {
        const result = response.data.result;
        const projectsArray = Array.isArray(result.data) ? result.data : [];

        console.log(
          "📦 전체 프로젝트 목록:",
          projectsArray.map((p) => ({
            title: p.title,
            mainImgKeyname: p.mainImgKeyname,
          }))
        );
        // ✅ `pageReferenceDTOList` 업데이트하여 다음 페이지 요청 시 사용
        if (result.pageReferenceDTOList.length > 0) {
          setPageReferenceDTOList(result.pageReferenceDTOList);
        }

        const projectsWithImages = await Promise.all(
          projectsArray.map(async (project) => {
            console.log("🔄 프로젝트 이미지 처리 시작:", {
              title: project.title,
              mainImgKeyname: project.mainImgKeyname,
            });

            const imageUrl = await getImageUrl(project.mainImgKeyname);

            console.log("✅ 프로젝트 이미지 처리 완료:", {
              title: project.title,
              mainImgKeyname: project.mainImgKeyname,
              imageUrl: imageUrl,
            });

            return {
              ...project,
              imageUrl: imageUrl || "/default-image.png",
            };
          })
        );

        console.log("✅ 최종 프로젝트 데이터:", projectsWithImages);
        setProjects(projectsWithImages);
        // ✅ 페이지네이션 정보 업데이트
        setTotalPages(result.availablePages);
        setHasMorePages(result.hasMorePages);
        setIsFirst(result.isFirst);
        setIsLast(result.isLast);
      }
    } catch (err) {
      console.error("❌ 프로젝트 데이터 조회 실패:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, sortBy, selectedCategories]);

  return {
    projects,
    currentPage,
    setCurrentPage,
    totalPages,
    sortBy,
    setSortBy,
    selectedCategories,
    setSelectedCategories,
    categories,
    loading,
    error,
    imageLoading,
  };
};

export default useProjectCollaboration;
