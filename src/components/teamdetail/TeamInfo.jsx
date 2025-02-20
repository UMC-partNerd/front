import React, { useState } from 'react';  
import { FiMoreVertical } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom';  
import * as S from '../../styled-components/teamdetail-styles/styled-TeamInfo';

const TeamInfo = ({ name, description, category, contact = [], clubId, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false); 
  const navigate = useNavigate(); 

  const handleOptionsClick = () => {
    setShowOptions(!showOptions); 
  };

  const handleEditClick = () => {
    navigate(`/find/${clubId}/manage`);
  };

  const onDeleteClick = () => {
    onDelete(clubId); 
  };

  return (
    <S.SContainer>
      <S.SHeaderContainer>
        <S.SBadgeTitleContainer>
          <S.SBadge>{category}</S.SBadge>
          <S.STitle>{name}</S.STitle>
        </S.SBadgeTitleContainer>

        {/* 더보기 아이콘이 항상 보이도록 설정 */}
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

        {/* 메뉴 옵션 */}
        <S.SMoreOptionsMenu show={showOptions}>
          <S.SMenuItem onClick={handleEditClick}>수정하기</S.SMenuItem>
          <S.SDivider />
          <S.SMenuItem onClick={onDeleteClick}>삭제하기</S.SMenuItem>  
        </S.SMoreOptionsMenu>
      </S.SHeaderContainer>

      <S.SSubTitle>{description}</S.SSubTitle>

      <S.SContactInfoContainer>
        {contact.length > 0 ? contact.map((item, index) => (
          <S.SContactItem key={index}>
            <S.SContactType>{item.contactType !== 'string' ? item.contactType : '연락처 정보가 없습니다'}</S.SContactType>
            <S.SContactLink>{item.contactUrl !== 'string' ? item.contactUrl : ' '}</S.SContactLink>
          </S.SContactItem>
        )) : <div>연락처 정보가 없습니다.</div>}
      </S.SContactInfoContainer>
    </S.SContainer>
  );
};

export default TeamInfo;




