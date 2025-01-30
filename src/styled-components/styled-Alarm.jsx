import styled from 'styled-components';

export const AlarmWrap1 = styled.div`
  width: 547px;
  height: 747px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #F3F4F7;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.15);
`;

export const AlarmWrap2 = styled.div`
  width: 497px;
  height: 620px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #FFFFFF;
`;

export const AlarmContainer = styled.div`
  width: 122px;
  height: 452px;
`;

export const Indicator = styled.circle`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  fill: var(--Main-Color, #0D29B7);
`;

export const AlarmMessage = styled.p`
  color: #212121;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: ${props => props.msg === 'club' ? 600 : 500};
  line-height: normal;
  letter-spacing: -0.4px;
`;

export const Timer = styled.p`
  color: #C2C2C2;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
`;

export const From = styled.p`
  color: var(--Main-Color, #0D29B7);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 122.222% */
  letter-spacing: -0.36px;
`;

const StyledPath = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 452 2"
})`
  width: 452px;
  height: 2px;
  fill: none;

  path {
    stroke: #C2C2C2;
  }
`;