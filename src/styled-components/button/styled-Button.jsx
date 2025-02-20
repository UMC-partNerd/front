import styled from 'styled-components';
import { TYPES } from '../../components/common/button/button';

export const ButtonContainer = styled.div`
  width: ${(props) => props.width || "60px"};
  height: ${(props) => props.height || "16px"};
  font-size: ${(props) => props.fontSize || "12px"};

  background: ${({ type }) => ( type === TYPES.YES ? 'var(--main, #0D29B7)' : '#F3F3F3' )};
  color: ${({ type }) => ( type === TYPES.YES ? '#FFFFFF' : 'var(--main, #0D29B7)' )};

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
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.4px;

  cursor:pointer;
`;

export const VoteContainer = styled.div`
  display: inline-flex;
  padding: 8px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 2px solid #08D485;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px 0px rgba(9, 131, 84, 0.30);

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;

  color:${(props) => (props.count ? 'rgba(8, 212, 133, 0.60)' : '#08D485')};

  flex-shrink: 0;

  cursor: pointer;

  &:hover {
    background: rgba(8, 212, 133, 0.60);
    color: #FFFFFF;
  }
`;

export const NextContainer = styled.div`
  width: ${(props) => props.width || "240px"};
  height: ${(props) => props.height || "40px"};
  
  max-width: 250px;
  min-height: 40px;

  font-size: ${(props) => props.fontSize || "1em"};

  background: var(--main, #0D29B7);

  justify-content: center;
  align-items: center;
  gap: 10px;

  display: flex;
  padding: 10px;
  border-radius: 8px;

  text-align: center;

  marginTop: 20px; 

  color: #FFFFFF;
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
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "20px"};
  font-size: ${(props) => props.fontSize || "12px"};

  justify-content: center;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  border: 1.5px solid #0D29B7;
  background: transparent;
  color: #0D29B7;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;

  justify-content: space-evenly;

  &:hover {
    background: #0D29B7;
    color: white;
  }

  ${props => {
    if (props.sign){
      return `
        &:before {
        content: '+';
        margin-right: 6px;
        font-size: 14px;
      `;
    }
  }}
`;