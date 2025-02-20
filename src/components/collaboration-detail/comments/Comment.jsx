import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import * as S from '../../../styled-components/collab-styles/styled-Comment';
import CustomModal, { VERSIONS } from "../../common/button/CustomModal";

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
  const [openModal, setOpenModal] = useState(false);

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
      onUpdate(collabPostId, collabInquiryId, editedText); // 수정 시 collabPostId와 collabInquiryId 함께 전달
      setEditMode(false);
    }
  };

  const deleteComment = () => {
    setOpenModal(true);
  };

  const handleDelete = () => {
    onDelete(collabPostId, collabInquiryId); // 삭제 시 collabPostId와 collabInquiryId 함께 전달
  };

  const handleReplySubmit = (replyText) => {
    const newReply = {
      text: replyText,
      user: "사용자 이름", 
      date: new Date().toISOString().split('T')[0],
    };
    setReplyList([...replyList, newReply]);
    setShowReply(false);
    onReply(collabPostId, collabInquiryId, replyText); // 댓글의 ID와 함께 대댓글 처리
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
      <S.SProfileImage 
      src={profileImageUrl ? profileImageUrl : '/default-profile.png'} 
      alt="Profile" 
      />

      <S.SCommentContent>
        <S.SCommentHeader>{user.nickname}</S.SCommentHeader>
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
          <S.SReplyButton onClick={handleReplyClick}>답글달기</S.SReplyButton>
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
        <S.SMenuItem onClick={deleteComment}>삭제하기</S.SMenuItem>
      </S.SMoreOptionsMenu>

      <CustomModal
        openModal={setOpenModal} 
        closeModal={() => setOpenModal(false)}
        boldface='댓글을 삭제하시겠습니까?'
        regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
        text='삭제하기'
        onClickHandler={handleDelete}
        variant={VERSIONS.VER3}
      />

      {error && <S.SErrorMessage>{error}</S.SErrorMessage>}
    </S.SCommentWrapper>
  );
};

export default Comment;
