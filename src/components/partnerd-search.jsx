import React, { useState } from 'react';

import {
  PaginationContainer,
  ArrowButton,
  ArrowIcon,
  PageButton
} from "../styled-components/styled-common";

import {
  Container as PartnerSearchContainer,
  PartnerGrid,
  PartnerCard,
  ImagePlaceholder,
  CardContent,
  Badge,
  Title,
  Description,
  SortContainer,
  SortButton,
  ButtonContainer,
  RegisterButton,
  CategoryContainer,
  CategoryButton,
  CategoryTitle,
  SearchContainer,
  CategoryBadge
} from "../styled-components/styled-partnerd-search";


const PartnerSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const itemsPerPage = 12;

  // 예시 데이터
  const partners = Array(50).fill().map((_, index) => ({
    title: 'UMC',
    description: 'UMC는 IT연합 동아리입니다.',
    category: '웹/앱 개발',
    imageUrl: 'default-image-url.jpg'
  }));

  // 카테고리 필터링
  const filteredPartners = selectedCategory === '전체'
    ? partners
    : partners.filter(partner => partner.category === selectedCategory);

  // 현재 페이지의 데이터만 선택
  const currentPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

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

    // 현재 페이지를 중심으로 순환하는 페이지 번호 생성
    let pageNumbers = [];
    for (let i = -2; i <= 2; i++) {
      let pageNum = currentPage + i;
      
      // 페이지 번호가 범위를 벗어나면 순환
      if (pageNum <= 0) pageNum = totalPages + pageNum;
      if (pageNum > totalPages) pageNum = pageNum - totalPages;
      
      pageNumbers.push(pageNum);
    }

    // 페이지 버튼 생성
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
    <PartnerSearchContainer>
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
            isActive={sortBy === 'popular'}
            onClick={() => setSortBy('popular')}
          >
            인기순
          </SortButton>
        </SortContainer>
        <RegisterButton>동아리 등록하기</RegisterButton>
      </ButtonContainer>

      <PartnerGrid>
        {currentPartners.map((partner, index) => (
          <PartnerCard key={index}>
            <ImagePlaceholder>
              <img src={partner.imageUrl} alt={partner.title} />
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>{partner.category}</CategoryBadge>
              <Title>{partner.title}</Title>
              <Description>{partner.description}</Description>
            </CardContent>
          </PartnerCard>
        ))}
      </PartnerGrid>

      <PaginationContainer>
        {renderPageButtons()}
      </PaginationContainer>
    </PartnerSearchContainer>
  );
};

export default PartnerSearch;
