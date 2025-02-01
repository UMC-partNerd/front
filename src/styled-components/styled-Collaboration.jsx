import styled from 'styled-components';

export const CollaborationContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const MoreButton = styled.a`
  font-size: 16px;
  color: #000;
  cursor: pointer;
  text-decoration: none;
  margin-left: auto;
  margin-right: -20px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 58px;
  row-gap: 32px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`; 