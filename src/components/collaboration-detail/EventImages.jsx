import React from 'react';
import styled from 'styled-components';

const EventImages = ({ images }) => {
  if (!images || images.length === 0) return null; // 이미지가 없으면 렌더링 안 함

  return (
    <ImagesContainer>
      {images.map((image, index) => (
        <ImageItem key={index}>
          <img src={image} alt={`Event image ${index + 1}`} />
        </ImageItem>
      ))}
    </ImagesContainer>
  );
};

export default EventImages;


const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개씩 배치 */
  gap: 10px;
  margin-top: 20px;
`;

const ImageItem = styled.div`
  width: 150px; 
  height: 150px; 
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    border-radius: 8px;
  }
`;
