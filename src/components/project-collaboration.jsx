import React, { useState } from 'react';
import {
  PaginationContainer,
  ArrowButton,
  ArrowIcon,
  PageButton
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
  CategoryTitle
} from "../styled-components/styled-project-collaboration";


const ProjectCollaboration = () => {
  const {
    projects,
    currentPage,
    setCurrentPage,
    totalPages,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    categories,
    loading,
    getImageUrl
  } = useProjectCollaboration();

  const navigate = useNavigate();

  const handleWriteClick = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    pageNumbers.forEach(num => {
      buttons.push(
        <PageButton
          key={num}
          $isActive={currentPage === num}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </PageButton>
      );
    });

    // 다음 페이지 버튼
    buttons.push(
      <ArrowButton
        key="next"
        onClick={() => setCurrentPage(prev => prev === totalPages ? 1 : prev + 1)}
      >
        <ArrowIcon className="right" />
      </ArrowButton>
    );

    return buttons;
  };

  return (
    <CollaborationContainer>
      <CategoryTitle>카테고리</CategoryTitle>
      <CategoryContainer>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            isActive={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryContainer>

      <ButtonContainer>
        <SortContainer>
          <SortButton
            isActive={sortBy === 'createdAt'}
            onClick={() => setSortBy('createdAt')}
          >
            최신순
          </SortButton>
          <SortButton
            isActive={sortBy === 'endDate'}
            onClick={() => setSortBy('endDate')}
          >
            마감순
          </SortButton>
        </SortContainer>
        <WriteButton>협업글 작성하기</WriteButton>
      </ButtonContainer>

      <CustomModal
        openModal={openModal} 
        closeModal={() => setOpenModal(false)}

        boldface='협업을 등록하시겠습니까?'
        regular='협업의 리더로 콜라보 페이지를 개설하여 협업을 등록할 수 있습니다.'
        text='개설하기'
        onClickHandler={movetoRegister}
        variant={VERSIONS.VER3}
      />
      <ProjectGrid>
        {projects.map((project) => (
          <ProjectCard key={project.collabPostId}>
            <ImagePlaceholder>
              {project.imageKeyName && (
                <img 
                  src={getImageUrl(project.imageKeyName)} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-image.png'; // 기본 이미지 경로
                  }}
                />
              )}
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>
                {project.categoryDTOList.map(cat => cat.name).join(', ')}
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
        <ArrowButton
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ArrowIcon className="left" />
        </ArrowButton>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <PageButton
            key={page}
            $isActive={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageButton>
        ))}

        <ArrowButton
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <ArrowIcon className="right" />
        </ArrowButton>
      </PaginationContainer>
    </CollaborationContainer>
  );
};

export default ProjectCollaboration;