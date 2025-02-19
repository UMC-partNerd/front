import React from 'react';
import styled from 'styled-components';


const ProjectPromoteForm = ({ projectData }) => {
  const { description } = projectData || {}; 

  return (
    <div>
      <Title>프로젝트 설명</Title> 
      <Description>{description || "프로젝트에 대한 설명이 없습니다."}</Description> 
    </div>
  );
};

export default ProjectPromoteForm;



const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #212121;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #414141;
  line-height: 1.5;
  margin-bottom: 40px;
  font-weight: 600;
  white-space: pre-line;
`;
