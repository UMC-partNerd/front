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

  // 로컬 이미지 URL을 처리하는 함수 (왼쪽, 오른쪽 이미지에 해당)
  const getImageUrl = (image) => {
    if (image.includes("d5sroz33vtblq.cloudfront.net")) {
      return image;
    } 
    return `http://localhost:3000${image}`;
  };

  const currentImageUrl = getImageUrl(images[currentSlide]); // 가운데 이미지 URL

  return (
    <S.SSliderWrapper>
      {/* 왼쪽 이미지 */}
      <S.SLeftImageContainer>
        <S.SSlide src={currentImageUrl} alt="Current Slide" />
      </S.SLeftImageContainer>

      {/* 현재 이미지 (가운데) */}
      <S.SCenterImageContainer>
        <S.SSlide src={currentImageUrl} alt="Current Slide" />
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

      {/* 오른쪽 이미지 */}
      <S.SRightImageContainer>
        <S.SSlide src={currentImageUrl} alt="Current Slide" />
      </S.SRightImageContainer>
    </S.SSliderWrapper>
  );
};

export default ImageSlider;
