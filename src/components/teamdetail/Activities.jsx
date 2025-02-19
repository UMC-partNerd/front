import React from 'react';
import styled from 'styled-components';

const DefaultImage = '/default-image.png';

const Activities = ({ activities, images }) => (
  <Container>
    <SectionTitle>활동 및 프로젝트</SectionTitle>
    <ActivitiesText>{activities}</ActivitiesText>
    <ImagesContainer>
      {images.map((image, index) => (
        <ActivityImage key={index} src={image || DefaultImage} alt={`활동 이미지 ${index + 1}`} />
      ))}
    </ImagesContainer>
  </Container>
);

export default Activities;


const Container = styled.div`
  margin: 53px 0;
  max-width: 800px;
  width: 100%;
  margin-bottom: 35px;
`;

const SectionTitle = styled.h2`
  font-size: 32px; 
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 15px;
  color: #333;
`;

const ActivitiesText = styled.p`
  font-size: 16px; 
  line-height: 1.6;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #707070;
  white-space: pre-line; 
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 100px;
`;

const ActivityImage = styled.img`
  width: 150px; 
  height: 150px;
  object-fit: cover;
  border-radius: 8px; 
  border: 1px solid #e0e0e0;
`;


