import styled from 'styled-components';

export const RequestWrap = styled.div`
  width: 574px;
  height: 318px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
`;

export const IdContainer = styled.div`
  width: 112px;
  height: 48px;

  display: flex;
  border-radius: 8px;
  padding: 20px;
  gap: 20px;
  background-color: #D9D9D9;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #878787;
`;

export const Profile = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 4px;
  background: url(<path-to-image>) lightgray -10px -0.286px / 141.667% 101.19% no-repeat;
`;

export const ClubName = styled.h3`
  color: #212121;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 125% */
  letter-spacing: -0.48px;
`;

export const Cancel = styled.button`
  color: #A0A0A0;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;
`; 

export const Message = styled.p`
  color: #414141;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.4px;
`;

export const ButtonContainer  = styled.div`
  width:484px;
  height: 64px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.button`
  display: flex;
  width: 220px;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background:${props => props.color === 'blue' ? '#0D29B7' : '#F3F3F3'};
  
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;
  
  color:${props => props.color === 'blue' ? '#FFFFFF' : '#0D29B7'};
`; 

export const CollabName = styled.p`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #EAF1FF;
  color: #0B2ED9;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.32px;
`;

export const Row  = styled.div`
  width:238px;
  height: 60px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;
`;


export const ChatRoomContainer  = styled.div`
  width:320px;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ChatContainer  = styled.div`
  width:238px;
  height: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
`;

export const LastChat = styled.p`
  color: #A0A0A0;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
`;

export const Time = styled.p`
  color: #C2C2C2;
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
`;
