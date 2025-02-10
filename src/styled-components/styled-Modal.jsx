import styled from 'styled-components';
import { VERSIONS } from '../components/CustomModal';

// overlay: 모달창 밖
export const Background = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.5)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "absolute",
      top: "0",
      left: "50%",
    },
};

export const Cancel = styled.button`
  width: 15px;
  height: 15px;
  display: fixed;
  color: #E1E1E1;
`;

export const ModalContainer = styled.div`
  width: 600px;
  height: 380px;
  position: absolute;
  left: 50%;
`;

export const Boldface = styled.h3`
    font-size: 21px;
    font-weight: 600;
    margin: 0;
    color: #212121;
`;

export const Regular = styled.p`
    font-size: 21px;
    font-weight: 600;
    margin: 0;
    color: #414141;
`;

export const ButtonContainer = styled.div`
  width: 480px;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;