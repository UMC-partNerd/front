import styled from 'styled-components';
import { PiArrowElbowDownRightBold } from "react-icons/pi";

export const SArrow = styled(PiArrowElbowDownRightBold)`
  position: absolute;
  left: -30px;
  top: 10px;
  font-size: 18px;
  color: #08d485;
`;

export const SCommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 540px;
  min-height: 90px;
  padding: 8px;
  background-color: #fff;
  margin-top: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

export const SProfileImage = styled.div`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 15px;
`;

export const SCommentContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SCommentHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const SCommentMeta = styled.div`
  font-size: 13px;
  margin-top: 10px;
  color: #c2c2c2;
  font-weight: 500;
`;

export const SCommentBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 5px;
`;

export const SCommentText = styled.p`
  font-size: 15px;
  color: #212121;
  font-weight: 600;
  margin: 17px 0 5px 0;
  flex-grow: 1;
`;

export const SCommentInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
`;

export const SReplyButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: #c2c2c2;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;

export const SMoreOptionsMenu = styled.div`
  position: absolute;
  right: 10px;
  top: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.15);
  width: 120px;
  height: 100px;
  padding: 0;
  flex-direction: column;
  justify-content: center;
`;

export const SMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.4px;

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
