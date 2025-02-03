import styled from "styled-components";

//채팅 컴포넌트 스타일

//메인 화면
export const ChatWrapp = styled.aside`
border-radius: 16px;
background: #FFF;
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

width:25vw;
max-width: 300px;
min-height: 358px;
height:100%;

box-sizing: border-box;
padding:20px;

display:flex;
flex-direction:column;
justify-content: space-between;
`

//타이틀
export const Title = styled.span`
color: #212121;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.48px;

`

//채팅 버튼
export const ChatButton = styled.button`

display: flex;
width: 100%;
height: 60px;
padding: 18px 63px;
justify-content: center;
align-items: center;
gap: 8px;
flex-shrink: 0;

color: var(--main, #0D29B7);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
letter-spacing: -0.4px;

border-radius: 8px;
border: 1px solid #0D29B7;
background: #FFF;
box-shadow: 0px 2px 8px 0px rgba(8, 32, 152, 0.30);
`

//이름 필드
export const NameField = styled.div`
display:flex;
flex-direction:column;
margin-left:20px;
`

export const Name = styled.div`
font-size:14px;
color: #707070;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 125% */
letter-spacing: -0.32px;
`

export const Explan = styled.div`
margin-top:5px;
font-size:14px;
`

//이미지 컴포넌트
export const ImageComp = styled.div`
border-radius: 50%;
background:gray;
min-width: 50px; /* 최소 너비를 고정 */
  max-width: 50px; /* 최대 너비를 고정 */
  min-height: 50px; /* 최소 높이를 고정 */
  max-height: 50px; /* 최대 높이를 고정 */
`

//이름 필드에서 사용
export const SubContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`

// 회색 글씨
export const GrayText = styled.div`
color: #A0A0A0;
font-family: Pretendard;
font-size: 17px;
font-style: normal;
font-weight: 500;
line-height: normal;
display:flex;
letter-spacing: -0.4px;
justify-content: center;
align-items:center;
`

export const DetailWrapp = styled.div`
display:flex;
flex-direction:column;
gap:30px;
`