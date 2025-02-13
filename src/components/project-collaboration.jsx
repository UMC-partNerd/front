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
        <ArrowIcon className="left" />
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
        <ArrowIcon className="right" />
      </ArrowButton>
    );

    return buttons;
  };

  const [openModal, setOpenModal] = useState(false);

  // 버튼: 협업글 작성하기
  const handleWriteClick = () => {
    setOpenModal(true);
  };
  const navigate = useNavigate();
  const movetoRegister = () => {
    navigate('/collaboration/collab-registration');  // 버튼 클릭 시 이동
    setOpenModal(flase);
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

        <Button
            type={TYPES.PLUS}
            text='협업글 작성하기'
            onClick={handleWriteClick}
        />
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
