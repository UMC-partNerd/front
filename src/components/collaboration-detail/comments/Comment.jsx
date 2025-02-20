import React, { useState, useEffect } from 'react';
import { FiMoreVertical } from "react-icons/fi";
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import * as S from '../../../styled-components/collab-styles/styled-Comment';
import CustomModal, { VERSIONS } from "../../common/modal/CustomModal";
import useUserInfo from '../../../hooks/useUserInfo';
import useMypageImg from '../../../hooks/useMypagesProfileImg';  // 새로 작성한 훅 import

const Comment = ({ collabPostId, id, text, user, date, replies = [], onDelete, onUpdate, onReply }) => {
  const { userInfo } = useUserInfo();

  // 프로필 이미지 경로를 myProfileImage/MYPROFILE/{파일명} 형태로 설정
  const profileImageKey = userInfo?.profileKeyName
    ? `myProfileImage/MYPROFILE/${userInfo.profileKeyName.split('/').pop()}`
    : null;

  // useMypageImg 훅을 사용하여 profileImageUrl을 가져오기
  const { profileImageUrl, isLoading, error, imageType } = useMypageImg(profileImageKey);

  // 로깅: profileImageKey와 profileImageUrl이 제대로 설정되었는지 확인
  console.log("profileImageKey:", profileImageKey); 
  console.log("profileImageUrl:", profileImageUrl);

  const [showReply, setShowReply] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [replyList, setReplyList] = useState(replies);
  const [openModal, setOpenModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (date) {
      setFormattedDate(formatDate(date));
    }
  }, [date]);

  useEffect(() => {
    setEditedText(text);  // 텍스트 변경 시 초기화
  }, [text]);

  const handleReplyClick = () => setShowReply(!showReply);
  const handleOptionsClick = () => setShowOptions((prev) => !prev);

  const handleEditClick = () => {
    setEditMode(true);
    setShowOptions(false);
  };

  const handleEditChange = (e) => setEditedText(e.target.value);

  const handleEditSubmit = () => {
    if (editedText.trim()) {
      onUpdate(collabPostId, id, editedText); 
      setEditMode(false);  // 수정 후 텍스트를 화면에 반영
    }
  };

  const deleteComment = () => setOpenModal(true);

  const handleDelete = () => {
    onDelete(collabPostId, id);  
    setOpenModal(false); 
  };

  const handleReplySubmit = (replyText) => {
    const newReply = {
      text: replyText,
      user: "사용자 이름", 
      date: new Date().toISOString().split('T')[0],
    };
    setReplyList((prevReplies) => [...prevReplies, newReply]); 
    setShowReply(false);
    onReply(collabPostId, id, replyText);  // 부모에게도 업데이트 전달
  };

  const handleReplyUpdate = (index, newText) => {
    const updatedReplies = [...replyList];
    updatedReplies[index].text = newText;
    setReplyList(updatedReplies);  // 상태 업데이트
  };

  const handleReplyDelete = (index) => {
    const updatedReplies = replyList.filter((_, i) => i !== index);
    setReplyList(updatedReplies);  // 상태 업데이트
  };

  const formatDate = (date) => {
    if (!date) {
      const today = new Date();
      return `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
    }
    
    const dateParts = date.match(/(\d{4})\.\s*([\d]{1,2})\.\s*([\d]{1,2})/);
    if (!dateParts) {
      const today = new Date();
      return `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
    }
    
    return `${dateParts[1]}. ${dateParts[2]}. ${dateParts[3]}`;
  };

  return (
    <S.SCommentWrapper>
      {/* 프로필 이미지 */}
      {isLoading ? (
        <S.SProfileImage alt="로딩 중" />
      ) : (
        <S.SProfileImage 
          src={profileImageUrl || '/default-profile.png'} 
          alt="Profile" 
        />
      )}

      <S.SCommentContent>
        <S.SCommentHeader>{userInfo?.nickname || '임시 닉네임'}</S.SCommentHeader>
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
        openModal={openModal} 
        closeModal={() => setOpenModal(false)}
        boldface='댓글을 삭제하시겠습니까?'
        regular='삭제하기를 누르면 다시 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
        text='삭제하기'
        onClickHandler={handleDelete} 
        variant={VERSIONS.VER3}
      />
    </S.SCommentWrapper>
  );
};

export default Comment;
