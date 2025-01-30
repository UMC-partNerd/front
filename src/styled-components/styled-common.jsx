import styled from 'styled-components';

// 페이지네이션 관련
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 32px;
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowIcon = styled.span`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  
  &.right {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 16px;
      height: 2px;
      background: #4B48DF;
      transform: translateY(-50%);
    }

    &::after {
      content: '';
      position: absolute;
      left: 10px;
      top: 50%;
      width: 8px;
      height: 8px;
      border-top: 2px solid #4B48DF;
      border-right: 2px solid #4B48DF;
      transform: translateY(-50%) rotate(45deg);
    }
  }

  &.left {
    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      width: 16px;
      height: 2px;
      background: #4B48DF;
      transform: translateY(-50%);
    }

    &::after {
      content: '';
      position: absolute;
      right: 10px;
      top: 50%;
      width: 8px;
      height: 8px;
      border-top: 2px solid #4B48DF;
      border-left: 2px solid #4B48DF;
      transform: translateY(-50%) rotate(-45deg);
    }
  }
`;

export const PageButton = styled.button`
  width: ${props => props.$isActive ? '48px' : '40px'};
  height: ${props => props.$isActive ? '48px' : '40px'};
  border-radius: 50%;
  border: none;
  background: ${props => props.$isActive ? '#5084F5' : '#F5F5F5'};
  color: ${props => props.$isActive ? 'white' : '#666'};
  cursor: pointer;
  font-size: ${props => props.$isActive ? '18px' : '16px'};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$isActive ? '#5084F5' : '#EAEAEA'};
  }
`;
