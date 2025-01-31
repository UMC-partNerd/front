import React from "react";
import { BannerWrapper, LargeText, SmallText } from "./BannerStyled";

const Banner = ({ largeText, smallText }) => {
  return (
    <BannerWrapper>
      <LargeText>{largeText}</LargeText>
      <SmallText>{smallText}</SmallText>
    </BannerWrapper>
  );
};

export default Banner;

/* 
   채팅 협업 요청 배너를 제외한 나머지 배너에 사용하시면 됩니다!
  largeText에는 큰 글씨, 예) 파트너드 등록 페이지- 프로젝트 등록하기
  smallText에는 작은 글씨, 예) "팀원을 모집하고 싶다면 나의 프로젝트를 등록해보세요!
*/



