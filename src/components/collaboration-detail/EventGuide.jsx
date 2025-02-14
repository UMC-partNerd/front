import React from 'react';
import * as S from '../../styled-components/collab-styles/styled-EventGuide';

const EventGuide = ({ collabData }) => {
  if (!collabData) {
    return <div>데이터를 불러오는 중...</div>;
  }

  const { intro, description } = collabData;

  return (
    <S.SEventGuideContainer>
      <S.SEventGuideHeader>행사 안내</S.SEventGuideHeader>

      <S.SEventDescription>
        <S.SHighlightText>{intro}</S.SHighlightText>
      </S.SEventDescription>
      

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