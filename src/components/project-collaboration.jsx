import React, { useState, useEffect } from "react";
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
    sortBy,
    setSortBy,
    selectedCategories,
    setSelectedCategories,
    categories,
    loading,
    hasMorePages,
    availablePages,
    pageReferenceDTOList,
    fetchProjects,
    currentCursor,
    setCurrentCursor,
    prevLastReferenceDTO,
  } = useProjectCollaboration();

  // 버튼: 협업글 작성하기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchProjects({ cursor: currentCursor, page: currentPage });
  }, []);

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
    const pages = [];
    console.log(pageGroupStart);
    for (let i = pageGroupStart; i < pageGroupStart + availablePages; i++) {
      pages.push(i);
    }
    return pages;
  };

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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.png";
                  }}
                  loading="lazy"
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
              const prevCursor = prevLastReferenceDTO;
              console.log("이전 페이지 참고 DTO", prevCursor);
              fetchProjects({ cursor: prevCursor, page: prevGroupStart });
              setPageGroupStart(prevGroupStart);
              setCurrentPage(prevGroupStart);
            }}
          >
            <ArrowIcon className="left" />
          </ArrowButton>

          {/* 페이지 번호 버튼 */}
          {getPageNumbers().map((page) => {
            console.log("페이지 렌더링됨:", page); // 추가

            return (
              <PageButton
                key={page}
                $isActive={currentPage === page}
                onClick={() => {
                  console.log("현재 페이지 번호:", page);

                  const index = page - pageGroupStart;
                  const cursor = pageReferenceDTOList[index - 1];
                  console.log(pageReferenceDTOList[index - 1]);
                  setCurrentPage(page);
                  fetchProjects({ cursor: cursor, page: page });
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
                const nextCursor = pageReferenceDTOList[9];
                setPageGroupStart(nextGroupStart);
                setCurrentPage(nextGroupStart);
                if (nextCursor) {
                  console.log(nextCursor);
                  console.log(nextGroupStart);
                  fetchProjects({
                    cursor: nextCursor,
                    page: nextGroupStart,
                  });
                }
              }
            }}
          >
            <ArrowIcon className="right" />
          </ArrowButton>
        </PaginationContainer>
      </CollaborationContainer>
    </>
  );
};

export default ProjectCollaboration;
