import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProjectTypeContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 40px;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  overflow: hidden;
  width: 400px;
  height: 40px;
`;

export  const ProjectTypeButton = styled.button`
  flex: 1;
  padding: 8px 16px;
  background: #FFFFFF;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isActive ? '#212121' : '#707070'};
  cursor: pointer;
  transition: all 0.2s;

  &:first-child {
    border-right: 1px solid #EAEAEA;
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background: ${props => props.$isActive ? '#EAF1FF' : '#F3F3F3'};
  color: ${props => props.$isActive ? '#0D29B7' : '#707070'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  background: #E5E5E5;
  padding: 4px;
  border-radius: 8px;
  width: fit-content;
  margin: 0;
`;

export const SortButton = styled.button`
  padding: 8px 20px;
  border-radius: 6px;
  border: none;
  background: ${props => props.$isActive ? 'white' : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.$isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

export const RegisterButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid #4B48DF;
  background: transparent;
  color: #4B48DF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4B48DF;
    color: white;
  }

  &:before {
    content: '+';
    margin-right: 8px;
    font-size: 16px;
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.div`
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
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
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #F5F5F5;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const Deadline = styled.p`
  margin: 0;
  font-size: 14px;
  color: #A0A0A0;
  line-height: 1.5;
`;

export const RankNumber = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const TopProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
`;

export const TopProjectCard = styled.div`
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const TopImagePlaceholder = styled.div`
  width: 100%;
  padding-top: 75%;
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

export const TopRankNumber = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const TopCardContent = styled.div`
  padding: 20px;
`;

export const TopTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

export const TopDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

export const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #EAEAEA;
  border-radius: 6px;
  font-size: 14px;
  width: 300px;
  margin-right: 16px;

  &::placeholder {
    color: #999;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
