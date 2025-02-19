import styled from 'styled-components';
import { MdMoreVert } from 'react-icons/md';

export const MoreOptionsWrapper = styled.div`
  position: relative;
`;

export const VerticalIcon = styled(MdMoreVert)`
  cursor: pointer;
  font-size: 24px;
  color: #333;
`;

export const SMoreOptionsMenu = styled.div`
  position: absolute;
  right: 0;
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