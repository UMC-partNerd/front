import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  ClubContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../../styled-components/styled-Club";

const INITIAL_CARDS = [];

const TEMP_CARDS = [
  {
    title: "동아리 이름",
    content: "동아리 한 줄 소개",
    thumbnail: "썸네일",
    footer: "웹/앱 개발",
  },
  {
    title: "동아리 이름2",
    content: "동아리 한 줄 소개2",
    thumbnail: "썸네일",
    footer: "웹/앱 개발",
  },
  {
    title: "동아리 이름3",
    content: "동아리 한 줄 소개3",
    thumbnail: "썸네일",
    footer: "웹/앱 개발",
  },
  {
    title: "동아리 이름4",
    content: "동아리 한 줄 소개4",
    thumbnail: "썸네일",
    footer: "웹/앱 개발",
  }
];

function Club() {
  const [cards, setCards] = useState(INITIAL_CARDS);

  useEffect(() => {
    async function fetchTopClubs() {
      try {
        // const response = await fetch('/api/clubs/top');
        // const data = await response.json();
        // setCards(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch clubs:', error);
      }
    }

    fetchTopClubs();
  }, []);

  const displayCards = cards.length > 0 ? cards : TEMP_CARDS;

  return (
    <ClubContainer>
      <Header>
        <Title>
          <span>🚀</span>
          지금 주목해야 하는 동아리
        </Title>
        <MoreButton href="/clubs">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {displayCards.slice(0, 4).map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
            thumbnail={card.thumbnail}
            footer={card.footer}
            variant="club"
          />
        ))}
      </CardGrid>
    </ClubContainer>
  );
}

export default Club;
