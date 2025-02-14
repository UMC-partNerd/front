import styled from 'styled-components';

export const SContainer = styled.div`
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

export const SHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const SBadgeTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const STitle = styled.h1`
  font-size: 2em;
  margin-bottom: 3px;
  margin-top: 7px;
`;

export const SSubTitle = styled.p`
  font-size: 500;
  margin-bottom: 10px;
  color: #707070;
`;

export const SBadge = styled.span`
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

export const SContactInfoContainer = styled.div`
  margin-top: 20px;
`;

export const SContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  color: #707070;
  font-family: Pretendard;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;

export const SContactType = styled.span`
  font-weight: 600; 
  margin-right: 10px;
  color: #212121;
  letter-spacing: -0.4px;
  line-height: normal;
`;

export const SContactLink = styled.span`
  color: #707070;
  font-size: 1em;
  &:hover {
    text-decoration: none;
  }
`;

export const SMoreOptionsMenu = styled.div`
  position: absolute;
  right: 0px;  /* right 값을 0px로 설정하여 아이콘 바로 아래에 배치 */
  top: 20px;  /* top 값을 수정하여 아이콘 바로 밑으로 위치시키기 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.15);
  width: 130px;
  height: 110px;
  padding: 0;
  flex-direction: column;
  justify-content: center;
`;

export const SMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.4px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const SDivider = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  margin-left: 10px;
`;
