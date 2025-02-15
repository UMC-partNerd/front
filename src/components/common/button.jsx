import React from 'react';
import {
  ButtonContainer,
  VoteContainer,
  NextContainer,
  PlusContainer,
} from '../../styled-components/styled-Button';

export const TYPES = {
  VOTE: 'vote', // 프로젝트 홍보 응원하기
  NEXT: 'next', // 큰
  PLUS: 'plus',
  YES: 'yes',   // 승인: 파랑
  NO: 'no'      // 거절: 흰색
};

{/* 

  import Button, { TYPES } from "../components/common/button";
  import { useNavigate } from 'react-router-dom';

  // useNavigate 훅을 사용하여 이동 기능 추가
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/collaboration/collab-registration');
  };

  isLoading
  
  <Button
    width={width} 
    height={height} 
    fontSize={fontSize}
    type={TYPES.NEXT}
    sign='true'
    text='글 작성하기'
    onClick={onClickHandler}
  /> 
*/}

function Button({ width, height, fontSize, type, count, sign, text, onClick }) {
  const renderDefaultButton = () => (
    <ButtonContainer width={width} height={height} fontSize={fontSize} type={type} onClick={onClick}>
      {text}
    </ButtonContainer>
  );

  const renderVoteButton = () => (
    <VoteContainer type={type} onClick={onClick}>
      응원하기 {count}
    </VoteContainer>
  );

  const renderNextButton = () => (
    <NextContainer width={width} height={height} fontSize={fontSize} type={type} onClick={onClick}>
      {text}
    </NextContainer>
  );

  const renderPlusButton = () => (
    <PlusContainer width={width} height={height} fontSize={fontSize} type={type} sign={sign} onClick={onClick}>
      {text}
    </PlusContainer>
  );

  if (type === TYPES.VOTE) {
    return renderVoteButton();
  }

  if (type === TYPES.NEXT) {
    return renderNextButton();
  }

  if (type === TYPES.PLUS) {
    return renderPlusButton();
  }

  return renderDefaultButton();
}

export default Button;