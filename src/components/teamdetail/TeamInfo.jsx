import React from 'react';
import * as S from '../../styled-components/teamdetail-styles/styled-TeamInfo';

const TeamInfo = ({ name, description, category, contact = [] }) => (
  <S.SContainer>
    <S.SHeaderContainer>
      <S.SBadgeTitleContainer>
        <S.SBadge>{category}</S.SBadge>
        <S.STitle>{name}</S.STitle>
      </S.SBadgeTitleContainer>
      <S.SManageLink>팀페이지 관리 &nbsp;&gt;</S.SManageLink>
    </S.SHeaderContainer>
    <S.SSubTitle>{description}</S.SSubTitle>

    <S.SContactInfoContainer>
      {contact.length > 0 ? contact.map((item, index) => (
        <S.SContactItem key={index}>
          <S.SContactType>{item.type}:</S.SContactType>
          <S.SContactLink>{item.link}</S.SContactLink>
        </S.SContactItem>
      )) : <div>연락처 정보가 없습니다.</div>}
    </S.SContactInfoContainer>
  </S.SContainer>
);

export default TeamInfo;