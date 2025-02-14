import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Title,
    Description,
    MainSection,
    SearchSection,
    SearchInputWrapper,
    SearchInput,
    SearchButton,
    TagsSection,
    TagGroup,
    TagLabel,
    TagsWrapper,
    LeaderContainer,
    MemberContainer,
    LeaderTag,
    MemberTag,
    DeleteButton,
    SearchResultsList,
    SearchResultItem,
    ProfileImage,
    ResultNickname
} from '../../styled-components/contact/styled-member-registration';

const TeamMemberSearch = ({ 
  teamMembers = [], 
  leader = null,
  setTeamMembers = () => {}, 
  searchResults = [], 
  handleSearch = () => {}, 
  handleAddMember = () => {}, 
  handleRemoveMember = () => {} 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Container>
      <Title>함께 한 팀원</Title>
      <Description>프로젝트를 함께하고 있는 팀원이 있다면 추가해주세요.</Description>
      
      <MainSection>
        <SearchSection>
          <SearchInputWrapper>
            <SearchInput
              placeholder="닉네임을 검색하여 추가해주세요"
              value={searchQuery}
              onChange={handleSearchInput}
            />
            <SearchButton>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M7.38863 14.4335C10.917 14.4335 13.7773 11.5732 13.7773 8.04488C13.7773 4.51654 10.917 1.65625 7.38863 1.65625C3.86029 1.65625 1 4.51654 1 8.04488C1 11.5732 3.86029 14.4335 7.38863 14.4335Z" stroke="#0D29B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.1212 18.1427L12.0684 13.0898" stroke="#0D29B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </SearchButton>
          </SearchInputWrapper>
          
          {searchResults?.length > 0 && (
            <SearchResultsList>
              {searchResults.map(result => (
                <SearchResultItem key={result.id} onClick={() => handleAddMember(result)}>
                  <ProfileImage src={result.profileImage} alt={result.nickname} />
                  <ResultNickname>{result.nickname}</ResultNickname>
                </SearchResultItem>
              ))}
            </SearchResultsList>
          )}
        </SearchSection>

        <TagsSection>
          <LeaderContainer>
            <TagLabel>리더</TagLabel>
            {leader && <LeaderTag>{leader.nickname}</LeaderTag>}
          </LeaderContainer>

          <MemberContainer>
            <TagLabel>팀원</TagLabel>
            <TagsWrapper>
              {teamMembers?.map(member => (
                <MemberTag key={member.id}>
                  {member.nickname}
                  <DeleteButton onClick={() => handleRemoveMember(member.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12" stroke="#0D29B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 4L12 12" stroke="#0D29B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </DeleteButton>
                </MemberTag>
              ))}
            </TagsWrapper>
          </MemberContainer>
        </TagsSection>
      </MainSection>
    </Container>
  );
};

TeamMemberSearch.propTypes = {
  teamMembers: PropTypes.array,
  leader: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string
  }),
  setTeamMembers: PropTypes.func,
  searchResults: PropTypes.array,
  handleSearch: PropTypes.func,
  handleAddMember: PropTypes.func,
  handleRemoveMember: PropTypes.func
};

export default TeamMemberSearch;
