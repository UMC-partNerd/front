import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ReplyInput = ({ onReply, onClose }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    // 댓글 내용이 비어있지 않으면 onReply 호출
    if (text.trim() === '') {
      alert('답글을 입력해주세요!');  // 텍스트가 없으면 알림
      return;
    }
    console.log("새로운 댓글 내용:", text);  // 텍스트 확인
    onReply(text);  // 부모 컴포넌트로 댓글 전송
    setText(''); // 입력란 비우기
    onClose();   // 입력창 닫기
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSubmit(); // 댓글 전송
    }
  };

  return (
    <InputWrapper>
      <Input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="답글을 입력하세요..."
        onKeyDown={handleKeyDown} 
      />
    </InputWrapper>
  );
};

export default ReplyInput;

