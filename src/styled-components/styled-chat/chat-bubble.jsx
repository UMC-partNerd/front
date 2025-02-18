import styled from 'styled-components';
import { POSITIONS } from '../../components/chat/chat-bubble';

export const BubbleContainer = styled.div`
  width: 100%;
  height: 700px;
  
  padding: 10px;
  gap: 10px;

`;

export const Profile = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 60px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

export const Row = styled.div`
`;

export const Who = styled.P`
  color: #212121;
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.32px;
`;

export const Message = styled.p`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 0px 8px 8px 8px;
  background: #F3F3F3;

  color: #414141;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
`; 