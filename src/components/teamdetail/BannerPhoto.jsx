import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5em;
`;

const BannerPhoto = ({ src }) => {
  return (
    <BannerContainer>
      {src ? <img src={src} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : "배너 이미지"}
    </BannerContainer>
  );
};

export default BannerPhoto;
