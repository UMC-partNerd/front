import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import * as S from '../../styled-components/projectdetail-styles/styled-ImageSlider';

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);  // 슬라이드 갯수를 images 배열의 길이로 변경
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);  // 슬라이드 갯수를 images 배열의 길이로 변경
  };

  return (
    <S.SSliderWrapper>
      <S.SLeftImageContainer>
        <S.SSlide bgImage={images[(currentSlide - 1 + images.length) % images.length]} />  {/* 이전 이미지 */}
      </S.SLeftImageContainer>

      <S.SCenterImageContainer>
        <S.SSlide bgImage={images[currentSlide]} isCurrent />  {/* 현재 이미지 */}
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
      </S.SCenterImageContainer>

      <S.SRightImageContainer>
        <S.SSlide bgImage={images[(currentSlide + 1) % images.length]} />  {/* 다음 이미지 */}
      </S.SRightImageContainer>
    </S.SSliderWrapper>
  );
};

export default ImageSlider;
