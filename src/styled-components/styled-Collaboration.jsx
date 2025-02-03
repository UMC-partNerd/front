import styled from 'styled-components';

export const CollaborationContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 60px 0;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #333;

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

export const CollabCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 100%;
  margin-bottom: 8px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const CompanyLogo = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CollabTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CollabDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CompanyName = styled.span`
  font-size: 14px;
  color: #666;
`;

export const PostDate = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: auto;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 70px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`; 