import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from "react-icons/fi";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import Reply from './Reply';
import ReplyInput from './ReplyInput'; 

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
      user: "사용자 이름", // 실제 사용자 이름으로 변경 필요
      date: new Date().toISOString().split('T')[0], // 현재 날짜로 변경
    };
    setReplyList([...replyList, newReply]); // 답글 목록 업데이트
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
    <CommentWrapper>
      <ProfileImage />
      <CommentContent>
        <CommentHeader>{user}</CommentHeader>
        <CommentMeta>{formattedDate}</CommentMeta>
        <CommentBody>
          {editMode ? (
            <CommentInput
              type="text"
              value={editedText}
              onChange={handleEditChange}
              onBlur={handleEditSubmit}
              autoFocus
            />
          ) : (
            <CommentText>{text}</CommentText>
          )}
          <ReplyButton onClick={() => setShowReply(!showReply)}>답글달기</ReplyButton>
        </CommentBody>
  
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
      </CommentContent>
  
      <FiMoreVertical
        onClick={handleOptionsClick}
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          cursor: 'pointer',
        }}
      />
  
      <MoreOptionsMenu show={showOptions}>
        <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
        <Divider />
        <MenuItem onClick={onDelete}>삭제하기</MenuItem>
      </MoreOptionsMenu>
    </CommentWrapper>
  ); 
};

const Arrow = styled(PiArrowElbowDownRightBold)`
  position: absolute;
  left: -30px;
  top: 10px;
  font-size: 18px;
  color: #08d485;
`;

const ReplyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 500px;
  min-height: 100px;
  padding: 8px;
  background-color: #fff;
  margin-top: 20px;
  background-color: #F6F6F6;
  border-radius: 6px;
  position: relative;
`;

const ProfileImageReply = styled.div`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 15px;
`;

const ReplyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const ReplyHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ReplyMeta = styled.div`
  font-size: 13px;
  margin-top: 10px;
  color: #c2c2c2;
  font-weight: 500;
`;

const ReplyText = styled.p`
  font-size: 15px;
  color: #212121;
  font-weight: 600;
  margin: 17px 0 5px 0;
  flex-grow: 1;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 540px;
  min-height: 90px;
  padding: 8px;
  background-color: #fff;
  margin-top: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const ProfileImage = styled.div`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 15px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const CommentMeta = styled.div`
  font-size: 13px;
  margin-top: 10px;
  color: #c2c2c2;
  font-weight: 500;
`;

const CommentBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 5px;
`;

const CommentText = styled.p`
  font-size: 15px;
  color: #212121;
  font-weight: 600;
  margin: 17px 0 5px 0;
  flex-grow: 1;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
`;

const ReplyButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: #c2c2c2;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;

const MoreOptionsMenu = styled.div`
  position: absolute;
  right: 10px;
  top: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.15);
  width: 120px;
  height: 100px;
  padding: 0;
  flex-direction: column;
  justify-content: center;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.4px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Divider = styled.div`
  width: 80%;
  height: 1px;
  background-color: #ddd;
  margin: 0 auto;
`;

export default Comment;
