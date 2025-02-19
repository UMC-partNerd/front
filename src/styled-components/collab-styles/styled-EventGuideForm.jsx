import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: white;
  width: 94%;
  max-width: 1000px;
  padding: 80px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  margin-top: 45px;
`;

export const Section = styled.div`
  margin-bottom: 40px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TitleText = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  color: #212121;
`;

export const RedAsterisk = styled.span`
  color: #FF2626;
  display: inline-block;
`;

export const SmallText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #707070;
  margin: 0 0 5px 0; 
`;

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const TextAreaField = styled.textarea`
  width: 96%;
  height: 120px;
  padding: 20px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #E1E1E1;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;
  resize: none;
  font-family: 'Pretendard', sans-serif;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #C2C2C2;
    font-family: 'Pretendard', sans-serif;
    font-size: 15px;
  }
`;

export const ImageRectanglesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; 
  box-sizing: border-box;
`;
