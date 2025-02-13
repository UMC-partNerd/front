import React from 'react';
import {
  ButtonContainer,
  NextContainer,
  PlusContainer,
} from '../../styled-components/styled-Button';

export const TYPES = {
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
    type={TYPES.NEXT}
    text='글 작성하기'
    onClick={onClickHandler}
  /> 
*/}

function Button({ type, text, onClick }) {
  const renderDefaultButton = () => (
    <ButtonContainer type={type} onClick={onClick}>
      {text}
    </ButtonContainer>
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

  if (type === TYPES.NEXT) {
    return renderNextButton();
  }

  if (type === TYPES.PLUS) {
    return renderPlusButton();
  }

  return renderDefaultButton();
}

export default Button;