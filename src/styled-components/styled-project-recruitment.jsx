import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const PartnerCard = styled.div`
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
`;

export const Badge = styled.span`
  padding: 0;
  background: transparent;
  font-size: 14px;
  color: #08D485;
  display: block;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const SortButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  background: #E5E5E5;
  padding: 4px;
  border-radius: 8px;
  width: fit-content;
  margin-left: 0;
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
  background: ${props => props.isActive ? 'white' : 'transparent'};
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  transition: background-color 0.2s;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 32px;
`;

export const PageNumbersContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const PageButton = styled.button`
  width: ${props => props.isActive ? '48px' : '40px'};
  height: ${props => props.isActive ? '48px' : '40px'};
  border-radius: 50%;
  border: none;
  background: ${props => props.isActive ? '#5084F5' : '#F5F5F5'};
  color: ${props => props.isActive ? 'white' : '#666'};
  cursor: pointer;
  font-size: ${props => props.isActive ? '18px' : '16px'};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isActive ? '#5084F5' : '#EAEAEA'};
  }
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
    right: 0; /* 화살표 바의 끝이 오른쪽으로 정렬되도록 설정 */
    top: 50%; /* 수직으로 가운데 정렬 */
    width: 16px; /* 화살표 바의 길이 */
    height: 2px; /* 화살표 바의 두께 */
    background: #4B48DF; /* 화살표 바의 색상 */
    transform: translateY(-50%); /* 수직 가운데 정렬 */
  }

  &::after {
    content: '';
    position: absolute;
    right: 10px; /* 화살표의 머리부분 위치를 조정 */
    top: 50%; /* 수직으로 가운데 정렬 */
    width: 8px; /* 화살표 머리의 크기 */
    height: 8px; /* 화살표 머리의 크기 */
    border-top: 2px solid #4B48DF; /* 화살표 머리의 상단 선 */
    border-left: 2px solid #4B48DF; /* 화살표 머리의 왼쪽 선 */
    transform: translateY(-50%) rotate(-45deg); /* 화살표 방향 설정 */
  }
}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
  max-width: 1200px;
`;

export const RegisterButton = styled.button`
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
  background: ${props => props.isActive ? '#EAF1FF' : '#F3F3F3'};
  color: ${props => props.isActive ? '#0D29B7' : '#707070'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isActive ? '#EAF1FF' : '#F3F3F3'};
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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

export const RecruitmentStatus = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  z-index: 1;
  
  ${props => props.status === 'recruiting' && `
    background: #DDFCF0;
    color: #08D485;
  `}
  
  ${props => props.status === 'completed' && `
    background: #08D485;
    color: #FFFFFF;
  `}
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

export const ProjectTypeButton = styled.button`
  flex: 1;
  padding: 8px 16px;
  background: #FFFFFF;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.isActive ? '#212121' : '#707070'};
  cursor: pointer;
  transition: all 0.2s;

  &:first-child {
    border-right: 1px solid #EAEAEA;
  }
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

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;