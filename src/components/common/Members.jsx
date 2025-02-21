import React from 'react';
import styled from 'styled-components';

const Members = ({ name, image, isLeader, isLoading, error }) => {
  return (
    <MembersField>
      {isLoading ? (
        <ImageComp className="loading">로딩 중...</ImageComp>  
      ) : error ? (
        <ImageComp className="error">에러 발생</ImageComp>  
      ) : (
        <ImageCompContainer>
          <img src={image} alt={`${name} profile`} />  
        </ImageCompContainer>
      )}
      <NameTag>
        {name}
        {isLeader && <CrownIcon src="/crown.png" alt="Leader" />}
      </NameTag>
    </MembersField>
  );
};

const NameTag = styled.div`
  font-size: 14px;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ImageCompContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageComp = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  
  &.loading {
    color: #888;
  }

  &.error {
    background: #f5c6cb;
    color: #721c24;
  }
`;

const CrownIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 5px;
`;

const MembersField = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 40px;
`;

export default Members;