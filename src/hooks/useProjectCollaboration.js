import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/api";

const useProjectCollaboration = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("endDate");
  const [selectedCategories, setSelectedCategories] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState({});
  const [hasMorePages, setHasMorePages] = useState(false);
  const [availablePages, setAvailablePages] = useState(10);
  const [pageReferenceDTOList, setPageReferenceDTOList] = useState([]);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [prevLastReferenceDTO, setPreveLastReferenceDTO] = useState(null);

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

  const getImageUrl = (keyName) => {
    if (!keyName) {
      console.log("🚫 이미지 키 없음:", keyName);
      return null;
    }
    return `https://www.partnerd.site/${keyName}`;
  };

  const fetchProjects = async ({
    cursor = null,
    page = null,
    categories = selectedCategories,
  } = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const isAllCategory =
        selectedCategories.length === 1 && selectedCategories[0] === null;
      if (!isAllCategory) {
        const categoryParam = selectedCategories.includes(null)
          ? categories
              .filter((cat) => cat.id !== null)
              .map((cat) => cat.id)
              .join(",")
          : selectedCategories.join(",");
        params.append("categories", categoryParam);
      }
      console.log(cursor);
      console.log(page);
      params.append("pageNum", page);
      params.append("sortBy", sortBy);

      if (cursor) {
        console.log(cursor);
        if (cursor.lastId) params.append("lastId", cursor.lastId);
        if (cursor.lastEndDate)
          params.append("lastEndDate", cursor.lastEndDate);
      }

      const url = isAllCategory
        ? `/api/collabPosts?${params.toString()}`
        : `/api/collabPosts/categories?${params.toString()}`;

      console.log("📡 프로젝트 데이터 요청:", url);

      const response = await api.get(url, {});

      console.log("✅ 프로젝트 데이터 응답:", response.data);

      if (response.data.isSuccess) {
        const result = response.data.result;
        if (
          (page - 1) % 10 === 0 &&
          Array.isArray(result.pageReferenceDTOList)
        ) {
          console.log(result.pageReferenceDTOList);
          setHasMorePages(result.hasMorePages);
          setAvailablePages(result.availablePages);
          setPageReferenceDTOList(result.pageReferenceDTOList);
          setPreveLastReferenceDTO(result.pageReferenceDTOList[9]);
        }

        console.log(hasMorePages);
        const projectsArray = Array.isArray(result.data) ? result.data : [];

        console.log(
          "📦 전체 프로젝트 목록:",
          projectsArray.map((p) => ({
            title: p.title,
            mainImgKeyname: p.mainImgKeyname,
          }))
        );

        const projectsWithImages = projectsArray.map((project) => ({
          ...project,
          imageUrl: getImageUrl(project.mainImgKeyname) || "/default-image.png",
        }));

        console.log("✅ 최종 프로젝트 데이터:", projectsWithImages);
        setProjects(projectsWithImages);
        setTotalPages(result.totalPage || 1);
      }
    } catch (err) {
      console.error("❌ 프로젝트 데이터 조회 실패:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    currentPage,
    setCurrentPage,
    availablePages,
    totalPages,
    sortBy,
    setSortBy,
    selectedCategories,
    setSelectedCategories,
    hasMorePages,
    categories,
    loading,
    error,
    imageLoading,
    pageReferenceDTOList,
    fetchProjects,
    currentCursor,
    setCurrentCursor,
    prevLastReferenceDTO,
  };
};

export default useProjectCollaboration;
