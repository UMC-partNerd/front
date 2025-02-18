import styled from 'styled-components';

export const RoomTitle  = styled.div`
  width: 796px;
  height: 151px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);

  color: #212121;
  text-align: center;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
`;

export const Explain = styled.p`
  color: #08D485;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
`;

export const Date = styled.div`
  display: inline-flex;
  padding: 8px 65px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: #F3F3F3;

  color: #707070;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;
`;

export const ChatWrap  = styled.div`
  width: 100%;
  height: 700px;
  gap: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InputMessage = styled.input`

  display: flex;
  width: 721px;
  height: 64px;
  padding: 22px 567px 23px 28px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 2px solid #E1E1E1;
  background: #FFF;


  width:${props => props.types === 'personal' ? '48px' : '60px'};
  height:${props => props.types === 'personal' ? '48px' : '60px'};
  flex-shrink: 0;
  border-radius:${props => props.types === 'personal' ? '4px' : '60px'};

  background: url(<path-to-image>) lightgray -10px -0.286px / 141.667% 101.19% no-repeat;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;

`;