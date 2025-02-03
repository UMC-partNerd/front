import styled from 'styled-components';

export const SContainer = styled.div`
  background-color: #F3F3F3;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom:30px;
`;

export const SInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

export const SInputField = styled.input`
  flex: ${({ short }) => (short ? '0.3' : '0.7')};
  padding: 8px 10px;
  font-size: 14px;
  border: 1.5px solid #E1E1E1;
  border-radius: 5px;
  outline: none;
  height: 36px;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #C2C2C2;
  }
`;

export const SAddButton = styled.button`
  padding: 8px 14px;
  background-color: white;
  color: #0D29B7;
  font-size: 14px;
  font-weight: 700;
  border: 1.5px solid #0D29B7;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f0f0f0;
    color: #0B218A;
    border-color: #0B218A;
  }
`;

export const SContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-top: 10px;
`;

export const SContactBox = styled.div`
  flex: ${({ isLink }) => (isLink ? '0.62' : '0.28')};  
  padding: 8px 10px;
  font-size: 14px;
  border: 1.5px solid #E1E1E1;
  border-radius: 5px;
  color: #333;
  background-color: #fff;
  word-break: break-word;
  transition: border 0.3s ease;
  height: 30px;
  display: flex;
  align-items: center;
  
  &:focus-within {
    border: 1.5px solid #0D29B7; 
  }
`;

export const SDeleteButton = styled.button`
  color: #C2C2C2;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #0D29B7;
  }
`;