import React from 'react';
import * as S from '../../styled-components/collab-styles/styled-EventGuide';

const EventGuide = ({ collabData }) => {
  // collabData가 존재하는지 확인 후 비구조화 할당
  if (!collabData) {
    return <div>데이터를 불러오는 중...</div>;
  }

  const { intro, description } = collabData;

  return (
    <S.SEventGuideContainer>
      <S.SEventGuideHeader>행사 안내</S.SEventGuideHeader>
      
      {/* 하이라이트 텍스트로 intro 부분을 강조 */}
      <S.SEventDescription>
        <S.SHighlightText>{intro}</S.SHighlightText>
        <S.SHighlightText>{intro}</S.SHighlightText>
      </S.SEventDescription>
      
      {/* description 부분은 이어서 출력 */}
      <S.SEventDescription>
        {description.split('\n').map((line, index) => (
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