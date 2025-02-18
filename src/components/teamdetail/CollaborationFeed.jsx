import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styled-components/teamdetail-styles/styled-CollaborationFeed';

const CollaborationFeed = ({ feed = [] }) => { // 기본값 설정
  const navigate = useNavigate();

  const handleFeedClick = (id) => {
    navigate(`/collaboration/${id}`);
  };

  return (
    <S.SContainer>
      <S.SHeader>
        <S.SSectionTitle>콜라보레이션 피드</S.SSectionTitle>
      </S.SHeader>
      {feed.length === 0 ? (
        <S.SFeedItem>
          <S.SFeedTitle>콜라보레이션 피드가 없습니다.</S.SFeedTitle>
        </S.SFeedItem>
      ) : (
        <S.SFeedList>
          {feed.map((item) => (
            <S.SFeedItem key={item.id} onClick={() => handleFeedClick(item.id)}>
              <S.SFeedHeader>
                <S.SFeedTitle>{item.title}</S.SFeedTitle>
                <S.SFeedDate>{item.date}</S.SFeedDate>
              </S.SFeedHeader>
              <S.SFeedDescription>{item.content}</S.SFeedDescription>
            </S.SFeedItem>
          ))}
        </S.SFeedList>
      )}
    </S.SContainer>
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
