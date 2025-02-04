import React from "react";
import * as S from '../../styled-components/collab-styles/styled-EventGuide';

const EventGuide = () => {
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
    <S.SEventGuideContainer>
      <S.SEventGuideHeader>행사 안내</S.SEventGuideHeader>
      
      <S.SEventDescription>
        <S.SHighlightText>IT 벤처동아리 TectTect과 함께 2025 IT 컨퍼런스를 개최할 동아리를 찾습니다!</S.SHighlightText>
      </S.SEventDescription>
      

      <S.SEventDescription>
        {fullText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line.trim()}
            <br />
          </React.Fragment>
        ))}
      </S.SEventDescription>
    </S.SEventGuideContainer>
  );
};

export default EventGuide;