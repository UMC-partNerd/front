import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  ProjectContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../../styled-components/styled-Project";

const INITIAL_CARDS = [];

const TEMP_CARDS = {
  recent: [
    {
      title: '최신 프로젝트 1',
      content: '최신 프로젝트 소개 1',
      thumbnail: '썸네일',
      footer: '방금 전',
    },
    {
      title: '최신 프로젝트 2',
      content: '최신 프로젝트 소개 2',
      thumbnail: '썸네일',
      footer: '1시간 전',
    },
    // ... 나머지 4개의 최신 프로젝트
  ],
  popular: [
    {
      title: '인기 프로젝트 1',
      content: '인기 프로젝트 소개 1',
      thumbnail: '썸네일',
      footer: '조회수 1.2k',
    },
    {
      title: '인기 프로젝트 2',
      content: '인기 프로젝트 소개 2',
      thumbnail: '썸네일',
      footer: '조회수 1k',
    },
    {
      title: '인기 프로젝트 1',
      content: '인기 프로젝트 소개 1',
      thumbnail: '썸네일',
      footer: '조회수 1.2k',
    },
    {
      title: '인기 프로젝트 2',
      content: '인기 프로젝트 소개 2',
      thumbnail: '썸네일',
      footer: '조회수 1k',
    },
    
    // ... 나머지 4개의 인기 프로젝트
  ]
};

function Project({ title, type = 'recent' }) {
  const [cards, setCards] = useState(INITIAL_CARDS);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // API 엔드포인트를 type에 따라 다르게 설정
        const endpoint = type === 'recent' 
          ? '/api/projects/recent'
          : '/api/projects/popular';
        
        // const response = await fetch(endpoint);
        // const data = await response.json();
        // setCards(data.slice(0, 6));

        // 임시로 TEMP_CARDS에서 데이터 가져오기
        setCards(TEMP_CARDS[type]);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    }

    fetchProjects();
  }, [type]);

  const displayCards = cards.length > 0 ? cards : TEMP_CARDS[type];

  return (
    <ProjectContainer>
      <Header>
        <Title>
          {title}
        </Title>
        <MoreButton href="/project">더보기 ›</MoreButton>
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
