import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import * as S from '../../../styled-components/collab-styles/styled-Comment'; 

const formatDate = (date) => {
  const d = new Date(date);
  const month = d.getMonth() + 1; 
  const day = d.getDate(); 
  return `${d.getFullYear()}. ${month}. ${day}`;
};

const Comment = ({ text, user, date, replies = [], onDelete, onUpdate, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [replyList, setReplyList] = useState(replies); 

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  const handleOptionsClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setShowOptions(false);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditSubmit = () => {
    if (editedText.trim()) {
      onUpdate(editedText);
      setEditMode(false);
    }
  };

  const handleReplySubmit = (replyText) => {
    const newReply = {
      text: replyText,
      user: "사용자 이름", 
      date: new Date().toISOString().split('T')[0], 
    };
    setReplyList([...replyList, newReply]); 
    setShowReply(false);
  };

  const handleReplyUpdate = (index, newText) => {
    const updatedReplies = [...replyList];
    updatedReplies[index].text = newText;
    setReplyList(updatedReplies);
  };

  const handleReplyDelete = (index) => {
    const updatedReplies = replyList.filter((_, i) => i !== index);
    setReplyList(updatedReplies);
  };

  const formattedDate = formatDate(date);

  return (
    <S.SCommentWrapper>
      <S.SProfileImage />
      <S.SCommentContent>
        <S.SCommentHeader>{user}</S.SCommentHeader>
        <S.SCommentMeta>{formattedDate}</S.SCommentMeta>
        <S.SCommentBody>
          {editMode ? (
            <S.SCommentInput
              type="text"
              value={editedText}
              onChange={handleEditChange}
              onBlur={handleEditSubmit}
              autoFocus
            />
          ) : (
            <S.SCommentText>{text}</S.SCommentText>
          )}
          <S.SReplyButton onClick={() => setShowReply(!showReply)}>답글달기</S.SReplyButton>
        </S.SCommentBody>
  
        {replyList.map((reply, index) => (
          <Reply
            key={index}
            text={reply.text}
            user={reply.user}
            date={reply.date}
            onUpdate={(newText) => handleReplyUpdate(index, newText)}
            onDelete={() => handleReplyDelete(index)}
          />
        ))}
  
        {showReply && (
          <ReplyInput 
            onReply={handleReplySubmit} 
            onClose={() => setShowReply(false)} 
          />
        )}
      </S.SCommentContent>
  
      <FiMoreVertical
        onClick={handleOptionsClick}
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          cursor: 'pointer',
        }}
      />
  
      <S.SMoreOptionsMenu show={showOptions}>
        <S.SMenuItem onClick={handleEditClick}>수정하기</S.SMenuItem>
        <S.SDivider />
        <S.SMenuItem onClick={onDelete}>삭제하기</S.SMenuItem>
      </S.SMoreOptionsMenu>
    </S.SCommentWrapper>
  ); 
};

export default Comment;