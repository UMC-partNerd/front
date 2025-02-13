import styled from 'styled-components';
import { VERSIONS } from '../components/common/modal/CustomModal';

// overlay: 모달창 밖
export const Background = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.5)",
      width: "100%",
      height: "100%",
    },
    content: {
      width: "400px",
      height: "200px",
      margin: "auto", // 자동 마진으로 중앙정렬
      padding: "40px 32px",
      borderRadius: "16px",
      boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)",
      border: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
};

export const Boldface = styled.h3`
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  color: #212121;
`;

export const Regular = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #414141;
`;

// ver3 버튼 2개 컨테이너
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  alignItems: center;
`;