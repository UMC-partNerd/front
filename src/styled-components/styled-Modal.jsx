import styled from 'styled-components';
import { VERSIONS } from '../components/common/modal/CustomModal';

// overlay: 모달창 밖
export const Background = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.5)",
      width: "100%",
      height: "100%",
      flexShrink: "0",
    },
    width: "600px",
    height: "380px",
    flexShrink: "0",
  
    borderRadius: "16px",
    boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.15)"  
};

export const ModalContainer = styled.div`
  width: 600px;
  height: 380px;
  flex-shrink: 0;

  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

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

// ver3 버튼 2개 컨테이너
export const ButtonContainer = styled.div`
  width: 480px;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;