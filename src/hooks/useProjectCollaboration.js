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

  const fetchProjects = async (cursor = null) => {
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

      params.append("pageNum", currentPage);
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
          (currentPage - 1) % 10 === 0 &&
          Array.isArray(result.pageReferenceDTOList)
        ) {
          setHasMorePages(response.data.result.hasMorePages);
          setAvailablePages(response.data.result.availablePages);
          setPageReferenceDTOList(result.pageReferenceDTOList);
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
      }
    } catch (err) {
      console.error("❌ 프로젝트 데이터 조회 실패:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleArrowButtonClick = (direction) => {
    console.log(pageGroupStart);
    const newStartPage = pageGroupStart + direction * 10;
    console.log("newStartPage", newStartPage);
    if (newStartPage < 1) newStartPage = 1;

    console.log("페이지 캐싱", pageReferenceCache);
    console.log("페이지 캐싱", pageReferenceDTOList);
    setPageGroupStart(newStartPage);
    setCurrentPage(newStartPage);
    // ✅ `pageReferenceDTOList`에서 이전 페이지 정보 가져오기
    if (pageReferenceDTOList && newStartPage != 1) {
      const referenceData = pageReferenceCache[newStartPage - 10]; // 🔥 `pageNum - 2`는 이전 페이지 인덱스

      console.log("📌 페이지 참조 데이터:", referenceData[9]);

      // ✅ 이전 페이지의 마지막 데이터를 기준으로 새로운 페이지 요청
      setLastId(referenceData[9].lastId || null);
      setLastEndDate(referenceData[9].lastEndDate || null);
      setLastCreatedAt(referenceData[9].lastCreatedAt || null);
    }
  };

  const handlePageClick = (pageNum) => {
    console.log(`📌 페이지 클릭: ${pageNum}`);

    // ✅ 첫 번째 페이지 요청 시 `lastEndDate`, `lastCreatedAt`, `lastId` 초기화
    if (pageNum % 10 === 1) {
      console.log(pageGroupStart);
      console.log(pageReferenceCache[pageGroupStart - 10]);
      let pageReferenceCacheList = pageReferenceCache[pageGroupStart - 10];
      setLastId(pageReferenceCacheList[9].lastId);
      setLastCreatedAt(pageReferenceCacheList[9].lastCreatedAt);
      setLastEndDate(pageReferenceCacheList[9].lastEndDate);
      setCurrentPage(pageNum);
      return;
    }

    const referenceId = pageNum % 10 != 0 ? (pageNum % 10) - 2 : 8;
    console.log(referenceId);
    console.log(pageReferenceDTOList);

    // ✅ `pageReferenceDTOList`에서 이전 페이지 정보 가져오기
    if (pageReferenceDTOList) {
      const referenceData = pageReferenceDTOList[referenceId]; // 🔥 `pageNum - 2`는 이전 페이지 인덱스

      console.log("📌 페이지 참조 데이터:", referenceData);

      // ✅ 이전 페이지의 마지막 데이터를 기준으로 새로운 페이지 요청
      setLastId(referenceData.lastId || null);
      setLastEndDate(referenceData.lastEndDate || null);
      setLastCreatedAt(referenceData.lastCreatedAt || null);
    }

    setCurrentPage(pageNum);
  };

  useEffect(() => {
    fetchProjects(currentCursor);
  }, [currentPage, sortBy, selectedCategories]);

  const getPageNumbers = (currentPage, availablePages) => {
    console.log("현재페이지", currentPage);
    console.log("표시할수있는페이지", availablePages);

    const maxPagesToShow = 10; // ✅ 한 번에 표시할 최대 페이지 수
    if (availablePages < 1) return [1]; // ✅ 최소 1페이지 보장
    let startPage = currentPage;
    let endPage = Math.min(
      currentPage + availablePages - 1,
      currentPage + maxPagesToShow - 1
    );

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };
  useEffect(() => {
    if (pageReferenceDTOList != null) {
      setTimeout(() => {
        // ✅ setTimeout을 사용하여 상태 업데이트 후 실행
        setPageReferenceCache((prevCache) => ({
          ...prevCache,
          [pageGroupStart]: pageReferenceDTOList, // ✅ 최신 pageGroupStart 반영
        }));
        console.log(
          `✅ 캐시 저장: pageGroupStart=${pageGroupStart}, 데이터=`,
          pageReferenceDTOList
        );
      }, 0);
    }
  }, [pageReferenceDTOList, pageGroupStart]); // ✅ pageGroupStart를 의존성에 추가

  useEffect(() => {
    console.log("현재페이지", currentPage);
    console.log("표시할수있는페이지", availablePages);
    const maxPagesToShow = 10;
    if (availablePages < 1) return;

    let startPage = pageGroupStart;
    let endPage = Math.min(
      startPage + availablePages - 1,
      startPage + maxPagesToShow - 1
    );

    setPageNumbers(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
    console.log(pageNumbers);
  }, [pageGroupStart, availablePages]);

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
  };
};

export default useProjectCollaboration;
