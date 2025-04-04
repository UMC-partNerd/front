import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import Button, { TYPES } from "./common/button";
import CustomModal, { VERSIONS } from "../components/common/modal/CustomModal";
import Banner from "../components/common/banner/Banner";

import {
  PaginationContainer,
  ArrowButton,
  ArrowIcon,
  PageButton,
} from "../styled-components/styled-common";

import {
  Container as CollaborationContainer,
  ProjectGrid,
  ProjectCard,
  ImagePlaceholder,
  CardContent,
  CategoryBadge,
  Title,
  Deadline,
  SortContainer,
  SortButton,
  ButtonContainer,
  CategoryContainer,
  CategoryButton,
  CategoryTitle,
} from "../styled-components/styled-project-collaboration";

import useProjectCollaboration from "../hooks/useProjectCollaboration";

const ProjectCollaboration = () => {
  const {
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
    hasMorePages,
    availablePages,
    pageReferenceDTOList,
    getImageUrl,
    fetchProjects,
    currentCursor,
    setCurrentCursor,
  } = useProjectCollaboration();

  // 버튼: 협업글 작성하기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const navigate = useNavigate();

  const handleWriteClick = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    setIsModalOpen(true); // 모달 열기
  };

  const movetoRegister = () => {
    navigate("/collaboration/collab-registration");
    setIsModalOpen(false);
  };

  const handleCardClick = (id) => {
    navigate(`/collaboration/${id}`);
  };
  const getPageNumbers = () => {
    console.log("pageGroupStart", pageGroupStart);
    const groupSize = 10;
    const pages = [];
    for (
      let i = pageGroupStart;
      i < pageGroupStart + groupSize && i - groupSize <= availablePages;
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  /** const getPageNumbers = (current, total) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let pages = [];
    let start = current - 2;

    // 시작 페이지가 1보다 작을 경우 (예: current가 1 또는 2일 때)
    if (start < 1) {
      start = total + start; // 끝에서부터 시작
      pages = Array.from({ length: 5 }, (_, i) => {
        let page = start + i;
        if (page > total) {
          page = page - total;
        }
        return page;
      });
    }
    // 끝 페이지가 total보다 클 경우 (예: current가 total 또는 total-1일 때)
    else if (current + 2 > total) {
      pages = Array.from({ length: 5 }, (_, i) => {
        let page = start + i;
        if (page > total) {
          page = page - total;
        }
        return page;
      });
    }
    // 일반적인 경우
    else {
      pages = Array.from({ length: 5 }, (_, i) => start + i);
    }

    return pages;
  }; **/

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Banner
        largeText="콜라보레이션"
        smallText="협업 글을 올리고 다른 동아리와 콜라보레이션을 진행해보세요"
      />
      <CollaborationContainer>
        <CategoryTitle>카테고리</CategoryTitle>
        <CategoryContainer>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              isActive={selectedCategories.includes(category.id)}
              onClick={() => {
                if (category.id === null) {
                  // '전체' 카테고리 클릭 시 무조건 [null]로 설정
                  setSelectedCategories([null]);
                } else {
                  // 이미 선택된 카테고리면 제거
                  if (selectedCategories.includes(category.id)) {
                    const newCategories = selectedCategories.filter(
                      (id) => id !== category.id
                    );
                    // 모든 카테고리가 해제되면 자동으로 '전체' 선택
                    setSelectedCategories(
                      newCategories.length === 0 ? [null] : newCategories
                    );
                  } else {
                    // 새로운 카테고리 추가 시 '전체' 카테고리는 제거
                    setSelectedCategories([
                      ...selectedCategories.filter((id) => id !== null),
                      category.id,
                    ]);
                  }
                }
              }}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoryContainer>

        <ButtonContainer>
          <SortContainer>
            <SortButton
              isActive={sortBy === "createdAt"}
              onClick={() => setSortBy("createdAt")}
            >
              최신순
            </SortButton>
            <SortButton
              isActive={sortBy === "endDate"}
              onClick={() => setSortBy("endDate")}
            >
              마감순
            </SortButton>
          </SortContainer>

          <Button
            type={TYPES.PLUS}
            sign="true"
            text="협업글 작성하기"
            onClick={handleWriteClick}
          />
        </ButtonContainer>

        <CustomModal
          openModal={isModalOpen}
          closeModal={() => setIsModalOpen(false)} // 함수 참조로 수정
          boldface="협업을 등록하시겠습니까?"
          regular="협업의 리더로 콜라보 페이지를 개설하여 협업을 등록할 수 있습니다."
          text="개설하기"
          onClickHandler={movetoRegister}
          variant={VERSIONS.VER3}
        />
        <ProjectGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.collabPostId}
              onClick={() => handleCardClick(project.collabPostId)}
            >
              <ImagePlaceholder>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy" // 💥 여기 추가!
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.png";
                  }}
                />
              </ImagePlaceholder>
              <CardContent>
                <CategoryBadge>
                  {project.categoryDTOList.map((cat) => cat.name).join(", ")}
                </CategoryBadge>
                <Title>{project.title}</Title>
                <Deadline>
                  {new Date(project.startDate).toLocaleDateString()} ~
                  {new Date(project.endDate).toLocaleDateString()}
                </Deadline>
              </CardContent>
            </ProjectCard>
          ))}
        </ProjectGrid>

        <PaginationContainer>
          {/* ◀️ 이전 그룹 */}
          <ArrowButton
            onClick={() => {
              const prevGroupStart = pageGroupStart - 10;
              if (prevGroupStart >= 1) {
                const prevCursor = pageReferenceDTOList[prevGroupStart - 2];
                setPageGroupStart(prevGroupStart);
                setCurrentPage(prevGroupStart);
                if (prevCursor) setCurrentCursor(prevCursor);
              }
            }}
            disabled={pageGroupStart === 1}
          >
            <ArrowIcon className="left" />
          </ArrowButton>

          {/* 페이지 번호 버튼 */}
          {getPageNumbers().map((page) => {
            console.log(page);
            const cursor = pageReferenceDTOList[page - 2];
            return (
              <PageButton
                key={page}
                $isActive={currentPage === page}
                onClick={() => {
                  setCurrentPage(page);
                  if (cursor) {
                    setCurrentCursor(cursor);
                  }
                }}
              >
                {page}
              </PageButton>
            );
          })}

          {/* ▶️ 다음 그룹 */}
          <ArrowButton
            onClick={() => {
              const nextGroupStart = pageGroupStart + 10;
              if (hasMorePages) {
                const nextCursor = pageReferenceDTOList[nextGroupStart - 2];
                setPageGroupStart(nextGroupStart);
                setCurrentPage(nextGroupStart);
                if (nextCursor) setCurrentCursor(nextCursor);
              }
            }}
            disabled={!hasMorePages}
          >
            <ArrowIcon className="right" />
          </ArrowButton>
        </PaginationContainer>
      </CollaborationContainer>
    </>
  );
};

export default ProjectCollaboration;
