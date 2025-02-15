import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PaginationContainer,
  ArrowButton,
  ArrowIcon,
  PageButton
} from "../styled-components/styled-common";

import {
  Container as PromotionContainer,
  ProjectTypeContainer,
  ProjectTypeButton,
  SearchContainer,
  SearchInput,
  SectionHeader,
  SectionTitle,
  ButtonContainer,
  SortContainer,
  SortButton,
  RegisterButton,
  ProjectGrid,
  ProjectCard,
  ImagePlaceholder,
  CardContent,
  Title,
  Description,
  TopProjectsGrid,
  TopProjectCard,
  TopImagePlaceholder,
  TopRankNumber,
  TopCardContent,
  TopTitle,
  TopDescription,
} from "../styled-components/styled-project-promotion";

import useProjectPromotion from '../hooks/useProjectPromotion';

const ProjectPromotion = () => {
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    topProjects,
    projects,
    totalPages,
    loading,
    fetchTopProjects,
    fetchProjects,
    searchProjects
  } = useProjectPromotion();

  const navigate = useNavigate();

  useEffect(() => {
    if (sortBy === 'popular' && currentPage === 1) {
      fetchTopProjects();
    }
  }, [sortBy]);

  useEffect(() => {
    if (searchTerm) {
      searchProjects(currentPage, searchTerm);
    } else {
      fetchProjects(currentPage, sortBy);
    }
  }, [currentPage, sortBy, searchTerm]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleRegisterClick = () => {
    navigate('/project/promote/register');
  };

  const handleCardClick = (promotionProjectId) => {
    navigate(`/project/promote/${promotionProjectId}`);
  };

  const renderPageButtons = () => {
    const buttons = [];
    
    buttons.push(
      <ArrowButton
        key="prev"
        onClick={() => setCurrentPage(prev => prev === 1 ? totalPages : prev - 1)}
      >
        <ArrowIcon className="left" />
      </ArrowButton>
    );

    let pageNumbers = new Set();
    let startPage = currentPage - 2;
    
    for (let i = 0; i < 5; i++) {
      let pageNum = startPage + i;
      
      if (pageNum <= 0) pageNum = totalPages + pageNum;
      if (pageNum > totalPages) pageNum = pageNum - totalPages;
      
      pageNumbers.add(pageNum);
    }

    let pageArray = Array.from(pageNumbers).sort((a, b) => a - b);
    
    while (pageArray[2] !== currentPage) {
      const first = pageArray.shift();
      pageArray.push(first);
    }

    pageArray.forEach(num => {
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
    <PromotionContainer>
      <ProjectTypeContainer>
        <ProjectTypeButton 
          $isActive={false}
          onClick={() => window.location.href = '/project/recruit'}
        >
          프로젝트 모집하기
        </ProjectTypeButton>
        <ProjectTypeButton 
          $isActive={true}
          onClick={() => window.location.href = '/project/promote'}
        >
          프로젝트 홍보하기
        </ProjectTypeButton>
      </ProjectTypeContainer>

      <SearchContainer>
        <SearchInput
          placeholder="어떤 프로젝트를 찾으시나요?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <SectionHeader>
        <SectionTitle>
          {sortBy === 'popular' ? '지금 인기있는 프로젝트' : '최근 등록된 프로젝트'}
        </SectionTitle>
        <ButtonContainer>
          <SortContainer>
            <SortButton
              $isActive={sortBy === 'popular'}
              onClick={() => handleSortChange('popular')}
            >
              인기순
            </SortButton>
            <SortButton
              $isActive={sortBy === 'latest'}
              onClick={() => handleSortChange('latest')}
            >
              최신순
            </SortButton>
          </SortContainer>
          <RegisterButton onClick={handleRegisterClick}>프로젝트 등록하기</RegisterButton>
        </ButtonContainer>
      </SectionHeader>

      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          {sortBy === 'popular' && currentPage === 1 && topProjects.length > 0 && (
            <TopProjectsGrid>
              {topProjects.map((project, index) => (
                <TopProjectCard 
                  key={project.promotionProjectId}
                  onClick={() => handleCardClick(project.promotionProjectId)}
                >
                  <TopImagePlaceholder>
                    <TopRankNumber>{index + 1}</TopRankNumber>
                    <img src={project.imageUrl} alt={project.title} />
                  </TopImagePlaceholder>
                  <TopCardContent>
                    <TopTitle>{project.title}</TopTitle>
                    <TopDescription>{project.intro}</TopDescription>
                  </TopCardContent>
                </TopProjectCard>
              ))}
            </TopProjectsGrid>
          )}

          <ProjectGrid>
            {projects.map((project) => (
              <ProjectCard 
                key={project.promotionProjectId}
                onClick={() => handleCardClick(project.promotionProjectId)}
              >
                <ImagePlaceholder>
                  <img src={project.imageUrl} alt={project.title} />
                </ImagePlaceholder>
                <CardContent>
                  <Title>{project.title}</Title>
                  <Description>{project.intro}</Description>
                </CardContent>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </>
      )}

      <PaginationContainer>
        {renderPageButtons()}
      </PaginationContainer>
    </PromotionContainer>
  );
};

export default ProjectPromotion;
