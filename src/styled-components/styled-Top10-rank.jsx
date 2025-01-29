import styled from 'styled-components';

export const RankingContainer = styled.div`
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RankingTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const RankingList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const RankingItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 6px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const Rank = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #0D29B7;
  margin-right: 12px;
  min-width: 20px;
`;

export const ContentWrapper = styled.div`
  flex: 1;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const Profile = styled.span`
  margin-right: 6px;
`;

export const Author = styled.span`
  font-weight: 500;
  margin-right: 6px;
`;

export const PartInfo = styled.span`
  color: #A0A0A0;
  font-size: 14px;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

