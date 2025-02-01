import styled from 'styled-components';
import { TYPES } from '../../components/chat/chat-roomDoor';

export const ChatListWrap = styled.div`
  width: 360px;
  height: 1090px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
`;

export const Header = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

export const Personal = styled.h4`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.48px;
  
  ${({ isOpen }) => isOpen === TYPES.PERSONAL ? `
    color: #0D29B7;
    font-weight: 700;
    line-height: 30px; /* 125% */
  ` : `
    color: #C2C2C2;
    font-weight: 500;
    line-height: normal;
  `}
`;

export const Collab = styled.h4`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.48px;
  
  ${({ isOpen }) => isOpen === TYPES.COLLAB ? `
    color: #0D29B7;
    font-weight: 700;
    line-height: 30px; /* 125% */
  ` : `
    color: #C2C2C2;
    font-weight: 500;
    line-height: normal;
  `}
`;

export const DoorList = styled.div`
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
`; 