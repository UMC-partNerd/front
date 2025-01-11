import styled from 'styled-components';

export const CollaborationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-left: 100px;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`;

export const MoreButton = styled.a`
  font-size: 16px;
  color: #000;
  cursor: pointer;
  text-decoration: none;
  margin-right: 150px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    text-align: center;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 480px);
  gap: 32px 80px;
  justify-content: center;
  align-items: center;
  padding: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`; 