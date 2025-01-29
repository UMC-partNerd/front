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
import { usePartnerSearch, PARTNER_CATEGORIES, SORT_OPTIONS } from '../hooks/usePartnerSearch';

const PartnerSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.RECENT);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const itemsPerPage = 12;

  const { partners, isLoading, error } = usePartnerSearch(selectedCategory, sortBy);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  // 현재 페이지의 데이터만 선택
  const currentPartners = partners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(partners.length / itemsPerPage);

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
        <ArrowIcon className="right" />
      </ArrowButton>
    );

    return buttons;
  };

  return (
    <PartnerSearchContainer>
      <CategoryTitle>카테고리</CategoryTitle>
      <CategoryContainer>
        {PARTNER_CATEGORIES.map(category => (
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
            isActive={sortBy === SORT_OPTIONS.RECENT}
            onClick={() => setSortBy(SORT_OPTIONS.RECENT)}
          >
            최신순
          </SortButton>
          <SortButton
            isActive={sortBy === SORT_OPTIONS.POPULAR}
            onClick={() => setSortBy(SORT_OPTIONS.POPULAR)}
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
