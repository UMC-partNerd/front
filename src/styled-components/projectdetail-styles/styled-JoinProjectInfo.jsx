import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.isDate ? '#212121' : '#08D485'};  
  margin-bottom: 20px;
`;

export const SubTitle = styled.h3`
  margin-top: 30px;
  font-size: 18px;
  font-weight: normal;
  color: #212121;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const SmallText = styled.p`
  margin-top: 15px;
  font-size: 15px;
  color: #414141;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const Badge = styled.div`
  display: inline-flex;
  padding: 8px 22px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #F3F3F3;
  font-size: 13px;
  font-weight: 600;
  margin-right: 10px;
`;

export const SectionWrapper = styled.div`
  margin-top: 40px;
`;

export const Divider = styled.div`
  margin-top: 40px;
`;

export const DateText = styled.p`
  font-size: 14px;
  color: #212121;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  gap: 10px; 
  margin-top: 20px;
`;
