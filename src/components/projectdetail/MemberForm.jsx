import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Members from '../common/Members';
import useBannerPhoto from '../../hooks/useBannerPhoto';

const DefaultProfileImage = '/default-profile.png';

const MemberForm = ({ leaderInfo, projectMembers, promotionProjectMembers, isPromote }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // promote와 recruit에 따라 팀원 배열을 다르게 설정
    if (isPromote) {
      setMembers([leaderInfo, ...promotionProjectMembers]);
    } else {
      setMembers([leaderInfo, ...projectMembers]);
    }
  }, [leaderInfo, projectMembers, promotionProjectMembers, isPromote]);

  return (
    <FormWrapper>
      <Title>함께 한 팀원</Title>
      <MembersWrapper>
        {members.map((member, index) => (
          <Member key={index} member={member} isLeader={member.id === leaderInfo.id} />
        ))}
      </MembersWrapper>
    </FormWrapper>
  );
};

const Member = ({ member, isLeader }) => {
  const { profilePhotoUrl, isLoading, error } = useBannerPhoto(
    'myProfileImage',  
    null,               
    null,               
    [],                
    null,               
    null,               
    member.profileKeyName 
  );

  return (
    <div>
      <Members
        name={member.nickname}
        image={profilePhotoUrl || DefaultProfileImage}  
        isLeader={isLeader}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default MemberForm;

const FormWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
`;

const Title = styled.h3`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
`;

const MembersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap; 
`;
