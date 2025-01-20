import React from 'react';
import { useParams } from 'react-router-dom'; 
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h2`
  font-size: 2em;
`;

const Description = styled.p`
  font-size: 1.2em;
`;

const Date = styled.div`
  font-size: 1em;
  color: gray;
`;

const CollaborationDetailPage = () => {
  const { id } = useParams(); 

  // 임시 데이터 (API로 수정 필요)
  const collaborationData = [
    {
      id: 1,
      title: '2025 IT 컨퍼런스 공동 개최',
      description: '안녕하세요! 저희는 IT 연합동아리 TectTect입니다. 전문가가 함께하는 ‘IT의 미래를 말하다’ 컨퍼런스를 준비 중입니다.',
      date: '2025. 01. 04',
    },
    {
      id: 2,
      title: '2025 IT 컨퍼런스 공동 개최',
      description: '2024년 3월에 대학생과 IT 산업 전문가가 함께하는 ‘IT의 미래를 말하다’ 컨퍼런스를 준비 중입니다.',
      date: '2025. 01. 04',
    },
  ];

  // 해당 id에 맞는 콜라보레이션 피드 찾기기
  const collaboration = collaborationData.find(item => item.id === parseInt(id));

  if (!collaboration) {
    return <div>콜라보레이션을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <Title>{collaboration.title}</Title>
      <Description>{collaboration.description}</Description>
      <Date>{collaboration.date}</Date>
    </Container>
  );
};

export default CollaborationDetailPage;
