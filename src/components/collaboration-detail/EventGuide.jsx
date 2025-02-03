import React from "react";
import styled from "styled-components";

// 행사 안내 제목 스타일
const EventGuideHeader = styled.h2`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
  margin: 0 0 17px 0;  // margin-bottom 값을 늘림
`;

// 행사 안내 컨테이너 스타일
const EventGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;  // gap 값을 더 줄임
  width: 100%;
  padding: 4px 16px;  // padding 값을 줄임
  margin-bottom: 6px;  // margin-bottom 값을 줄임
`;

// 행사 설명 텍스트 스타일
const EventDescription = styled.p`
  font-size: 14px;
  color: #414141;
  line-height: 1.6;
  font-weight: 500;
  margin: 2px 0;  // margin 값을 줄임
`;

// 하이라이트 텍스트 스타일
const HighlightText = styled.span`
  font-weight: bold;
  color: #212121;
  font-size: 17px;
`;

const EventGuide = () => {
  // 한 번에 받아온 텍스트 예시
  const fullText = `
    안녕하세요! 저희는 IT 연합동아리 TectTect입니다.
    2025년 1월에 대학생과 IT 산업 전문가가 함께하는 "IT의 미래를 말하다" 컨퍼런스를 준비 중입니다.
    이번 행사를 더욱 풍성하게 만들기 위해 함께 협업할 IT 동아리를 찾고 있습니다.
    학생과 사회 초년생을 위한 개발 및 인공지능 컨퍼런스라고 생각해주시면 됩니다.
    1월 31일에 개최하는 것을 목표로 하고 있고 연사자 분은 섭외 중입니다.
    
    비용, 장소 등 디테일한 사항은 상의 후 결정할 예정입니다.
    많은 관심 부탁드립니다!
  `;

  return (
    <EventGuideContainer>
      <EventGuideHeader>행사 안내</EventGuideHeader>
      
      <EventDescription>
        <HighlightText>IT 벤처동아리 TectTect과 함께 2025 IT 컨퍼런스를 개최할 동아리를 찾습니다!</HighlightText>
      </EventDescription>
      
      {/* 전체 텍스트를 한 번에 표시 */}
      <EventDescription>
        {fullText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line.trim()}
            <br />
          </React.Fragment>
        ))}
      </EventDescription>
    </EventGuideContainer>
  );
};

export default EventGuide;