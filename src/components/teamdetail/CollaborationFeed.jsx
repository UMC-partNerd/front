import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CollaborationFeed = ({ feed }) => {
  const navigate = useNavigate();

  const handleFeedClick = (id) => {
    navigate(`/collaboration/${id}`);
  };

  const handleGoToCollaboration = () => {
    navigate('/collaboration');
  };

  return (
    <Container>
      <Header>
        <SectionTitle>콜라보레이션 피드</SectionTitle>
        <LinkButton onClick={handleGoToCollaboration}>콜라보레이션 바로가기  {'>'}</LinkButton>
      </Header>
      <FeedList>
        {feed.map((item) => (
          <FeedItem key={item.id} onClick={() => handleFeedClick(item.id)}>
            <FeedHeader>
              <FeedTitle>{item.title}</FeedTitle>
              <FeedDate>{item.date}</FeedDate>
            </FeedHeader>
            <FeedDescription>{item.content}</FeedDescription>
          </FeedItem>
        ))}
      </FeedList>
    </Container>
  );
};

CollaborationFeed.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CollaborationFeed;


const Container = styled.div` 
  margin: 53px 0; 
  max-width: 800px; 
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 32px; 
  font-weight: 700; 
  color: #212121;
`;

const LinkButton = styled.button`
  font-size: 15px;
  font-weight: 500;
  color: #A0A0A0;
  background: none;
  border:none;
  cursor: pointer; 
  letter-spacing: -0.5px;
  white-space: pre;
  &:hover {
    text-decoration: underline;
  }
`;

const FeedList = styled.ul`
  margin-top: 30px;
  list-style-type: none;
  padding: 0;
`;

const FeedItem = styled.li`
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

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FeedTitle = styled.div`
  font-weight: 600; 
  font-size: 20px; 
  color: #0D29B7;
`;


const FeedDate = styled.div`
  font-size: 0.8em;
  color: #888;
`;

const FeedDescription = styled.div`
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