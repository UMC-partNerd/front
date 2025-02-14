import React, { useState } from 'react';

import {
  Container,
  Title,
  Description,
  MainSection,
  SearchSection,
  SearchInputWrapper,
  SearchInput,
  SearchButton,
  PermissionSection,
  PermissionGroup,
  PermissionLabel,
  PermissionTagsWrapper,
  PermissionTag,
  DeleteButton,
  SearchResultsList,
  SearchResultItem,
  ResultNickname,
  TitleWrapper,
  LimitText,
  LeaderLabel,
  SubleaderLabel,
  ProfileImage,
  LeaderSection,
  LeaderName,
} from '../../styled-components/contact/styled-permission-registration';

export const PermissionRegistration = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [permissions, setPermissions] = useState([]); // 빈 배열로 초기화
  const [leader] = useState({ nickname: '노브' }); // 고정 리더

  // 임시 사용자 데이터베이스
  const userDatabase = [
    { id: 3, nickname: '에이치', profileImage: '/path/to/image1.jpg' },
    { id: 4, nickname: '에이호', profileImage: '/path/to/image2.jpg' },
    { id: 5, nickname: '에이든', profileImage: '/path/to/image3.jpg' },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      const results = userDatabase.filter(user => 
        user.nickname.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddPermission = (user) => {
    // 부리더가 이미 한 명 있는 경우 추가하지 않음
    if (permissions.length >= 1) {
      alert('부리더는 최대 1명만 지정할 수 있습니다.');
      return;
    }
    
    if (!permissions.find(p => p.id === user.id)) {
      setPermissions([...permissions, user]);
    }
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleRemovePermission = (userId) => {
    setPermissions(permissions.filter(permission => permission.id !== userId));
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>팀페이지 권한 추가하기</Title>
        <LimitText>* 1명만 지정 가능</LimitText>
      </TitleWrapper>
      <Description>부리더에게 팀페이지 권한을 부여할 수 있습니다.</Description>
      
      <MainSection>
        <SearchSection>
          <SearchInputWrapper>
            <SearchInput
              placeholder="닉네임을 검색하여 추가해주세요"
              value={searchQuery}
              onChange={handleSearch}
            />
            <SearchButton>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M7.38863 14.4335C10.917 14.4335 13.7773 11.5732 13.7773 8.04488C13.7773 4.51654 10.917 1.65625 7.38863 1.65625C3.86029 1.65625 1 4.51654 1 8.04488C1 11.5732 3.86029 14.4335 7.38863 14.4335Z" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.1212 18.1427L12.0684 13.0898" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SearchButton>
          </SearchInputWrapper>
          
          {searchResults.length > 0 && (
            <SearchResultsList>
              {searchResults.map(result => (
                <SearchResultItem key={result.id} onClick={() => handleAddPermission(result)}>
                  <ProfileImage src={result.profileImage} alt={result.nickname} />
                  <ResultNickname>{result.nickname}</ResultNickname>
                </SearchResultItem>
              ))}
            </SearchResultsList>
          )}
        </SearchSection>

        <LeaderSection>
          <LeaderLabel>리더</LeaderLabel>
          <LeaderName>{leader.nickname}</LeaderName>
          <SubleaderLabel>부리더</SubleaderLabel>
          {permissions.map(permission => (
            <PermissionTag key={permission.id}>
              {permission.nickname}
              <DeleteButton onClick={() => handleRemovePermission(permission.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4L12 12" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DeleteButton>
            </PermissionTag>
          ))}
        </LeaderSection>
      </MainSection>
    </Container>
  );
};

export default PermissionRegistration;