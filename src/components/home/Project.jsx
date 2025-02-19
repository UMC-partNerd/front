import React from "react";
import Card from "./Card";
import {
  ProjectContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../../styled-components/styled-Project";
import { useHomeData } from '../../hooks/useHomeData';

function Project({ title, type = 'recent' }) {
  const { homeData, isLoading } = useHomeData();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // type에 따라 projects 또는 promotionProjects 선택
  const projects = type === 'recent' ? homeData.projects : homeData.promotionProjects;

  return (
    <ProjectContainer>
      <Header>
        <Title>{title}</Title>
        <MoreButton href="/project">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {projects.slice(0, 6).map((project, index) => (
          <Card
            key={index}
            title={project.title}
            content={project.intro}
            thumbnail={project.thumbnail} // cloudFrontUrl을 사용
            variant="project"
          />
        ))}
      </CardGrid>
    </ProjectContainer>
  );
}

export default Project;
