import styled from "styled-components"

export const FeedWrap = styled.main`
width:100%;
height: auto;
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
border-radius: 16px;
display:flex;
flex-direction:column;
box-sizing: border-box;
padding:20px;
margin-top:30px;
`

export const FeedDate = styled.div`
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 14px;
letter-spacing: -0.02em;

color: #A0A0A0;

// 글씨 숨김 처리 추가
overflow: hidden; /* 넘치는 텍스트 숨김 */
    display: -webkit-box; /* flex 기반의 클리핑 박스 생성 */
    -webkit-box-orient: vertical; /* 텍스트 방향 설정 (수직) */
    -webkit-line-clamp: 3; /* 최대 줄 수를 3줄로 제한 */
    text-overflow: ellipsis; /* 줄임표(...) 표시 */
`

export const FeedTop = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
 align-items: flex-end; 
`

export const FeedTitle = styled.div`
font-style: normal;
font-weight: 600;
font-size: 15px;
line-height: 29px;
/* main */
color: #0D29B7;
`

export const FeedMain = styled.div`
margin: 20px 0 20px 0;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 20px;
/* or 150% */
letter-spacing: -0.02em;

color: #414141;


`

//페이지 메인 스타일
export const MainWrapp = styled.main`
padding:60px;
height: 100%;
height:100%;
width:40%;
max-width:550px;
`

export const Title = styled.h3`

`

export const SubTitle = styled.span`
font-style: normal;
font-size:15px;
`

export const SubupSec = styled.span`
font-size: 10px; 
color: #C2C2C2;
margin-bottom:5px;

`

export const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 0 0 10px;
  width:100%;
`;

export const PersonalField = styled.div`
display:flex;
flex-direction:column;
min-height:160px;
// background:pink;
`