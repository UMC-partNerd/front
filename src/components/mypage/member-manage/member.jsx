import React from 'react';
import {
    MemberContainer,
    Profile,
    IdSection,
    NickName,
    Info,
    Cancel,
} from '../../styled-components/styled-Member';
import useProfilePhoto from '../../../hooks/useProfilePhoto'; // useProfilePhoto 훅 import

// const DefaultImage = '/default-image.png';

function Member({ nickname, explain }) {
  
  const { profileImageUrl } = useProfilePhoto(user.userId); // 사용자 프로필 사진 가져오기

  const onClickHandler = () => {
    
  };

  const renderDefaultMember = () => (
    <Container>
        <SubContainer>
        <ImageComp src={profileImageUrl || DefaultImage} alt="프로필" />
        <NameField>
            <Name>{nickname}닉네임</Name>
            <Explan>{explain}설명</Explan>
        </NameField>
        </SubContainer>
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