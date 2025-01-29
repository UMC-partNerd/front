import React, { useState, useEffect } from "react";
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
  Description
} from "../../styled-components/styled-Club";


const TEMP_CARDS = [
  {
    title: "동아리 이름",
    description: "동아리 한 줄 소개",
    imageUrl: "썸네일",
    category: "웹/앱 개발",
  },
  {
    title: "동아리 이름2",
    description: "동아리 한 줄 소개2",
    imageUrl: "썸네일",
    category: "웹/앱 개발",
  },
  {
    title: "동아리 이름3",
    description: "동아리 한 줄 소개3",
    imageUrl: "썸네일",
    category: "웹/앱 개발",
  }
];

function Club() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchTopClubs() {
      try {
        // const response = await fetch('/api/clubs/top');
        // const data = await response.json();
        // setClubs(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
      }
    }

    fetchTopClubs();
  }, []);

  const displayClubs = clubs.length > 0 ? clubs : TEMP_CARDS;

  return (
    <ClubContainer>
      <Header>
        <Title>당장 주목해야 하는 동아리</Title>
        <MoreButton href="/clubs">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {displayClubs.map((club, index) => (
          <ClubCard key={index}>
            <ImagePlaceholder>
              <img src={club.imageUrl} alt={club.title} />
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>{club.category}</CategoryBadge>
              <ClubTitle>{club.title}</ClubTitle>
              <Description>{club.description}</Description>
            </CardContent>
          </ClubCard>
        ))}
      </CardGrid>
    </ClubContainer>
  );
}

export default Club;
