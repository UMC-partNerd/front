import React, { useState } from 'react';
import { CommentInputWrapper, Textarea, SvgIcon } from '../../styled-components/community-styles/styled-CommentInput';

const CommentInput = ({ onAddComment }) => {
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

  const handleSendClick = () => {
    if (text.trim()) {
      onAddComment(text);
      setText('');
    }
  };

  return (
    <form>
      <CommentInputWrapper>
        <Textarea
          placeholder="댓글을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SvgIcon onClick={handleSendClick}>
          <img src="/send.svg" alt="send" />
        </SvgIcon>
      </CommentInputWrapper>
    </form>
  );
};

export default CommentInput;
