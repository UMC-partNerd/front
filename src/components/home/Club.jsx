import React from "react";
import {
  ClubContainer,
  Header,
  Title,
  MoreButton,
  CardGrid,
  ClubCard,
  ImagePlaceholder,
  CardContent,
  CategoryBadge,
  ClubTitle,
  Description,
} from "../../styled-components/styled-Club";
import { useHomeData } from "../../hooks/useHomeData";
import { useNavigate } from "react-router-dom";

function Club({ homeData, isLoading }) {
  const navigate = useNavigate();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const handleCardClick = (id) => {
    navigate(`/find/${id}`);
  };

  return (
    <ClubContainer>
      <Header>
        <Title>당장 주목해야 하는 동아리</Title>
        <MoreButton href="/find">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {homeData.clubs.map((club, index) => (
          <ClubCard key={index} onClick={() => handleCardClick(club.id)}>
            <ImagePlaceholder>
              <img src={club.imageUrl} alt={club.name} />
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>{club.categoryName}</CategoryBadge>
              <ClubTitle>{club.name}</ClubTitle>
              <Description>{club.intro}</Description>
            </CardContent>
          </ClubCard>
        ))}
      </CardGrid>
    </ClubContainer>
  );
}

export default Club;
