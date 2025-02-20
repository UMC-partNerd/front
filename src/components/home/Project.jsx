import React from "react";
import Card from "./Card";
import { useNavigate } from 'react-router-dom';
import {
  ProjectContainer,
  Header,
  Title,
  MoreButton,
  CardGrid
} from "../../styled-components/styled-Project";
import { useHomeData } from '../../hooks/useHomeData';

function Project({ title, type = 'recent' }) {
  const navigate = useNavigate();
  const { homeData, isLoading } = useHomeData();

  const handleCardClick = (id) => {
    console.log('Clicked project ID:', id);  // ID 값 확인
    console.log('Project type:', type);      // 프로젝트 타입 확인
    if (type === 'recent') {
      navigate(`/project/recruit/${id}`);  // 프로젝트 모집 상세
    } else {
      navigate(`/project/promote/${id}`);  // 프로젝트 홍보 상세
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // type에 따라 projects 또는 promotionProjects 선택
  const projects = type === 'recent' ? homeData.projects : homeData.promotionProjects;
  
  console.log('Projects data:', projects);  // 전체 프로젝트 데이터 확인

  return (
    <ProjectContainer>
      <Header>
        <Title>{title}</Title>
        <MoreButton href="/project">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {projects.slice(0, 6).map((project, index) => (
          <div 
            key={index}
            onClick={() => handleCardClick(project.id)}
            style={{ cursor: 'pointer' }}
          >
            <Card
              title={project.title}
              content={project.intro}
              thumbnail={project.thumbnail}
              variant="project"
            />
          </div>
        ))}
      </CardGrid>
    </ProjectContainer>
  );
}

export default Project;
