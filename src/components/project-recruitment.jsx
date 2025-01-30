import React, { useState } from 'react';

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

const ProjectRecruitment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [projectType, setProjectType] = useState('recruit');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 12;

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

  // 예시 데이터
  const projects = Array(50).fill().map((_, index) => ({
    title: 'UMC',
    description: 'UMC는 IT연합 동아리입니다.',
    category: ['Web', 'Server', 'iOS', 'Android', 'Design', 'PM', 'AI/데이터', '게임 개발', '기타'][Math.floor(Math.random() * 9)],
    status: index % 2 === 0 ? 'recruiting' : 'completed',
    imageUrl: 'default-image-url.jpg'
  }));

  // 검색어, 상태, 카테고리로 프로젝트 필터링
  const filteredProjects = projects.filter(project => {
    const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = selectedStatus === '전체' ? true
      : selectedStatus === '모집중' ? project.status === 'recruiting'
      : selectedStatus === '모집완료' ? project.status === 'completed'
      : true;
    const categoryMatch = selectedCategory === '전체' ? true
      : project.category === selectedCategory;

    return searchMatch && statusMatch && categoryMatch;
  });

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

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
            setCurrentPage(totalPages);
          } else {
            setCurrentPage(prev => prev - 1);
          }
        }}
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

    // 순환 구조의 페이지 버튼 생성
    const getCircularPages = () => {
      const visiblePages = totalPages <= 5 ? totalPages : 5; // 표시할 페이지 수
      const pages = [];
      
      for (let i = 0; i < visiblePages; i++) {
        let pageNum = currentPage + i - Math.floor(visiblePages / 2);
        
        // 페이지 번호가 범위를 벗어날 경우 순환
        if (pageNum <= 0) {
          pageNum = totalPages + pageNum;
        } else if (pageNum > totalPages) {
          pageNum = pageNum - totalPages;
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
          if (currentPage === totalPages) {
            setCurrentPage(1);
          } else {
            setCurrentPage(prev => prev + 1);
          }
        }}
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
                isActive={selectedCategory === category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryGroup>
        </FilterContainer>
        <RegisterButton>글 등록하기</RegisterButton>
      </SearchContainer>

      <PartnerGrid>
        {currentProjects.map((project, index) => (
          <PartnerCard key={index}>
            <ImagePlaceholder>
              <RecruitmentStatus status={project.status}>
                {project.status === 'recruiting' ? '모집중' : '모집완료'}
              </RecruitmentStatus>
              <img src={project.imageUrl} alt={project.title} />
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>{project.category}</CategoryBadge>
              <Title>{project.title}</Title>
              <Description>{project.description}</Description>
            </CardContent>
          </PartnerCard>
        ))}
      </PartnerGrid>

      <PaginationContainer>
        {renderPageButtons()}
      </PaginationContainer>
    </RecruitmentContainer>
  );
};

export default ProjectRecruitment;
