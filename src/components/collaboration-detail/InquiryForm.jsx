import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const InquiryForm = ({ collabPostId, onAddComment }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        try {
          const token = localStorage.getItem('jwtToken');
          if (!token) {
            setError('로그인이 필요합니다.');
            return;
          }

          const response = await axios.post(
            'https://api.partnerd.site/api/collabInquiry/register',
            {
              collabPostId: parseInt(collabPostId, 10), 
              contents: text,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.data.isSuccess) {
            onAddComment(response.data.result);
            setText('');
            setError(null);
          }
        } catch (error) {
          setError('문의글을 등록하는 중 오류가 발생했습니다.');
        }
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