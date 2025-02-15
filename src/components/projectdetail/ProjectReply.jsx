import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";  
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectReply';

const ProjectReply = ({ text, user, date, onDelete, onUpdate }) => {
  const [replyText, setReplyText] = useState(text);
  const [editMode, setEditMode] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(0); // 좋아요 숫자

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

  const handleLikeClick = () => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked;
      setLikeCount((prevCount) => (newLiked ? prevCount + 1 : prevCount - 1)); // 좋아요 수 증가/감소
      return newLiked;
    });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${d.getFullYear()}. ${month}. ${day}`;
  };

  return (
    <S.SReplyWrapper>
      <S.SArrow />
      <S.SProfileImageReply />
      <S.SReplyContent>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{user}</div>
          <div style={{ fontSize: '13px', color: '#c2c2c2', fontWeight: '500', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
            <S.SDateText>{formatDate(date)}</S.SDateText>
            <S.SLikeWrapper>
              <S.SLikeButton onClick={handleLikeClick} liked={liked}>
                <CiHeart />
              </S.SLikeButton>
              <S.SLikeCount>{likeCount}</S.SLikeCount>
            </S.SLikeWrapper>
          </div>
        </div>
        {editMode ? (
          <S.SReplyInput
            type="text"
            value={replyText}
            onChange={handleEditChange}
            onBlur={handleEditSubmit}
            autoFocus
          />
        ) : (
          <S.SReplyText>{replyText}</S.SReplyText>
        )}
      </S.SReplyContent>

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
        <S.SMenuItem onClick={handleDeleteClick}>삭제하기</S.SMenuItem>
      </S.SMoreOptionsMenu>
    </S.SReplyWrapper>
  );
};

export default ProjectReply;