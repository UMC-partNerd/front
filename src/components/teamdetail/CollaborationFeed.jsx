import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styled-components/teamdetail-styles/styled-CollaborationFeed';

const CollaborationFeed = ({ feed = [] }) => {
  console.log('Received feed:', feed);  // feed 데이터 확인

  const navigate = useNavigate();
  const [detailedFeed, setDetailedFeed] = useState([]);
  
  // 피드 클릭 시, 해당 ID로 상세 페이지 이동
  const handleFeedClick = (id) => {
    navigate(`/collaboration/${id}`);
  };

  useEffect(() => {
    setDetailedFeed(feed);
  }, [feed]);

  return (
    <S.SContainer>
      <S.SHeader>
        <S.SSectionTitle>콜라보레이션 피드</S.SSectionTitle>
      </S.SHeader>
      {detailedFeed.length === 0 ? (
        <S.SFeedItem>
          <S.SFeedTitle>관련 콜라보레이션 피드가 없습니다.</S.SFeedTitle>
        </S.SFeedItem>
      ) : (
        <S.SFeedList>
          {detailedFeed.map((item) => (
            <S.SFeedItem key={item.id} onClick={() => handleFeedClick(item.id)}>
              <S.SFeedHeader>
                <S.SFeedTitle>{item.title}</S.SFeedTitle>
                <S.SFeedDate>{new Date(item.openDate).toLocaleDateString()}</S.SFeedDate>
              </S.SFeedHeader>
              <S.SFeedDescription>{item.description || '내용 없음'}</S.SFeedDescription>
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
      description: PropTypes.string.isRequired,
      openDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CollaborationFeed;
