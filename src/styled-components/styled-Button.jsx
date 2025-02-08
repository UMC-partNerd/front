import styled from 'styled-components';
import { TYPES } from '../components/common/button';

export const ButtonContainer = styled.div`
  background: ${type => ( type === TYPES.YES ) ? 'var(--main, #0D29B7)' : '#FFFFFF'};
  border: ${type => ( type === TYPES.PLUS ) ? '1px solid #0D29B7' : ''};

  gap: 10px;

  width: 60px;
  height: 16px;
  flex-shrink: 0;

  padding: 20px 32px
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content:center;
  padding:10px 10px;

  color: ${type => ( type === TYPES.YES ) ? '#FFFFFF' : 'var(--main, #0D29B7)'};

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;

  cursor:pointer;
`;

export const NextContainer = styled.div`
  background: var(--main, #0D29B7);

  justify-content: center;
  align-items: center;
  gap: 10px;

  display: flex;
  padding: 10px;
  border-radius: 4px;

  text-align: center;

  width: 250px; 
  height: 40px;
  marginTop: 20px; 

  color: #FFFFFF;

`;

export const PlusContainer = styled.div`
  justify-content: center;
  gap: 10px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1.5px solid #0D29B7;
  background: transparent;
  color: #0D29B7;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background: #0D29B7;
    color: white;
  }

  &:before {
    content: '+';
    margin-right: 6px;
    font-size: 14px;
  }
`;

export const Text = styled.p`
  color: ${type => ( type === TYPES.NO ||  type === TYPES.PLUS ) ? ' var(--main, #0D29B7)' : '#FFFFFF'};

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;
`;