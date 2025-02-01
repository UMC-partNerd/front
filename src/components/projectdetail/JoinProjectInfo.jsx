import React from 'react';
import { Title, SubTitle, SmallText, Badge, SectionWrapper, Divider, DateText, BadgeWrapper } from '../../styled-components/projectdetail-styles/styled-JoinProjectInfo';

const JoinProjectInfo = () => {
  return (
    <div>
      <Title>이런 분을 찾아요</Title>

      <BadgeWrapper>
        <Badge>Web</Badge>
        <Badge>Server</Badge>
      </BadgeWrapper>

      <SubTitle>필요한 인원</SubTitle>
      <SmallText>Web 3명, Server (SpringBoot) 2명</SmallText>

      <SectionWrapper>
        <SubTitle>필요한 역량</SubTitle>
        <SmallText> 
          • 채팅 기능을 구현할 수 있는 분 <br />
          • Docker와 Socket 사용을 잘하실 수 있는 분
        </SmallText>
      </SectionWrapper>

      <Divider />

      <Title isDate={true}>모집 마감일</Title>
      <DateText>2025. 01. 19 ~ 2025. 01. 31</DateText>
    </div>
  );
};

export default JoinProjectInfo;
