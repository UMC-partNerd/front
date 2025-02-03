import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 68px;
  right: 432px;
  border-radius: 10px;
  min-width: 150px;
  z-index: 10;
  height: auto;

  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px;
`;

export const AlarmWrap1 = styled.div`
  width: 547px;
  height: 747px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #F3F4F7;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.15);

  position: absolute;
  top: 20px;
  right: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;  
`;

export const Title = styled.h3`
  color: #212121;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;

  margin-bottom: 20px;
`;

export const AlarmWrap2 = styled.div`
  width: 497px;
  height: 620px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #FFFFFF;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;`;

export const AlarmContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  width: 100%;
`;

export const Indicator = styled.circle`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  fill: var(--Main-Color, #0D29B7);

  margin-bottom: 8px;
  margin-right: 20px;
`;

export const AlarmMessage = styled.p`
  color: #212121;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: ${props => props.msg === 'club' ? 600 : 500};
  line-height: normal;
  letter-spacing: -0.4px;

  margin-bottom: 5px;
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

  margin-bottom: 10px;
`;

export const From = styled.p`
  color: var(--Main-Color, #0D29B7);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.36px;

｣  margin-left: auto;
  margin-top: 10px;
`;

export const StyledPath = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 452 2"
})`
  width: 100%;
  height: 2px;
  fill: none;

  path {
    stroke: #C2C2C2;
  }
`;