import React, { useState } from 'react';
import styled from 'styled-components';

// 문의하기 제목 스타일
const InquiryTitle = styled.h2`
  color: #212121;
  font-family: Pretendard, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
`;

// 문의하기 입력창 스타일
const Textarea = styled.textarea`
  display: flex;
  width: 540px;
  height: 60px;  
  padding: 0 10px;  // 상하 패딩을 없애고 좌우 패딩을 조정
  align-items: center;
  justify-content: start;  // 좌측 정렬
  flex-shrink: 0;
  border-radius: 6px;
  border: 1.5px solid #E1E1E1;
  background: #FFF;  
  font-family: Pretendard;
  font-size: 15px;
  line-height: 60px;  // 세로 가운데 정렬
  resize: none;
  margin-top: 10px;
  outline: none;  // 포커스 시 검은 줄 제거
  ::placeholder {
    color: #f2f2f2;  
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;  // 세로 가운데 정렬
  }
`;

const InquiryForm = ({ onAddComment }) => {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onAddComment(text);
        setText('');
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
    </form>
  );
};

export default InquiryForm;