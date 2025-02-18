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
    if (text.trim() === '') {
      alert('답글을 입력해주세요!');  
      return;
    }
    console.log("새로운 댓글 내용:", text); 
    onReply(text);  
    setText(''); 
    onClose();   
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

