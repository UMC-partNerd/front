import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // 추가
import Button, { TYPES } from "./common/button";
import CustomModal, { VERSIONS } from "../components/common/modal/CustomModal";

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

import useProjectCollaboration from '../hooks/useProjectCollaboration';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWriteClick = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsModalOpen(true);  // 모달 열기
  };

  const movetoRegister = () => {
    navigate('/collaboration/collab-registration');
    setIsModalOpen(false);
  };

  const handleCardClick = (id) => {
    navigate(`/collaboration/${id}`);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

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

        <Button
            type={TYPES.PLUS}
            sign='true'
            text='협업글 작성하기'
            onClick={handleWriteClick}
        />
      </ButtonContainer>

      <CustomModal
        openModal={isModalOpen} 
        closeModal={() => setIsModalOpen(false)}  // 함수 참조로 수정
        boldface='협업을 등록하시겠습니까?'
        regular='협업의 리더로 콜라보 페이지를 개설하여 협업을 등록할 수 있습니다.'
        text='개설하기'
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
                {new Date(project.start_date).toLocaleDateString()} ~ 
                {new Date(project.end_date).toLocaleDateString()}
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