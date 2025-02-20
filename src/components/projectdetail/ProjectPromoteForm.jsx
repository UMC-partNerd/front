import React from 'react';
import styled from 'styled-components';

const ProjectPromoteForm = ({ projectData }) => {
  const { description } = projectData || {}; 

  return (
    <Wrapper>
      <Title>프로젝트 설명</Title> 
      <Description>{description || "프로젝트에 대한 설명이 없습니다."}</Description> 
    </Wrapper>
  );
};

export default ProjectPromoteForm;

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
  font-weight: 600;
  white-space: pre-line;  /* 줄 바꿈을 반영 */
  word-wrap: break-word;
  overflow-wrap: break-word;
`;
