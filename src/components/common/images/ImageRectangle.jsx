import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageRectangle = ({ imagePreview, onClose }) => {
  return (
    <ImageBox>
      <Rectangle>
        {imagePreview ? (
          <PreviewImage src={imagePreview} alt="" />
        ) : (
          <Placeholder />
        )}
        {imagePreview && onClose && (
          <CloseIcon onClick={onClose}>
            <CloseText>X</CloseText>
          </CloseIcon>
        )}
      </Rectangle>
    </ImageBox>
  );
};

const ImageBox = styled.div`
  width: 112px; 
  height: 112px;
  position: relative;
  box-sizing: border-box;
  overflow: visible;
  margin-top: 20px;
`;

const Rectangle = styled.div`
  width: 110px;
  height: 110px;
  border: 2px solid #C2C2C2;
  border-radius: 12px;
  position: relative;
  background-color: #fff; 
  padding: 5px; 
  box-sizing: border-box;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 0;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  z-index: 2;
`;

const CloseIcon = styled.div`
  width: 16px;
  height: 16px;
  position: absolute;
  top: -4px; 
  right: -4px; 
  background: #C7F6E4;
  border: 1px solid #08D485;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: #08D485;
  z-index: 3;
`;

const CloseText = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #08D485;
`;

ImageRectangle.propTypes = {
  imagePreview: PropTypes.string,
  onClose: PropTypes.func,
};

export default ImageRectangle;