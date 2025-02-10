import React from 'react';
import {
    MemberContainer,
    Profile,
    IdSection,
    NickName,
    Info,
    Cancel,
} from '../../styled-components/styled-Member';

function Member({ profile, nickname, job, club }) {
  const renderIsMember = () => (
    <MemberContainer>
      <Profile profile={profile}/>
      <IdSection>
        <NickName nickname={nickname}/>
        <Info> @ {job} / {club}</Info>
      </IdSection>
      <Cancel/>
    </MemberContainer>
  );

  const renderWillMember = () => (
    <MemberContainer>
      <Profile profile={profile}/>
      <IdSection>
        <NickName nickname={nickname}/>
        <Info> @ {job} / {club}</Info>
      </IdSection>
      <Cancel/>
    </MemberContainer>
  );

  if (variant === VARIANTS.CLUB) {
    return renderWillMember();
  }

  return renderIsMember();
}

export default Member;