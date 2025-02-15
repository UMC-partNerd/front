import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PaginationContainer,
  ArrowButton,
  ArrowIcon,
  PageButton
} from "../styled-components/styled-common";

import {
  Container as RecruitmentContainer,
  PartnerGrid,
  PartnerCard,
  ImagePlaceholder,
  CardContent,
  Badge,
  Title,
  Description,
  SortButtonGroup,
  SortContainer,
  SortButton,
  ButtonContainer,
  RegisterButton,
  CategoryContainer,
  CategoryButton,
  CategoryTitle,
  SearchContainer,
  CategoryBadge,
  RecruitmentStatus,
  ProjectTypeContainer,
  ProjectTypeButton,
  SearchInput,
  FilterContainer,
  CategoryGroup
} from "../styled-components/styled-project-recruitment";

import useProjectRecruitment from '../hooks/useProjectRecruitment';

const ProjectRecruitment = () => {
  const {
    projects,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedStatus,
    setSelectedStatus,
    selectedCategories,
    setSelectedCategories,
    searchTerm,
    setSearchTerm,
    loading
  } = useProjectRecruitment();

  const navigate = useNavigate();

  const statusCategories = ['전체', '모집중', '모집완료'];
  const projectCategories = [
    '전체',
    'Web',
    'Server',
    'iOS',
    'Android',
    'Design',
    'PM',
    'AI/데이터',
    '게임 개발',
    '기타'
  ];

  const itemsPerPage = 12;

  // 검색어, 상태, 카테고리로 프로젝트 필터링
  const filteredProjects = projects.filter(project => {
    const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = selectedStatus === '전체' ? true
      : selectedStatus === '모집중' ? project.projectStatus === '모집중'
      : selectedStatus === '모집완료' ? project.projectStatus === '모집완료'
      : true;
    const categoryMatch = selectedCategories.includes('전체') ? true
      : selectedCategories.every(category => project.categoryDTOList.some(c => c.name === category));

    return searchMatch && statusMatch && categoryMatch;
  });

  // 전체 페이지 수 계산
  const totalFilteredPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // 현재 페이지의 데이터
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 버튼 렌더링 로직 수정
  const renderPageButtons = () => {
    const buttons = [];
    
    // 이전 페이지 버튼
    buttons.push(
      <ArrowButton
        key="prev"
        onClick={() => {
          if (currentPage === 1) {
            setCurrentPage(totalFilteredPages);
          } else {
            setCurrentPage(prev => prev - 1);
          }
        }}
      >
        <ArrowIcon className="left" />
      </ArrowButton>
    );

    // 순환 구조의 페이지 버튼 생성
    const getCircularPages = () => {
      const visiblePages = totalFilteredPages <= 5 ? totalFilteredPages : 5; // 표시할 페이지 수
      const pages = [];
      
      for (let i = 0; i < visiblePages; i++) {
        let pageNum = currentPage + i - Math.floor(visiblePages / 2);
        
        // 페이지 번호가 범위를 벗어날 경우 순환
        if (pageNum <= 0) {
          pageNum = totalFilteredPages + pageNum;
        } else if (pageNum > totalFilteredPages) {
          pageNum = pageNum - totalFilteredPages;
        }
        
        pages.push(pageNum);
      }
      
      return pages;
    };

    // 페이지 버튼 생성
    const circularPages = getCircularPages();
    circularPages.forEach(pageNum => {
      buttons.push(
        <PageButton
          key={pageNum}
          $isActive={currentPage === pageNum}
          onClick={() => setCurrentPage(pageNum)}
        >
          {pageNum}
        </PageButton>
      );
    });

    // 다음 페이지 버튼
    buttons.push(
      <ArrowButton
        key="next"
        onClick={() => {
          if (currentPage === totalFilteredPages) {
            setCurrentPage(1);
          } else {
            setCurrentPage(prev => prev + 1);
          }
        }}
      >
        <ArrowIcon className="right" />
      </ArrowButton>
    );

    return buttons;
  };

  const handleRegisterClick = () => {
    navigate('/project/recruit/register');
  };

  const handleCardClick = (projectId) => {
    navigate(`/project/recruit/${projectId}`);
  };

  return (
    <RecruitmentContainer>
      <ProjectTypeContainer>
        <ProjectTypeButton 
          isActive={true}
          onClick={() => window.location.href = '/project/recruit'}
        >
          프로젝트 모집하기
        </ProjectTypeButton>
        <ProjectTypeButton 
          isActive={false}
          onClick={() => window.location.href = '/project/promote'}
        >
          프로젝트 홍보하기
        </ProjectTypeButton>
      </ProjectTypeContainer>

      <SearchContainer>
        <FilterContainer>
          <SearchInput
            placeholder="어떤 프로젝트를 찾으시나요?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CategoryGroup>
            {statusCategories.map(status => (
              <CategoryButton
                key={status}
                isActive={selectedStatus === status}
                onClick={() => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                }}
              >
                {status}
              </CategoryButton>
            ))}
          </CategoryGroup>
          <CategoryGroup>
            {projectCategories.map(category => (
              <CategoryButton
                key={category}
                isActive={selectedCategories.includes(category)}
                onClick={() => {
                  if (category === '전체') {
                    setSelectedCategories(['전체']);
                  } else {
                    const newCategories = selectedCategories.includes(category)
                      ? selectedCategories.filter(c => c !== category)
                      : [...selectedCategories.filter(c => c !== '전체'), category];
                    setSelectedCategories(newCategories.length ? newCategories : ['전체']);
                  }
                  setCurrentPage(1);
                }}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryGroup>
        </FilterContainer>
        <RegisterButton onClick={handleRegisterClick}>글 등록하기</RegisterButton>
      </SearchContainer>

      <PartnerGrid>
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          currentProjects.map((project) => (
            <PartnerCard 
              key={project.projectId} 
              onClick={() => handleCardClick(project.projectId)}
            >
              <ImagePlaceholder>
                <RecruitmentStatus status={project.projectStatus === '모집중' ? 'recruiting' : 'completed'}>
                  {project.projectStatus}
                </RecruitmentStatus>
                {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
              </ImagePlaceholder>
              <CardContent>
                {project.categoryDTOList.map(category => (
                  <CategoryBadge key={category.id}>{category.name}</CategoryBadge>
                ))}
                <Title>{project.title}</Title>
                <Description>{project.intro}</Description>
              </CardContent>
            </PartnerCard>
          ))
        )}
      </PartnerGrid>

      <PaginationContainer>
        {renderPageButtons()}
      </PaginationContainer>
    </RecruitmentContainer>
  );
};

export default ProjectRecruitment;
