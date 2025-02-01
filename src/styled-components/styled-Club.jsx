import styled from 'styled-components';

export const ClubContainer = styled.div`
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
  margin-bottom: 24px;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

export const MoreButton = styled.a`
  font-size: 16px;
  color: #000;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ClubCard = styled.div`
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  overflow: hidden;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  padding-top: 73.38%;
  background: #F5F5F5;
  position: relative;
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0;
  background: #FFFFFF;
  font-size: 14px;
  color: #08D485;
  margin-bottom: 8px;
  text-align: left;
  font-weight: 500;
`;

export const ClubTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: left;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`; 