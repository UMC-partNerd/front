import React from "react";
import Card from "./Card";
import {
  ProjectContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../styled-components/styled-Project";
import { useHomeData } from '../hooks/useHomeData';

function Project({ title, type = 'recent' }) {
  const { homeData, isLoading } = useHomeData();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <ProjectContainer>
      <Header>
        <Title>{title}</Title>
        <MoreButton href="/project">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {homeData.projects.slice(0, 6).map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
            thumbnail={card.thumbnail}
            footer={card.footer}
            variant="project"
          />
        ))}
      </CardGrid>
    </ProjectContainer>
  );
}

export default Project;
