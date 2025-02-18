import styled from 'styled-components';

export const Sidebar = styled.div`
  width: 360px;
  height: 1090px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);

  height: 100%;
`;

export const TabMenu = styled.div`
  width: 100%;
  height: 160px;
  gap: 20px;

  display: flex;
  padding: 20px;
  margin-bottom: 10px;
`;

export const Tab = styled.div`
  font-style: normal;
  letter-spacing: -0.48px;

  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  line-height: ${({ active }) => (active ? "30px; /* 125% */" : "normal")};
  color: ${({ active }) => (active ? "#0D29B7" : "#C2C2C2")};
`;

export const ChatList = styled.div`
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;

  padding: 10px;
  height: 85%;
  overflow-y: auto; /* 세로 스크롤 허용 */
`;