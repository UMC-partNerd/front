import styled from 'styled-components';
import { PiArrowElbowDownRightBold } from "react-icons/pi";

export const SReplyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 470px;
  padding: 8px;
  background-color: #F6F6F6;
  margin-top: 5px;
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px; 
`;

export const SProfileImageReply = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 10px;
  margin-top: 10px;
`;

export const SReplyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  position: relative;
`;

export const SReplyInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  line-height: -0.4px;
`;

export const SReplyText = styled.p`
  font-size: 15px;
  color: #212121;
  font-weight: 600;
  margin: 10px 0 5px 0;
`;

export const SArrow = styled(PiArrowElbowDownRightBold)`
  position: absolute;
  left: -30px;
  top: 10px;
  font-size: 18px;
  color: #08d485;
`;

export const SMoreOptionsMenu = styled.div`
  position: absolute;
  right: 10px;
  top: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
  width: 120px;
  height: 100px;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  z-index: 10; 
`;

export const SMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SDivider = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  margin: 0 auto;
`;