import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import ProjectReply from './ProjectReply';
import ReplyInput from '../collaboration-detail/comments/ReplyInput';
import useBannerPhoto from '../../hooks/useBannerPhoto';  // useBannerPhoto 훅 임포트
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectComment';

const ProjectComment = ({ commentId, text, date, replies = [], onDelete, onUpdate, onReply, type, jwtToken, nickname, profileKeyName }) => {
  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text); // 댓글 수정 상태
  const [replyList, setReplyList] = useState(replies); // 대댓글 상태
  const [likes, setLikes] = useState(0); 
  const [liked, setLiked] = useState(false); 

  // useBannerPhoto 훅을 사용하여 프로필 이미지 URL 가져오기
  const { profilePhotoUrl } = useBannerPhoto('', '', '', '', '', '', profileKeyName);

  const handleReplyClick = () => setShowReply(prev => !prev);
  const handleOptionsClick = () => setShowOptions(prev => !prev);

  const handleEditClick = () => {
    setEditMode(true);
    setShowOptions(false);
    setEditedText(text);
  };

  const handleEditChange = (e) => setEditedText(e.target.value); 

  const handleEditSubmit = () => {
    if (editedText.trim()) {
      onUpdate(commentId, editedText, type);
      setEditMode(false);
    } else {
      setEditMode(false);  
      setEditedText(text); 
    }
  };

  const handleReplySubmit = (replyText) => {
    if (!replyText.trim()) return;  // 빈 댓글 방지
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`; // 오늘 날짜 포맷
    
    // 새로운 대댓글 객체 생성
    const newReply = {
      contents: replyText,  
      nickname: nickname || "임시 닉네임",  // 유저 닉네임 사용
      profileKeyName: profileKeyName || '/default-profile.png',  // 유저 프로필 이미지 URL
      projectCommentId: commentId,
      date: formattedDate,  
    };
  
    onReply(replyText, commentId, type);  // 대댓글 추가 처리
    setReplyList([...replyList, newReply]);
    setShowReply(false);  
  };

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1)); 
    setLiked(!liked);
  };

  const handleDeleteClick = () => {
    onDelete(commentId, type); 
    setReplyList([]);  
  };

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date) {
      const today = new Date();
      return `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
    }
    const dateParts = date.match(/(\d{4})\.\s*([\d]{1,2})\.\s*([\d]{1,2})/);
    return dateParts ? `${dateParts[1]}. ${dateParts[2]}. ${dateParts[3]}` : "Invalid Date";
  };

  const formattedDate = formatDate(date);

  return (
    <S.SCommentWrapper>
  {/* 프로필 이미지 */}
  <S.SProfileImage src={profilePhotoUrl || '/default-profile.png'} alt="Profile" />

  <S.SCommentContent>
    {/* 댓글 사용자 이름 */}
    <S.SCommentHeader>{nickname || "임시 닉네임"}</S.SCommentHeader>
    <S.SCommentMeta>
      <S.SDateText>{formattedDate}</S.SDateText>
      <S.SLikeButtonWrapper>
        <S.SLikeButton onClick={handleLike}>
          <CiHeart color={liked ? "red" : "gray"} size={20} />
        </S.SLikeButton>
        <S.SLikeCount>{likes}</S.SLikeCount>
      </S.SLikeButtonWrapper>
    </S.SCommentMeta>

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
  </S.SCommentContent>

  {/* 대댓글 목록 */}
  {replyList.map((reply, index) => (
    <div key={index} style={{ marginTop: '10px' }}>
      <ProjectReply 
        replyId={reply.projectCommentId}  
        text={reply.contents}  
        user={reply.nickname}  
        date={reply.date} 
        profileKeyName={reply.profileKeyName} // 대댓글의 프로필 이미지
        onDelete={(replyId) => {
          setReplyList(replyList.filter((r) => r.projectCommentId !== replyId));
          onDelete(replyId, 'reply');
        }}
        onUpdate={(replyId, newText) => {
          setReplyList(replyList.map((r) => r.projectCommentId === replyId ? { ...r, contents: newText } : r));
          onUpdate(replyId, newText, 'reply');
        }}
      />
    </div>
  ))}

  {showReply && (
    <ReplyInput 
      onReply={handleReplySubmit} 
      onClose={() => setShowReply(false)} 
    />
  )}
  
  <FiMoreVertical
    onClick={handleOptionsClick}
    style={{
      position: 'absolute',
      right: '30px',
      top: '18px',
      cursor: 'pointer',
    }}
  />

  <S.SMoreOptionsMenu show={showOptions}>
    <S.SMenuItem onClick={handleEditClick}>수정하기</S.SMenuItem>
    <S.SDivider />
    <S.SMenuItem onClick={handleDeleteClick}>삭제하기</S.SMenuItem>
  </S.SMoreOptionsMenu>
</S.SCommentWrapper>

  );
};

export default ProjectComment;

