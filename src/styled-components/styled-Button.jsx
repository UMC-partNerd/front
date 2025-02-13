import styled from 'styled-components';
import { TYPES } from '../components/common/button';

export const ButtonContainer = styled.div`
  width: 60px;
  height: 16px;
  flex-shrink: 0;

  padding: 20px 32px
  border-radius: 6px;
  @media (min-width: 120px) {
    border-radius: 6px;
  }

  display: flex;
  align-items: center;
  justify-content:center;
  padding:10px 10px;
  gap: 10px;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;

  cursor:pointer;

  background: ${({ type }) => ( type === TYPES.YES ? 'var(--main, #0D29B7)' : '#F3F3F3' )};
  color: ${({ type }) => ( type === TYPES.YES ? '#FFFFFF' : 'var(--main, #0D29B7)' )};

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

  width:25vw;
  max-width: 250px;
  min-height: 40px;
  height:100%;

  marginTop: 20px; 

  color: #FFFFFF;

  font-size:1em;
  border:none;

  // background: ${(props) => (props.isValid ? '#FF073D' : 'gray')};

  // cursor: ${(props) => (props.isValid ? 'pointer' : 'not-allowed')};
  //     transition: background-color 0.3s;

  //     &:disabled {
  //         background: gray;
  //     }
  @media (max-width: 768px) {
          width: 90%;
          font-size: 0.9em;
      }
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