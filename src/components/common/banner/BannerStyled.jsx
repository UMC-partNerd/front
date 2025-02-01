import styled from "styled-components";

export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #0d29b7;
  background-image: linear-gradient(to right, #0d29b7, #061251);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 150px;
  }

  @media (max-width: 768px) {
    height: 120px;
  }

  @media (max-width: 480px) {
    height: 100px;
  }
`;

export const LargeText = styled.div`
  position: absolute;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  z-index: 2;
  top: 30%;
  left: 18%;
  transform: translateX(0);

  @media (max-width: 1024px) {
    font-size: 1.6rem;
    left: 15%;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    left: 12%;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    left: 8%;
  }
`;

export const SmallText = styled.div`
  position: absolute;
  color: #fff;
  font-size: 1rem;
  z-index: 2;
  top: 60%;
  left: 18%;
  transform: translateX(0);

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    left: 15%;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    left: 12%;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    left: 8%;
  }
`;
