import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  CollaborationContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../styled-components/styled-Collaboration";

const INITIAL_CARDS = [];

const TEMP_CARDS = [
  {
    title: "UMC와 연합 해커톤 진행할 동아리를 찾습니다!",
    content: "2025년 1월 셋째 주에 계획 중인 연합 해커톤을 함께할 동아리를 찾습니다. 장소는 이미 공덕 프론트원으로 섭외가 된 상태이고...",
    thumbnail: "UMC",
    footer: "UMC",
  },
  {
    title: "UMC와 연합 해커톤 진행할 동아리를 찾습니다!2",
    content: "2025년 1월 셋째 주에 계획 중인 연합 해커톤을 함께할 동아리를 찾습니다. 장소는 이미 공덕 프론트원으로 섭외가 된 상태이고...",
    thumbnail: "UMC",
    footer: "UMC",
  },
  {
    title: "UMC와 연합 해커톤 진행할 동아리를 찾습니다!3",
    content: "2025년 1월 셋째 주에 계획 중인 연합 해커톤을 함께할 동아리를 찾습니다. 장소는 이미 공덕 프론트원으로 섭외가 된 상태이고...",
    thumbnail: "UMC",
    footer: "UMC",
  },
  {
    title: "UMC와 연합 해커톤 진행할 동아리를 찾습니다!4",
    content: "2025년 1월 셋째 주에 계획 중인 연합 해커톤을 함께할 동아리를 찾습니다. 장소는 이미 공덕 프론트원으로 섭외가 된 상태이고...",
    thumbnail: "UMC",
    footer: "UMC",
  }
];

function Collaboration() {
  const [cards, setCards] = useState(INITIAL_CARDS);

  useEffect(() => {
    async function fetchTopCollaborations() {
      try {
        // const response = await fetch('/api/collaborations/top');
        // const data = await response.json();
        // setCards(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch collaborations:', error);
      }
    }

    fetchTopCollaborations();
  }, []);

  const displayCards = cards.length > 0 ? cards : TEMP_CARDS;

  return (
    <CollaborationContainer>
      <Header>
        <Title>📌 최근 등록된 콜라보레이션</Title>
        <MoreButton href="#">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {displayCards.slice(0, 4).map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
            thumbnail={card.thumbnail}
            footer={card.footer}
          />
        ))}
      </CardGrid>
    </CollaborationContainer>
  );
}

export default Collaboration;
