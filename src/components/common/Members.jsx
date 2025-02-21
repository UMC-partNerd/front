import React from 'react';
import styled from 'styled-components';

const Members = ({ name, image, isLeader, isLoading, error }) => {
  return (
    <MembersField>
      {isLoading ? (
        <ImageComp className="loading" src="/Profile_none.png" alt="로딩 중" />
      ) : error ? (
        <ImageComp src="/Profile_none.png" alt="에러 이미지" />
      ) : (
        <ImageCompContainer>
          <ImageComp 
            src={image || "/Profile_none.png"}
            alt="프로필 이미지"
          />
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
    width: 1000%;
    height: 1000%;
    object-fit: cover;
  }
`;

// const ImageComp = styled.div`
//   width: 70px;
//   height: 70px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #f0f0f0;
  
//   &.loading {
//     color: #888;
//   }

//   &.error {
//     background: #f5c6cb;
//     color: #721c24;
//   }
// `;

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

const ImageComp = styled.img.attrs((props) => ({
  onError: (event) => {
    event.target.src = "/Profile_none.png"; // 대체 이미지
    event.target.onerror = null; // 무한 루프 방지
  },
}))`
  object-fit: cover;
  border-radius: 50%;
  width: 50px;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;
  margin-left: 0;
`;


export default Members;

