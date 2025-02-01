import styled from 'styled-components';

export const BadgeContainer = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;

  top:20px;
  right: 164px;

  transform: translate(50%, -50%);
  z-index: 10;
`;

export const StyledCircle = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
})`
  width: 16px;
  height: 16px;
  fill: none;

  circle {
    cx: 8;
    cy: 8;
    r: 8;
    fill: #08d485;
  }
`;

export const CountBadge = styled.p`
  width: 12px;
  color: #0D29B7;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.24px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;