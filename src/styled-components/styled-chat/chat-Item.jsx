import styled from 'styled-components';

export const ChatItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background: #f0f2f5;
  }
`;

// 관련 콜라보레이션
export const About = styled.p`
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

export const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ChatInfo = styled.div`
  width:238px;
  height: 60px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;

  flex: 1;
`;

export const ChatName = styled.p`
  color: #212121;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;
`;

export const MessageInfo  = styled.div`
  width:238px;
  height: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
`;

export const LastMessage = styled.p`
  color: #A0A0A0;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
`;

export const ChatTime = styled.p`
  color: #C2C2C2;
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;

  min-width: 50px;
`;






export const ChatRoomContainer  = styled.div`
  width:320px;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
