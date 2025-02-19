import styled from 'styled-components';

export const SContainer = styled.div` 
  margin: 53px 0; 
  max-width: 800px; 
  width: 100%;
`;

export const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SSectionTitle = styled.h2`
  font-size: 32px; 
  font-weight: 700; 
  color: #212121;
`;

export const SFeedList = styled.ul`
  margin-top: 30px;
  list-style-type: none;
  padding: 0;
`;

export const SFeedItem = styled.li`
  margin-bottom: 30px; 
  padding: 30px; 
  border: 0.05px solid #f3f3f3; 
  border-radius: 15px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); 
  transition: background-color 0.3s, box-shadow 0.3s;
  min-height: 120px;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); 
  }
`;

export const SFeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const SFeedTitle = styled.div`
  font-weight: 600; 
  font-size: 20px; 
  color: #0D29B7;
`;

export const SFeedDate = styled.div`
  font-size: 0.8em;
  color: #888;
`;

export const SFeedDescription = styled.div`
  white-space: pre-line; 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #414141;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
`;