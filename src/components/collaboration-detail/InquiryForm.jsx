import React, { useState } from 'react';
import styled from 'styled-components';

const InquiryForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onSubmit(text); // 상위 컴포넌트에서 처리하도록 변경
        setText('');
        setError(null);
      } else {
        setError('내용을 입력해주세요.');
      }
    }
  };

  return (
    <form>
      <InquiryTitle>문의하기</InquiryTitle>
      <Textarea
        placeholder="문의할 내용을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
};

export default InquiryForm;




const InquiryTitle = styled.h2`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
`;


const Textarea = styled.textarea`
  display: flex;
  width: 540px;
  height: 60px;  
  padding: 0 10px; 
  align-items: center;
  justify-content: start; 
  flex-shrink: 0;
  border-radius: 6px;
  border: 1.5px solid #E1E1E1;
  background: #FFF;  
  font-family: Pretendard;
  font-size: 15px;
  line-height: 60px;  
  resize: none;
  margin-top: 10px;
  outline: none;  
  ::placeholder {
    color: #f2f2f2;  
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;  
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;