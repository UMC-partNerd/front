import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: white;
  width: 94%;
  max-width: 1000px;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  margin-top: 45px;
`;

export const Section = styled.div`
  margin-bottom: 40px;
`;

export const TitleText = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  color: #212121;
  margin-bottom: 25px;
`;

export const RedAsterisk = styled.span`
  color: #FF2626;
`;

export const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.selected ? '#DDFCF0' : '#F3F3F3')};
  border: 2px solid ${(props) => (props.selected ? '#08D485' : '#C2C2C2')};
  border-radius: 30px;
  color: ${(props) => (props.selected ? '#08D485' : '#707070')};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  min-width: 90px;
  height: 37px;
  text-align: center;
  white-space: nowrap;

  &:hover {
    background-color: #e0f9f1;
    color: #08D485;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 25px;
  color: #E1E1E1;
`;

export const InputLabel = styled.label`
  font-size: 18px;
  color: #414141;
  font-weight: 500;
  display: block;
  margin-bottom: 9px;
`;

export const InputField = styled.input`
  width: 95%;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #E1E1E1;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #B0B0B0;
  }
`;

export const TextAreaField = styled.textarea`
  width: 95%;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #E1E1E1;
  border-radius: 5px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #C2C2C2;
  }

  height: 200px; 
  resize: none; 
`;

export const SmallText = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #707070;
  margin-top: 5px;
  margin-bottom: 0; 
`;

export const TextAreaContainer = styled.div`
  margin-bottom: 30px;
`;

export const ImageRectanglesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0; 
  padding: 0; 
  margin: 0;  
`;
