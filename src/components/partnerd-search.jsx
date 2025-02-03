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

  const currentPartners = Array.isArray(partners) 
    ? partners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = Math.ceil((partners?.length || 0) / itemsPerPage);

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
    const pageNumbers = new Set(); // 중복 제거를 위한 Set 사용
    for (let i = -2; i <= 2; i++) {
      let pageNum = currentPage + i;
      
      // 페이지 번호가 범위를 벗어나면 순환
      if (pageNum <= 0) pageNum = totalPages + pageNum;
      if (pageNum > totalPages) pageNum = pageNum - totalPages;
      
      // 유효한 페이지 번호만 추가 (1부터 totalPages까지)
      if (pageNum >= 1 && pageNum <= totalPages) {
        pageNumbers.add(pageNum);
      }
    }

    // Set을 배열로 변환하고 정렬하여 페이지 버튼 생성
    [...pageNumbers].sort((a, b) => a - b).forEach(num => {
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
        {currentPartners.map((partner) => (
          <PartnerCard key={partner.clubId}>
            <ImagePlaceholder>
              <img 
                src={partner.profileImage} 
                alt={partner.name}
                onError={(e) => {
                  if (!e.target.src.includes('default-image.jpg')) {
                    e.target.src = '/default-image.jpg';
                  } else {
                    e.target.onError = null;
                    e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
                  }
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>{partner.categoryName}</CategoryBadge>
              <Title>{partner.name}</Title>
              <Description>{partner.intro}</Description>
            </CardContent>
          </PartnerCard>
        ))}
      </PartnerGrid>

      {totalPages > 0 && (
        <PaginationContainer>
          {renderPageButtons()}
        </PaginationContainer>
      )}
    </PartnerSearchContainer>
  );
};

export default PartnerSearch;
