import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  ProjectContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../styled-components/styled-Project";

const INITIAL_CARDS = [];

const TEMP_CARDS = [
  {
    title: '프로젝트 이름',
    content: '프로젝트 한 줄 소개',
    thumbnail: '썸네일',
    footer: '프로젝트 한 줄 소개',
  },
  {
    title: '프로젝트 이름2',
    content: '프로젝트 한 줄 소개2',
    thumbnail: '썸네일',
    footer: '프로젝트 한 줄 소개',
  },
  {
    title: '프로젝트 이름3',
    content: '프로젝트 한 줄 소개3',
    thumbnail: '썸네일',
    footer: '프로젝트 한 줄 소개',
  },
  {
    title: '프로젝트 이름4',
    content: '프로젝트 한 줄 소개4',
    thumbnail: '썸네일',
    footer: '프로젝트 한 줄 소개',
  },
  {
    title: '프로젝트 이름5',
    content: '프로젝트 한 줄 소개5',
    thumbnail: '썸네일',
    footer: '프로젝트 한 줄 소개',
  },
  {
    title: '프로젝트 이름6',
    content: '프로젝트 한 줄 소개6',
    thumbnail: '썸네일',
    footer: '프로젝트 한 줄 소개',
  }
];

function Project() {
  const [cards, setCards] = useState(INITIAL_CARDS);

  useEffect(() => {
    async function fetchTopProjects() {
      try {
        // const response = await fetch('/api/projects/top');
        // const data = await response.json();
        // setCards(data.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    }

    fetchTopProjects();
  }, []);

  const displayCards = cards.length > 0 ? cards : TEMP_CARDS;

  return (
    <ProjectContainer>
      <Header>
        <Title>
          <span>🤝</span>
          지금 함께하고 싶은 프로젝트
        </Title>
        <MoreButton href="/projects">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {displayCards.slice(0, 6).map((card, index) => (
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
