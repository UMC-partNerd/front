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

  // useUserInfo 훅을 통해 사용자 정보 가져오기
  const { userInfo, isLoading, error } = useUserInfo(jwtToken);  // jwtToken을 전달하여 사용자 정보 가져오기

  // useBannerPhoto 훅을 사용하여 프로필 이미지 가져오기
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
    onDelete(replyId); // 대댓글만 삭제하도록 처리
  };
  
  const handleEditChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleEditSubmit = () => {
    if (replyText.trim()) {
      // 수정된 대댓글 내용과 replyId를 부모 컴포넌트로 전달
      onUpdate(replyId, replyText);  // 수정된 대댓글 내용과 replyId 전달
      setEditMode(false); // 입력창 닫기
    } else {
      setEditMode(false);  // 빈 텍스트일 경우에도 편집 모드 종료
      setReplyText(text);  // 원래 텍스트로 되돌림
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 키 동작 방지
      handleEditSubmit(); // 댓글 전송 및 입력 창 닫기
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
      <S.SProfileImageReply src={photoLoading ? '/default-profile.png' : profileImageUrl} alt="Profile" />
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
            onBlur={handleEditSubmit}  // 이 부분 추가: 수정 후 자동으로 닫히게 됩니다.
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
