import React from 'react';
import {
  ButtonContainer,
  VoteContainer,
  NextContainer,
  PlusContainer,
} from '../../styled-components/styled-Button';

export const TYPES = {
  CANCEL: 'cancel', // x // 팀페이지 관리(멤버버)
  VOTE: 'vote',     // 프로젝트 홍보 응원하기
  NEXT: 'next',     // 큰
  PLUS: 'plus',
  YES: 'yes',     // 승인: 파랑
  NO: 'no'        // 거절: 흰색
};

// import Button, { TYPES } from "../common/button";
// import { useNavigate } from 'react-router-dom';

// useNavigate 훅을 사용하여 이동 기능 추가
// const navigate = useNavigate();
// const onClickHandler = () => {
//   navigate('/collaboration/collab-registration');
// };

// isLoading

{/* <Button
    type={TYPES.PLUS}
    text='글 작성하기'
    onClick={onClickHandler}
/> */}

const XButton = '/xBtn.png'; // 기본 이미지

function Button({ width, height, fontSize, type, sign, text, count, onClick }) {
  const renderDefaultButton = () => (
    <ButtonContainer type={type} onClick={onClick}>
      {text}
    </ButtonContainer>
  );

  const renderCancelButton = () => (
    <div type={type} onClick={onClick}>
      <img src={XButton} />
    </div>
  );

  const renderVoteButton = () => (
    <VoteContainer type={type} onClick={onClick}>
      응원하기 {count}
    </VoteContainer>
  );

  const renderNextButton = () => (
    <NextContainer type={type} onClick={onClick}>
      {text}
    </NextContainer>
  );

  const renderPlusButton = () => (
    <PlusContainer type={type} onClick={onClick}>
      {text}
    </PlusContainer>
  );

  if (type === TYPES.CANCEL) {
    return renderCancelButton();
  }

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