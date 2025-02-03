import styled from 'styled-components';

export const SSliderWrapper = styled.div`
  width: 100%;
  height: 240px; 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #E8E8E8; 
`;

export const SSlideContainer = styled.div`
  width: 44%; 
  height: 310px; 
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-color: #F3F3F3; 
  border-radius: 4px;
  z-index: 1; 
`;

export const SSlide = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImage}) center center / cover no-repeat;
  transition: transform 0.5s ease-in-out;
`;

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

export const SArrowIcon = styled.div`
  font-size: 15px; 
`;