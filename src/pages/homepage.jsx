import React from 'react';
import BannerSlider from '../components/BannerSlider';
import styled from 'styled-components';

const Homepage = () => {
  return (
    <PageWrapper>
      <BannerWrapper>
        <BannerSlider />
      </BannerWrapper>
      <TitleSection>
        <TitleBox>최근 등록된 콜라보레이션</TitleBox>
        <MoreButton>더보기 &gt;</MoreButton>
      </TitleSection>
      <TitleSection>
        <TitleBox>당장 주목해야 하는 동아리</TitleBox>
        <MoreButton>더보기 &gt;</MoreButton>
      </TitleSection>
      <TitleSection>
        <TitleBox>지금 함께하고 싶은 프로젝트</TitleBox>
        <MoreButton>더보기 &gt;</MoreButton>
      </TitleSection>
      <TitleSection>
        <TitleBox>지금 인기 있는 프로젝트</TitleBox>
        <MoreButton>더보기 &gt;</MoreButton>
      </TitleSection>
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

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  width: 60%;
  padding: 0;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-right: auto;
`;

const MoreButton = styled.button`
  background-color: transparent;
  color: #D3D3D3;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: normal;
  padding: 0 5px;
  margin-left: 10px;

  &:focus {
    outline: none;
  }

  &:hover {
    color: #A9A9A9;
  }
`;
