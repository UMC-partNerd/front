import styled from 'styled-components';
import { PiArrowElbowDownRightBold } from "react-icons/pi";

export const SReplyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 550px;
  height: 110px;
  padding: 10px;
  background-color: #F6F6F6;
  margin-top: 5px;
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const SProfileImageReply = styled.img`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;  
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

export const SLikeButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ liked }) => (liked ? '#C2C2C2' : '#aaa')};
  cursor: pointer;
  font-size: 18px;
  margin-right: 2px;  

  &:hover {
    color: #ff4444;
  }
`;

export const SLikeCount = styled.span`
  font-size: 14px;
  color: #C2C2C2;
  margin-left: 0;  
  display: inline-block;
  position: relative;
  top: -2px;  
`;

export const SDateText = styled.div`
  font-size: 13px;
  color: #C2C2C2;
  font-weight: 500;
  display: flex;
  align-items: center; 
`;

export const SLikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px; 
  margin-top: 5px;
`;