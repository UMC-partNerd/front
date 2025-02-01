import React from 'react';
import styled from 'styled-components';

const TeamInfo = ({ name, description, category, contact = [] }) => (
  <Container>
    <HeaderContainer>
      <BadgeTitleContainer>
        <Badge>{category}</Badge>
        <Title>{name}</Title>
      </BadgeTitleContainer>
      <ManageLink>팀페이지 관리 &nbsp;&gt;</ManageLink>
    </HeaderContainer>
    <SubTitle>{description}</SubTitle>

    <ContactInfoContainer>
      {contact.length > 0 ? contact.map((item, index) => (
        <ContactItem key={index}>
          <ContactType>{item.type}:</ContactType>
          <ContactLink>{item.link}</ContactLink>
        </ContactItem>
      )) : <div>연락처 정보가 없습니다.</div>}
    </ContactInfoContainer>
  </Container>
);

export default TeamInfo;


const Container = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 45px;
  border-bottom: 1px solid #E1E1E1; 
  max-width: 800px; 
  width: 100%; 
  height: 290px;
  box-sizing: border-box; 
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

const BadgeTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 3px;
  margin-top: 7px;
`;

const SubTitle = styled.p`
  font-size: 500;
  margin-bottom: 10px;
  color: #707070;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 5px 20px;
  margin: 5px 0;
  border-radius: 30px;
  background-color: #DDFCF0;
  color: #08D485;
  font-size: 600;
  font-weight: bold;
  border: 1.5px solid #08D485;
  width: 60px;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  text-align: center; 
  line-height: 1.5; 
`;


const ManageLink = styled.button`
  background: none;
  border:none;
  color: #A0A0A0;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 15px;
  white-space: nowrap; 
  &:hover {
    text-decoration: underline;
  }
`;

const ContactInfoContainer = styled.div`
  margin-top: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ContactType = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #212121;
`;

const ContactLink = styled.span`
  color: #707070;
  font-size: 1em;
  &:hover {
    text-decoration: none;
  }
`;
