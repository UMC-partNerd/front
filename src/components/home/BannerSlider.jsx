import React, { useState } from 'react';
import styled from 'styled-components';

const BannerSlider = () => {
  const images = [
    '/Rectangle.png',
    '/Rectangle.png',
    '/Rectangle.png',
    '/Rectangle.png',
    '/Rectangle.png'
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <SliderWrapper>
      <SliderImage src={images[currentImage]} alt={`slide ${currentImage + 1}`} />
      <PaginationWrapper>
        <PaginationButton onClick={prevImage}>&lt;</PaginationButton>
        <PaginationIndicator>{currentImage + 1} / {images.length}</PaginationIndicator>
        <PaginationButton onClick={nextImage}>&gt;</PaginationButton>
      </PaginationWrapper>
    </SliderWrapper>
  );
}

export default BannerSlider;


const SliderWrapper = styled.div`
  position: relative;
  max-width: 1920px;
  height: 280px; 
  text-align: center;
  overflow: hidden;
  margin-top: 0;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%; 
`;

const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0; 
  right: 400px; 
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  height: 30px;
  font-size: 1rem;
  width: 100px; 
  height: 40px; 
  border-top-left-radius: 25px; 
  border-top-right-radius: 25px; 
`;

const PaginationButton = styled.button`
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

const PaginationIndicator = styled.span`
  color: black;
  font-size: 1rem;
  font-weight: bold;
`;
