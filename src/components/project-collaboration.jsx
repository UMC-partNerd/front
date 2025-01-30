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
  WriteButton,
  CategoryContainer,
  CategoryButton,
  CategoryTitle
} from "../styled-components/styled-project-collaboration";


const ProjectCollaboration = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const itemsPerPage = 9;

  // 예시 데이터
  const projects = Array(50).fill().map((_, index) => ({
    title: '프로젝트 제목',
    deadline: '2025. 01. 04 ~ 01. 12',
    imageUrl: 'default-image-url.jpg',
    category: '웹/앱 개발'
  }));

  const categories = [
    '전체',
    '웹/앱 개발',
    '인공지능',
    '데이터',
    '디자인',
    '마케팅',
    '게임',
    '기타'
  ];

  // 카테고리 필터링
  const filteredProjects = selectedCategory === '전체'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  // 현재 페이지의 데이터만 선택
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const renderPageButtons = () => {
    const buttons = [];
    
    // 이전 페이지 버튼
    buttons.push(
      <ArrowButton
        key="prev"
        onClick={() => setCurrentPage(prev => prev === 1 ? totalPages : prev - 1)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#5084F5" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ transform: 'rotate(0deg)' }}
        >
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
      </ArrowButton>
    );

    // 페이지 번호 생성
    let pageNumbers = [];
    for (let i = -2; i <= 2; i++) {
      let pageNum = currentPage + i;
      
      if (pageNum <= 0) pageNum = totalPages + pageNum;
      if (pageNum > totalPages) pageNum = pageNum - totalPages;
      
      pageNumbers.push(pageNum);
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
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#5084F5" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
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
            key={category}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryContainer>

      <ButtonContainer>
        <SortContainer>
          <SortButton
            isActive={sortBy === 'latest'}
            onClick={() => setSortBy('latest')}
          >
            최신순
          </SortButton>
          <SortButton
            isActive={sortBy === 'deadline'}
            onClick={() => setSortBy('deadline')}
          >
            마감순
          </SortButton>
        </SortContainer>
        <WriteButton>협업글 작성하기</WriteButton>
      </ButtonContainer>

      <ProjectGrid>
        {currentProjects.map((project, index) => (
          <ProjectCard key={index}>
            <ImagePlaceholder>
              <img src={project.imageUrl} alt={project.title} />
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>{project.category}</CategoryBadge>
              <Title>{project.title}</Title>
              <Deadline>{project.deadline}</Deadline>
            </CardContent>
          </ProjectCard>
        ))}
      </ProjectGrid>

      <PaginationContainer>
        {renderPageButtons()}
      </PaginationContainer>
    </CollaborationContainer>
  );
};

export default ProjectCollaboration;
