import React, { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import { CiHeart } from "react-icons/ci"; 
import ProjectReply from './ProjectReply'; 
import ReplyInput from '../collaboration-detail/comments/ReplyInput'; 
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectComment';

const ProjectComment = ({ commentId, text, user, date, replies = [], onDelete, onUpdate, onReply, type }) => {
  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text); // 댓글 수정 상태
  const [replyList, setReplyList] = useState(replies); 
  const [likes, setLikes] = useState(0); 
  const [liked, setLiked] = useState(false); 

  const handleReplyClick = () => setShowReply(prev => !prev);
  const handleOptionsClick = () => setShowOptions(prev => !prev);

  // 수정 버튼 클릭 시
  const handleEditClick = () => {
    setEditMode(true); 
    setShowOptions(false); 
    setEditedText(text); 
  };

  const handleEditChange = (e) => setEditedText(e.target.value); // 수정 내용 반영

  const handleEditSubmit = () => {
    console.log("Edited Text in handleEditSubmit:", editedText);  // 이 값이 잘 출력되는지 확인
    if (editedText.trim()) {
      console.log("Sending edited text:", editedText); // 이 로그도 추가해서 editedText가 제대로 전달되는지 확인
      onUpdate(commentId, editedText, type);  // 여기서 newText가 제대로 전달되는지 확인
      setEditMode(false);
    }
  };

  const handleReplySubmit = (replyText) => {
    if (!replyText.trim()) return;  // 빈 댓글 방지

    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
    
    const newReply = {
      text: replyText,
      user: "사용자 이름",
      date: formattedDate,  
    };

    setReplyList([...replyList, newReply]);
    setShowReply(false);
    onReply(commentId, replyText, type); // 대댓글 추가 시 부모로 전달
  };

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1)); 
    setLiked(!liked);
  };

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
      <S.SProfileImage />
      <S.SCommentContent>
        <S.SCommentHeader>{user}</S.SCommentHeader>
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
              onChange={handleEditChange} // 수정 내용 반영
              onBlur={handleEditSubmit} // 수정 제출
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
              text={reply.text}
              user={reply.user}
              date={reply.date}
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
          top: '-2px',
          cursor: 'pointer',
        }}
      />

      <S.SMoreOptionsMenu show={showOptions}>
        <S.SMenuItem onClick={handleEditClick}>수정하기</S.SMenuItem>
        <S.SDivider />
        <S.SMenuItem onClick={() => onDelete(commentId, type)}>삭제하기</S.SMenuItem>
      </S.SMoreOptionsMenu>
    </S.SCommentWrapper>
  );
};

export default ProjectComment;
