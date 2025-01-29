import React from "react";
import Card from "./Card";
import {
  CollaborationContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../styled-components/styled-Collaboration";
import { useHomeData } from '../hooks/useHomeData';

function Collaboration() {
  const { homeData, isLoading } = useHomeData();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <CollaborationContainer>
      <Header>
        <Title>최근 등록된 콜라보레이션</Title>
        <MoreButton href="#">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {homeData.collaborations.slice(0, 4).map((card, index) => (
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
