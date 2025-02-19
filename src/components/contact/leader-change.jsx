import React, { useState, useEffect } from 'react';
import { useTeamMembers } from '../../hooks/useTeamMembers';
import { useLeaderChange } from '../../hooks/useLeaderChange';
import { useParams } from 'react-router-dom';

import {
  Container,
  Title,
  Description,
  MainSection,
  SearchSection,
  SearchInputWrapper,
  SearchInput,
  SearchButton,
  SearchResultsList,
  SearchResultItem,
  ResultNickname,
  TitleWrapper,
  LeaderLabel,
  LeaderSection,
  LeaderName,
  ProfileImage,
} from '../../styled-components/contact/styled-permission-registration';

export const LeaderChange = () => {
  const { clubId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser, searchMembers } = useTeamMembers();
  const [leader, setLeader] = useState(null);
  const { fetchLeaderInfo, changeLeader, isLoading, error } = useLeaderChange(clubId);

  // 프로젝트 리더 정보 가져오기
  useEffect(() => {
    const getLeaderInfo = async () => {
      const leaderNickname = await fetchLeaderInfo();
      if (leaderNickname) {
        setLeader({ nickname: leaderNickname });
      } else {
        setLeader({ nickname: currentUser?.nickname });
      }
    };

    getLeaderInfo();
  }, [clubId, currentUser]);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      const results = await searchMembers(e.target.value);
      setSearchResults(results || []);
    } else {
      setSearchResults([]);
    }
  };

  const handleChangeLeader = async (user) => {
    if (window.confirm(`${user.nickname}님에게 리더 권한을 위임하시겠습니까?`)) {
      const success = await changeLeader(user.id);
      if (success) {
        setLeader(user);
        setSearchResults([]);
        setSearchQuery('');
        alert('리더 권한이 성공적으로 위임되었습니다.');
      } else {
        alert('리더 권한 위임에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  return (
    <Container>
      <TitleWrapper>
        <Title>권한 위임하기</Title>
      </TitleWrapper>
      <Description>다음 기수 리더에게 권한을 위임할 수 있습니다.</Description>
      
      <MainSection>
        <SearchSection>
          <SearchInputWrapper>
            <SearchInput
              placeholder="닉네임을 검색하여 추가해주세요"
              value={searchQuery}
              onChange={handleSearch}
              disabled={isLoading}
            />
            <SearchButton disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M7.38863 14.4335C10.917 14.4335 13.7773 11.5732 13.7773 8.04488C13.7773 4.51654 10.917 1.65625 7.38863 1.65625C3.86029 1.65625 1 4.51654 1 8.04488C1 11.5732 3.86029 14.4335 7.38863 14.4335Z" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.1212 18.1427L12.0684 13.0898" stroke="#0D29B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SearchButton>
          </SearchInputWrapper>
          
          {searchResults.length > 0 && (
            <SearchResultsList>
              {searchResults.map(result => (
                <SearchResultItem 
                  key={result.nickname} 
                  onClick={() => handleChangeLeader(result)}
                >
                  <ProfileImage 
                    src={result.profileImage || '/default-profile.png'} 
                    alt={result.nickname} 
                  />
                  <ResultNickname>{result.nickname}</ResultNickname>
                </SearchResultItem>
              ))}
            </SearchResultsList>
          )}
        </SearchSection>

        <LeaderSection>
          <LeaderLabel>리더</LeaderLabel>
          <LeaderName>{leader?.nickname || '리더 없음'}</LeaderName>
        </LeaderSection>
      </MainSection>
    </Container>
  );
};

export default LeaderChange;
