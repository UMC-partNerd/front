import React, { useState } from 'react';
import styled from 'styled-components';
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import { FiMoreVertical } from "react-icons/fi";


const ReplyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 470px;
  padding: 8px;
  background-color: #F6F6F6;
  margin-top: 5px;
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px; 
`;

const ProfileImageReply = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 10px;
  margin-top: 10px;
`;

const ReplyContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  position: relative;
`;

const ReplyInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
  line-height: -0.4px;
`;

const ReplyText = styled.p`
  font-size: 15px;
  color: #212121;
  font-weight: 600;
  margin: 10px 0 5px 0;
`;

const Arrow = styled(PiArrowElbowDownRightBold)`
  position: absolute;
  left: -30px;
  top: 10px;
  font-size: 18px;
  color: #08d485;
`;

const MoreOptionsMenu = styled.div`
  position: absolute;
  right: 10px;
  top: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
  width: 120px;
  height: 100px;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  z-index: 10; 
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

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

const Reply = ({ text, user, date, onDelete, onUpdate }) => {
  const [replyText, setReplyText] = useState(text);
  const [editMode, setEditMode] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setShowOptions(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setShowOptions(false);
  };

  const handleEditChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleEditSubmit = () => {
    if (replyText.trim()) {
      onUpdate(replyText);
      setEditMode(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${d.getFullYear()}. ${month}. ${day}`;
  };

  return (
    <ReplyWrapper>
      <Arrow />
      <ProfileImageReply />
      <ReplyContent>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{user}</div>
          <div style={{ fontSize: '13px', color: '#c2c2c2', fontWeight: '500', marginBottom: '5px' }}>
            {formatDate(date)}
          </div>
        </div>
        {editMode ? (
          <ReplyInput
            type="text"
            value={replyText}
            onChange={handleEditChange}
            onBlur={handleEditSubmit}
            autoFocus
          />
        ) : (
          <ReplyText>{replyText}</ReplyText>
        )}
      </ReplyContent>

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
        <MenuItem onClick={handleDeleteClick}>삭제하기</MenuItem>
      </MoreOptionsMenu>
    </ReplyWrapper>
  );
};

export default Reply;
