<<<<<<< HEAD
const HomePage = () => {
    return(
        <>
        <h3>홈페이지.</h3>
        </>
    )
}

export default HomePage
=======
import React from 'react';
import BannerSlider from '../components/home/BannerSlider';
import Collaboration from '../components/home/Collaboration';
import Project from '../components/home/Project';
import Club from '../components/home/Club';
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
        <Project 
          title="지금 함께하고 싶은 프로젝트" 
          type="recent" 
        />
      </ContentSection>
      <ContentSection>
        <Project 
          title="지금 인기 있는 프로젝트" 
          type="popular" 
        />
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
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 100px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;
>>>>>>> d5766451815f519c6166c822b35e4ad219eb80e9
