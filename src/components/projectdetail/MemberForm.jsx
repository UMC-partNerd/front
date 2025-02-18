import React, { useState } from 'react';
import styled from 'styled-components';
import Members from '../common/Members';

const MemberForm = () => {
  const [members, setMembers] = useState([
    { name: "김민수", image: "https://placekitten.com/70/70" },
    { name: "이하늘", image: "https://placekitten.com/70/70" },
    { name: "박지훈", image: "https://placekitten.com/70/70" },
    { name: "최유리", image: "https://placekitten.com/70/70" },
  ]);

  return (
    <FormWrapper>
      <Title>함께 한 팀원</Title>
      <MembersWrapper>
        {members.map((member, index) => (
          <Members key={index} name={member.name} image={member.image} />
        ))}
      </MembersWrapper>
    </FormWrapper>
  );
};

export default MemberForm;

// 스타일링
const FormWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
`;

const Title = styled.h3`
   color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
`;


const MembersWrapper = styled.div`
  display: flex;
  justify-content: space-between; /
  gap: 20px; /* 팀원 간 간격 */
  flex-wrap: wrap; 
`;
