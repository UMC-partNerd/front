import React, { useState } from 'react';  
import { FiMoreVertical } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom';  
import * as S from '../../styled-components/teamdetail-styles/styled-TeamInfo';
import CustomModal, { VERSIONS } from '../common/modal/CustomModal'; // CustomModal import

const TeamInfo = ({ name, description, category, contact = [], clubId, onDelete, isLeader }) => {
  const [showOptions, setShowOptions] = useState(false); 
  const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
  const navigate = useNavigate(); 

  const handleOptionsClick = () => {
    setShowOptions(!showOptions); 
  };

  const handleEditClick = () => {
    navigate(`/find/${clubId}/manage`);
  };

  // 삭제 확인 모달에서 삭제 버튼 클릭 시 실행할 함수
  const onDeleteClick = () => {
    setOpenModal(true); // 모달 열기
  };

  // 삭제 처리 함수
  const handleDeleteConfirm = () => {
    onDelete(clubId); // 삭제 함수 호출
    setOpenModal(false); // 모달 닫기
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <S.SContainer>
      <S.SHeaderContainer>
        <S.SBadgeTitleContainer>
          <S.SBadge>{category}</S.SBadge>
          <S.STitle>{name}</S.STitle>
        </S.SBadgeTitleContainer>

        {/* 리더일 경우만 보이도록 */}
        {isLeader && (
          <FiMoreVertical
            onClick={handleOptionsClick}
            style={{
              position: 'absolute',
              right: '-15px',
              top: '-2px',
              cursor: 'pointer',
              fontSize: '20px', 
            }}
          />
        )}

        {/* 메뉴 옵션 */}
        {isLeader && (
          <S.SMoreOptionsMenu show={showOptions}>
            <S.SMenuItem onClick={handleEditClick}>수정하기</S.SMenuItem>
            <S.SDivider />
            <S.SMenuItem onClick={onDeleteClick}>삭제하기</S.SMenuItem>  
          </S.SMoreOptionsMenu>
        )}
      </S.SHeaderContainer>

      <S.SSubTitle>{description}</S.SSubTitle>

      <S.SContactInfoContainer>
        {contact.length > 0 ? contact.map((item, index) => (
          <S.SContactItem key={index}>
            <S.SContactType>{item.contactType !== 'string' ? item.contactType : '인스타그램'}</S.SContactType>
            <S.SContactLink>{item.contactUrl !== 'string' ? item.contactUrl : '@techtech_official'}</S.SContactLink>
          </S.SContactItem>
        )) : <div>연락처 정보가 없습니다.</div>}
      </S.SContactInfoContainer>

      {/* 삭제 확인 모달 */}
      <CustomModal
        openModal={openModal} 
        closeModal={closeModal}
        boldface="팀을 삭제하시겠습니까?"
        regular="삭제하기를 누르면 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?"
        text="삭제하기"
        onClickHandler={handleDeleteConfirm}
        variant={VERSIONS.VER3} // YES, NO 버튼
      />
    </S.SContainer>
  );
};

export default TeamInfo;
