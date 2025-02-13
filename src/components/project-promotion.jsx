import React, { useState } from 'react';
import Button, { TYPES } from "./common/button";
import CustomModal, { VERSIONS } from "./common/modal/CustomModal";
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


const ProjectPromotion = () => {
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 12;

  // 예시 데이터
  const projects = Array(70).fill().map((_, index) => ({
    id: index + 1,
    title: `프로젝트 ${index + 1}`,
    description: '프로젝트에 대한 간단한 설명이 들어갑니다.',
    popularity: Math.floor(Math.random() * 100)
  }));

  // 검색어로만 프로젝트 필터링 (카테고리 필터링 제거)
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬된 프로젝트 목록
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.popularity - a.popularity;
    }
    return b.id - a.id;
  });

  // 상위 3개 프로젝트 (인기순일 때만)
  const topProjects = sortBy === 'popular' 
    ? sortedProjects.slice(0, 3) 
    : [];

  // 나머지 프로젝트
  const remainingProjects = sortBy === 'popular' 
    ? sortedProjects.slice(3) 
    : sortedProjects;

  // 전체 페이지 수 계산 (나머지 프로젝트 기준)
  const totalPages = Math.ceil(remainingProjects.length / itemsPerPage);

  // 현재 페이지의 프로젝트
  const displayedProjects = remainingProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // 정렬 방식이 변경될 때 페이지를 1로 리셋
  };

  const renderPageButtons = () => {
    const buttons = [];
    
    // 이전 페이지 버튼
    buttons.push(
      <ArrowButton
        key="prev"
        onClick={() => setCurrentPage(prev => prev === 1 ? totalPages : prev - 1)}
      >
        <ArrowIcon className="left" />
      </ArrowButton>
    );

    // 현재 페이지를 중심으로 5개의 페이지 번호 생성
    let pageNumbers = new Set();
    let startPage = currentPage - 2;
    
    // 5개의 페이지 번호 생성
    for (let i = 0; i < 5; i++) {
      let pageNum = startPage + i;
      
      // 페이지 번호가 범위를 벗어나면 순환
      if (pageNum <= 0) pageNum = totalPages + pageNum;
      if (pageNum > totalPages) pageNum = pageNum - totalPages;
      
      pageNumbers.add(pageNum);
    }

    // Set을 배열로 변환하고 정렬
    let pageArray = Array.from(pageNumbers).sort((a, b) => a - b);
    
    // 현재 페이지가 중앙에 오도록 배열 재정렬
    while (pageArray[2] !== currentPage) {
      const first = pageArray.shift();
      pageArray.push(first);
    }

    // 페이지 버튼 생성
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
  const [openModal, setOpenModal] = useState(false);

  // 버튼: 프로젝트 등록하기
  const buttonHandler = () => {
    setOpenModal(true);
  };
  const navigate = useNavigate();
  const movetoRegister = () => {
    navigate('project/promote/promote-registration');
    setOpenModal(flase);  
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
          <Button
            type={TYPES.PLUS}
            sign='true'
            text='프로젝트 등록하기'
            onClick={buttonHandler}
          />        
        </ButtonContainer>
      </SectionHeader>

      <CustomModal
        openModal={openModal} 
        closeModal={() => setOpenModal(false)}

        boldface='프로젝트 홍보를 등록하시겠습니까?'
        regular='프로젝트의 리더로 프로젝트 페이지를 개설하여 프로젝트를 등록할 수 있습니다.'
        text='개설하기'
        onClickHandler={movetoRegister}
        variant={VERSIONS.VER3}
      />

      {sortBy === 'popular' && currentPage === 1 && (
        <TopProjectsGrid>
          {topProjects.map((project, index) => (
            <TopProjectCard key={project.id}>
              <TopImagePlaceholder>
                <TopRankNumber>{index + 1}</TopRankNumber>
                <img src={project.imageUrl} alt={project.title} />
              </TopImagePlaceholder>
              <TopCardContent>
                <TopTitle>{project.title}</TopTitle>
                <TopDescription>{project.description}</TopDescription>
              </TopCardContent>
            </TopProjectCard>
          ))}
        </TopProjectsGrid>
      )}

      <ProjectGrid>
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id}>
            <ImagePlaceholder>
              <img src={project.imageUrl} alt={project.title} />
            </ImagePlaceholder>
            <CardContent>
              <Title>{project.title}</Title>
              <Description>{project.description}</Description>
            </CardContent>
          </ProjectCard>
        ))}
      </ProjectGrid>

      <PaginationContainer>
        {renderPageButtons()}
      </PaginationContainer>
    </PromotionContainer>
  );
};

export default ProjectPromotion;
