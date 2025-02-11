import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import * as S from '../../../styled-components/collab-styles/styled-Comment';
import axios from 'axios';
import useProfilePhoto from '../../../hooks/useProfilePhoto'; // useProfilePhoto 훅 import

const formatDate = (date) => {
  const d = new Date(date);
  const month = d.getMonth() + 1; 
  const day = d.getDate(); 
  return `${d.getFullYear()}. ${month}. ${day}`;
};

const Comment = ({ collabPostId, collabInquiryId, text, user, date, replies = [], onDelete, onUpdate, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [replyList, setReplyList] = useState(replies);
  const [error, setError] = useState(null);

  const { profileImageUrl } = useProfilePhoto(user.userId); // 사용자 프로필 사진 가져오기

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

  const handleEditSubmit = async () => {
    if (editedText.trim()) {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          setError('로그인이 필요합니다.');
          return;
        }

        const response = await axios.patch(
          `https://api.partnerd.site/api/collabInquiry/${collabInquiryId}`,
          { contents: editedText },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.isSuccess) {
          onUpdate(editedText);
          setEditMode(false);
          setError(null);
        }
      } catch (error) {
        setError('댓글을 수정하는 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }

      const response = await axios.delete(
        `https://api.partnerd.site/api/collabInquiry/${collabInquiryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        onDelete(collabInquiryId);
        setError(null);
      }
    } catch (error) {
      setError('댓글을 삭제하는 중 오류가 발생했습니다.');
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
      <S.SProfileImage src={profileImageUrl || '/default-profile.png'} alt="Profile" /> {/* 프로필 이미지 표시 */}
      <S.SCommentContent>
        <S.SCommentHeader>{user.nickname}</S.SCommentHeader> {/* 닉네임 표시 */}
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
        <S.SMenuItem onClick={handleDelete}>삭제하기</S.SMenuItem>
      </S.SMoreOptionsMenu>

      {error && <S.SErrorMessage>{error}</S.SErrorMessage>}
    </S.SCommentWrapper>
  ); 
};

export default Comment;
