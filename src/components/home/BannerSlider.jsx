import React, { useState } from 'react';
import styled from 'styled-components';

const BannerSlider = () => {
  const slides = [
    { src: '/banner1.png', bgColor: '#0D29B7' },
    { src: '/banner2.png', bgColor: '#FA1392' },
    { src: '/banner3.png', bgColor: '#13ADFA' },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % slides.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + slides.length) % slides.length);
  };

  return (
    <SliderWrapper bgColor={slides[currentImage].bgColor}>
      <SliderContent>
        <SliderImage src={slides[currentImage].src} alt={`slide ${currentImage + 1}`} />
      </SliderContent>
      <PaginationWrapper>
        <PaginationButton onClick={prevImage}>
          <Chevron src="/chevron.png" alt="left-chevron" />
        </PaginationButton>
        <PaginationIndicator>{currentImage + 1} / {slides.length}</PaginationIndicator>
        <PaginationButton onClick={nextImage}>
          <Chevron src="/chevron.png" alt="right-chevron" isRight />
        </PaginationButton>
      </PaginationWrapper>
    </SliderWrapper>
  );
};

export default BannerSlider;


const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  text-align: center;
  overflow: hidden;
  background-color: ${({ bgColor }) => bgColor};


  @media (max-width: 768px) {
    height: 200px;
  }
`;

const SliderContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;


  @media (max-width: 768px) {
    transform: scale(0.8); 
  }
  @media (max-width: 480px) {
    transform: scale(0.6); 
  }
`;


const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 21%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  height: 44px;
  width: 129px;
  border-top-left-radius: 27px;
  border-top-right-radius: 27px;

  @media (max-width: 768px) {
    right: 10%;
    font-size: 0.8rem; 
    width: 110px; 
    height: 38px; 
  }

  @media (max-width: 480px) {
    font-size: 0.7rem; 
    width: 90px; 
    height: 34px; 
  }
`;

const PaginationButton = styled.button`
  background-color: transparent;
  color: #212121;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 4px;
  line-height: 1;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 1rem; 
    width: 28px; 
    height: 28px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem; 
    width: 24px; 
    height: 24px;
  }

  &:focus {
    outline: none;
  }
`;

const PaginationIndicator = styled.span`
  color: #212121;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 3px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.8rem; 
  }

  @media (max-width: 480px) {
    font-size: 0.7rem; 
  }
`;

const Chevron = styled.img`
  transform: ${({ isRight }) => (isRight ? 'rotate(180deg)' : 'none')};
  width: 20px;
  height: 20px;
  display: block;
`;
