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
  
  const onClickHandler = () => {
    
  };

  return(
      <Container>
          <SubContainer>
          <ImageComp />
          <NameField>
              <Name>이름</Name>
              <Explan>설명</Explan>
          </NameField>
          </SubContainer>
          {isPersonalPage ? (
              <Button
                  type={TYPES.PLUS}
                  text='채팅'
                  onClick={onClickHandler}
              />
          ) : (
              <Button
                  type={TYPES.PLUS}
                  text='채팅'
                  onClick={onClickHandler}
              />
          )}
      </Container>
  )
}
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