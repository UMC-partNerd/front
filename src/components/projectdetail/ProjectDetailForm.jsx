import React from 'react';
import styled from 'styled-components';

const ProjectDetailForm = ({ projectData }) => { // projectData를 props로 받습니다.
  const projectTitle = "프로젝트 설명";
  const projectDescription = projectData?.description || "프로젝트 설명이 없습니다."; // projectData에서 description 가져오기

  const developmentTitle = "개발 상황 및 발전 방향";
  const developmentDescription = projectData?.current_progress || "개발 상황 정보가 없습니다."; // current_progress 가져오기

  const techStackTitle = "사용한 기술스택";
  const techStackDescription = `
    개발 | ${projectData?.dev_stack || "기본 개발 스택이 없습니다."}
    기획 | ${projectData?.pm_stack || "기본 기획 툴이 없습니다."}
    디자인 | ${projectData?.design_stack || "기본 디자인 툴이 없습니다."}
  `;

  return (
    <Wrapper>
      <Title>{projectTitle}</Title>
      <Description>{projectDescription}</Description>
      
      <SectionWrapper>
        <Title>{developmentTitle}</Title>
        <Description>{developmentDescription}</Description>
      </SectionWrapper>

      <TechStackWrapper>
        <TechStackTitle>{techStackTitle}</TechStackTitle>
        <TechStackDescription>{techStackDescription}</TechStackDescription>
      </TechStackWrapper>
    </Wrapper>
  );
};

export default ProjectDetailForm;

const Wrapper = styled.div`
  max-width: 690px;  /* 폼의 최대 너비 */
  margin: 0 auto;    /* 중앙 정렬 */
  padding: 0 20px;   /* 좌우 패딩 */
  text-align: left;  /* 텍스트 왼쪽 정렬 */
`;

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
  white-space: pre-line;  
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const SectionWrapper = styled.div`
  margin-top: 80px;
`;

const TechStackWrapper = styled.div`
  margin-top: 80px;
`;

const TechStackTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #212121;
  margin-bottom: 10px;
`;

const TechStackDescription = styled.p`
  font-size: 16px;
  color: #414141;
  line-height: 1.5;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;
