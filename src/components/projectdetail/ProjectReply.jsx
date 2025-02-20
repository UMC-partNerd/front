import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import useUserInfo from '../../hooks/useUserInfo';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectReply';

const ProjectReply = ({ replyId, text, user, date, onDelete, onUpdate, jwtToken }) => {
  const [replyText, setReplyText] = useState(text);
  const [editMode, setEditMode] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(0); // 좋아요 숫자

  // useUserInfo 
  const { userInfo, isLoading, error } = useUserInfo(jwtToken);  

  // useBannerPhoto 
  const { profileImageUrl, isLoading: photoLoading, error: photoError } = useBannerPhoto(
    'myProfileImage', 
    userInfo?.nickname,  // nickname을 프로필 이미지 파일명으로 사용
    null, null, null, null
  );

  const handleOptionsClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setShowOptions(false);
  };

  const handleDeleteClick = () => {
    // 대댓글 삭제 함수 호출 (replyId를 부모로 전달)
    onDelete(replyId); // 대댓글만 삭제
  };
  
  const handleEditChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleEditSubmit = () => {
    if (replyText.trim()) {
      
      onUpdate(replyId, replyText);  
      setEditMode(false); 
    } else {
      setEditMode(false);  
      setReplyText(text);  
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleEditSubmit(); 
    }
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked;
      setLikeCount((prevCount) => (newLiked ? prevCount + 1 : prevCount - 1)); // 좋아요 수 증가/감소
      return newLiked;
    });
  };

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date) {
      const today = new Date();
      return `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
    }

    const d = new Date(date);
    
    if (isNaN(d)) {
      return "Invalid Date";
    }

    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${d.getFullYear()}. ${month}. ${day}`;
  };

  return (
    <S.SReplyWrapper>
      <S.SArrow />
      <S.SProfileImageReply src='/default-profile.png' />


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
            onKeyDown={handleKeyDown}
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