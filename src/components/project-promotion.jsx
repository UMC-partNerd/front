import React, { useState, useEffect } from 'react';
import Button, { TYPES } from "./common/button/button";
import CustomModal, { VERSIONS } from "./common/button/CustomModal";
import { useNavigate } from 'react-router-dom';
import Banner from "./common/banner/Banner";

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
  const [openModal, setOpenModal] = useState(false);

  // 버튼: 프로젝트 등록하기
  const buttonHandler = () => {
    setOpenModal(true);
  };
  const handleRegisterClick = () => {
    navigate('/project/promote/register');
    setOpenModal(false);  
  };

  return (
    <>
      <Banner 
        largeText="프로젝트 둘러보기" 
        smallText="흥미로운 아이디어가 있나요? 그렇다면 프로젝트를 응원해주세요!"
      />
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
          onClickHandler={handleRegisterClick}
          variant={VERSIONS.VER3}
        />
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
    </>
  );
};

export default ProjectPromotion;
