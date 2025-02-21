import styled from 'styled-components';

// 슬라이더의 래퍼 스타일
export const SSliderWrapper = styled.div`
  width: 100%;
  height: 320px; /* 전체 슬라이더 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// 왼쪽 이미지 컨테이너
export const SLeftImageContainer = styled.div`
  width: 30%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  z-index: 1;
  background-color: #e0e0e0; /* 왼쪽 이미지 컨테이너 배경 색 */
  border-radius: 7px;
  overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않게 */
`;

// 중앙 이미지 컨테이너
export const SCenterImageContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  background-color: #f3f3f3; /* 중앙 이미지 컨테이너 배경 색 */
  border-radius: 8px;
  overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않게 */
`;

// 오른쪽 이미지 컨테이너
export const SRightImageContainer = styled.div`
  width: 30%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: #e0e0e0;
  border-radius: 7px;
  overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않게 */
`;

// 이미지 슬라이드 스타일 (이미지 태그로 변경)
export const SSlide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율을 유지하면서 컨테이너에 맞게 크기 조정 */
  transition: transform 0.5s ease-in-out;
  border-radius: 4px;
`;

// 화살표 스타일
export const SArrow = styled.div`
  position: absolute;
  top: ${(props) => (props.left ? '49%' : '51%')}; 
  ${(props) => (props.left ? 'left: 15px;' : 'right: 15px;')} 
  transform: translateY(-50%);
  background-color: white;
  border-radius: 51%; 
  padding: 8px;
  cursor: pointer;
  z-index: 2; 
`;

// 화살표 아이콘 스타일
export const SArrowIcon = styled.div`
  font-size: 15px;
`;

