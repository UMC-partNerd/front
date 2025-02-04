import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import * as S from '../../styled-components/projectdetail-styles/styled-ImageSlider';

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <S.SSliderWrapper>
      <S.SSlideContainer>
        <S.SSlide bgImage={images[currentSlide]} />
        <S.SArrow left onClick={handlePrevSlide}>
          <S.SArrowIcon>
            <FaChevronLeft />
          </S.SArrowIcon>
        </S.SArrow>
        <S.SArrow onClick={handleNextSlide}>
          <S.SArrowIcon>
            <FaChevronRight />
          </S.SArrowIcon>
        </S.SArrow> 
      </S.SSlideContainer>
    </S.SSliderWrapper>
  );
};

export default ImageSlider;