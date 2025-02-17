import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import ProjectReply from './ProjectReply';
import ReplyInput from '../collaboration-detail/comments/ReplyInput';
import useUserInfo from '../../hooks/useUserInfo';
import useBannerPhoto from '../../hooks/useBannerPhoto';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectComment';

const ProjectComment = ({ commentId, text, date, replies = [], onDelete, onUpdate, onReply, type, jwtToken }) => {
  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text); // 댓글 수정 상태
  const [replyList, setReplyList] = useState(replies); // 대댓글 상태
  const [likes, setLikes] = useState(0); 
  const [liked, setLiked] = useState(false); 

  const { userInfo } = useUserInfo(jwtToken);  // 사용자 정보 가져오기

  const { profileImageUrl } = useBannerPhoto(
    'myProfileImage', 
    userInfo?.nickname, 
    null, null, null, null
  );

  const displayName = userInfo?.nickname || "임시 닉네임";  

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
      setEditMode(false);  // 빈 텍스트일 경우에도 편집 모드 종료
      setEditedText(text);  // 원래 텍스트로 되돌림
    }
  };

  const handleReplySubmit = (replyText) => {
    if (!replyText.trim()) return;  // 빈 댓글 방지
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`; // 오늘 날짜 포맷
    
    const displayName = userInfo?.nickname || "임시 닉네임"; // 사용자 닉네임 가져오기
    const profileKeyName = profileImageUrl || '/default-profile.png'; // 프로필 이미지 URL
    
    // 새로운 대댓글 객체 생성
    const newReply = {
      contents: replyText,  
      nickname: displayName,  
      profileKeyName: profileKeyName,  
      projectCommentId: commentId, 
      date: formattedDate,  
    };
  
    // 대댓글을 부모 컴포넌트로 전달 
    onReply(replyText, commentId, type); 
  
    // 대댓글을 UI에 추가
    setReplyList([...replyList, newReply]);
    setShowReply(false);  // 대댓글 입력 폼 닫기
  };

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1)); 
    setLiked(!liked);
  };

  // 댓글 삭제 시 대댓글도 함께 삭제
  const handleDeleteClick = () => {
    onDelete(commentId, type); // 부모 컴포넌트에서 댓글 삭제 함수 호출
    setReplyList([]);  // 댓글 삭제 시 하위 대댓글도 삭제
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
      <S.SProfileImage src={profileImageUrl || '/default-profile.png'} alt="Profile" />
      <S.SCommentContent>
        <S.SCommentHeader>{displayName}</S.SCommentHeader>
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

        {replyList.map((reply, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <ProjectReply 
              replyId={reply.projectCommentId}  
              text={reply.contents}  
              user={reply.nickname}  
              date={reply.date} 
              onDelete={(replyId) => {
                // 대댓글 삭제 함수 호출
                setReplyList(replyList.filter((r) => r.projectCommentId !== replyId));
                onDelete(replyId, 'reply');  // 대댓글 삭제 시 별도로 처리
              }}
              onUpdate={(replyId, newText) => {
                // 대댓글 수정 함수 호출
                setReplyList(replyList.map((r) => 
                  r.projectCommentId === replyId ? { ...r, contents: newText } : r
                ));
                onUpdate(replyId, newText, 'reply');  // 대댓글 수정 시 별도로 처리
              }}
              jwtToken={jwtToken}
            />
          </div>
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

