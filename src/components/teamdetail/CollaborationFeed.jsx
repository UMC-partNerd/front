import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../../styled-components/teamdetail-styles/styled-CollaborationFeed';

const CollaborationFeed = ({ feed = [] }) => {
  const navigate = useNavigate();
  
  // 상세 정보를 담을 상태
  const [detailedFeed, setDetailedFeed] = useState([]);

  const handleFeedClick = (id) => {
    navigate(`/collaboration/${id}`);
  };

  // 상세 정보 요청
  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem('jwtToken');
      try {
        setDetailedFeed(feed);
      } catch (error) {
        console.error("Error fetching collaboration post details:", error);
      }
    };

    if (feed.length > 0) {
      fetchDetails();
    }
  }, [feed]);

  return (
    <S.SContainer>
      <S.SHeader>
        <S.SSectionTitle>콜라보레이션 피드</S.SSectionTitle>
      </S.SHeader>
      {detailedFeed.length === 0 ? (
        // 피드가 없을 경우
        <S.SFeedItem>
          <S.SFeedTitle>관련 콜라보레이션 피드가 없습니다.</S.SFeedTitle>
        </S.SFeedItem>
      ) : (
        <S.SFeedList>
          {detailedFeed.map((item) => (
            <S.SFeedItem key={item.title} onClick={() => handleFeedClick(item.title)}>
              <S.SFeedHeader>
                <S.SFeedTitle>{item.title}</S.SFeedTitle>
                {/* 날짜 포맷을 'YYYY-MM-DD' 형식으로 표시 */}
                <S.SFeedDate>{new Date(item.openDate).toLocaleDateString()}</S.SFeedDate>
              </S.SFeedHeader>
              {/* description을 출력하고, 없으면 '내용 없음' 표시 */}
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
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,  // API 응답에서 description 사용
      openDate: PropTypes.string.isRequired,     // API 응답에서 openDate 사용
    })
  ).isRequired,
};

export default CollaborationFeed;
