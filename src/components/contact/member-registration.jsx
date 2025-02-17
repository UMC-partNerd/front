import React, { useState } from 'react';
import styled from 'styled-components';

const TeamMemberRegistration = ({ onMembersUpdate }) => {
  // ... 기존 코드 유지 ...
};

export default TeamMemberRegistration;

// Styled Components
const TeamMemberWrapper = styled.div`  // Container -> TeamMemberWrapper
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  color: #212121;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const SearchSection = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  padding-right: 40px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`;

const SearchResultsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #F8F9FA;
  }
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
`;

const ResultNickname = styled.span`
  font-size: 14px;
  color: #212121;
`;

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MemberItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #F8F9FA;
  border-radius: 4px;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
`;

const MemberNickname = styled.span`
  font-weight: 600;
  color: #212121;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #FF2626;
  }
`;
