import React from 'react';
import { Title, SubTitle, SmallText, Badge, SectionWrapper, Divider, DateText, BadgeWrapper } from '../../styled-components/projectdetail-styles/styled-JoinProjectInfo';

const JoinProjectInfo = ({ projectData }) => {
  // part 필드를 쉼표(,)로 분리하여 배열로 만듬
  const partList = projectData.part ? projectData.part.split(',') : [];

  // 기술 스택을 쉼표로 구분해서 배열로 만듬
  const skillList = projectData.skill ? projectData.skill.split(',') : [];

  // 날짜 포맷을 수정하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString); // 문자열을 Date 객체로 변환
    return date.toLocaleDateString('ko-KR', { // 'ko-KR'은 한국 날짜 포맷
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\./g, '.'); // "2025.02.12" 형태로 수정
  };

  return (
    <div>
      <Title>이런 분을 찾아요</Title>

      <BadgeWrapper>
        {partList.length > 0 ? partList.map((part, index) => (
          <Badge key={index}>{part.trim()}</Badge>  
        )) : "Part 정보가 없습니다."}
      </BadgeWrapper>

      <SubTitle>필요한 인원</SubTitle>
      <SmallText>{projectData.recruitNum}</SmallText>  

      <SectionWrapper>
        <SubTitle>필요한 역량</SubTitle>
        <SmallText> 
          {skillList.length > 0 ? skillList.map((skill, index) => (
            <div key={index}>• {skill.trim()}</div>  
          )) : "필요한 역량 정보가 없습니다."}
        </SmallText>
      </SectionWrapper>

      <Divider />

      <Title isDate={true}>모집 마감일</Title>
      <DateText>{formatDate(projectData.startDate)} ~ {formatDate(projectData.endDate)}</DateText>
    </div>
  );
};

export default JoinProjectInfo;
