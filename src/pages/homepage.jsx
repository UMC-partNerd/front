import React from 'react';
import BannerSlider from '../components/BannerSlider';
import Collaboration from '../components/Collaboration';
import Project from '../components/Project';
import Club from '../components/Club';
import styled from 'styled-components';

const Homepage = () => {
  return (
    <PageWrapper>
      <BannerWrapper>
        <BannerSlider />
      </BannerWrapper>
      <ContentSection>
        <Collaboration />
      </ContentSection>
      <ContentSection>
        <Club />
      </ContentSection>
      <ContentSection>
        <Project />
      </ContentSection>
      <ContentSection>
        <Project />
      </ContentSection>
    </PageWrapper>
  );
};

export default Homepage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  align-items: center;
  font-family: 'Pretendard', sans-serif; 
`;

const BannerWrapper = styled.div`
  width: 100%;
`;

const ContentSection = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 100px; 
  padding: 0;
  box-sizing: border-box;
`;
