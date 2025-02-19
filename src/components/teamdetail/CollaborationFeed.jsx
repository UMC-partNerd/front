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
        const responses = await Promise.all(
          feed.map(async (item) => {
            const response = await axios.get(`https://api.partnerd.site/api/collabPosts/${item.collabPostId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            });
            return { ...item, ...response.data.result }; 
          })
        );
        setDetailedFeed(responses);
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
        <S.SFeedItem>
          <S.SFeedTitle>콜라보레이션 피드가 없습니다.</S.SFeedTitle>
        </S.SFeedItem>
      ) : (
        <S.SFeedList>
          {detailedFeed.map((item) => (
            <S.SFeedItem key={item.collabPostId} onClick={() => handleFeedClick(item.collabPostId)}>
              <S.SFeedHeader>
                <S.SFeedTitle>{item.title}</S.SFeedTitle>
                {/* 날짜 포맷을 'YYYY-MM-DD' 형식으로 표시 */}
                <S.SFeedDate>{new Date(item.startDate).toLocaleDateString()}</S.SFeedDate>
              </S.SFeedHeader>
              {/* content는 'intro'로 전달된다고 가정 */}
              <S.SFeedDescription>{item.description || item.intro}</S.SFeedDescription>
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
      collabPostId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      intro: PropTypes.string.isRequired, // API 응답에서 intro 필드로 가정
      startDate: PropTypes.string.isRequired, // startDate 필드로 가정
    })
  ).isRequired,
};

export default CollaborationFeed;
