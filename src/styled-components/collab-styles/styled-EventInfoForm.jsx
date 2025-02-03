import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: white;
  width: 94%;
  max-width: 1000px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 20px;
`;

export const RedAsterisk = styled.span`
  color: #FF2626;
  display: inline-block;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 10px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
`;

export const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ selected }) => (selected ? '#DDFCF0' : '#F3F3F3')};
  border: 2px solid ${({ selected }) => (selected ? '#08D485' : '#C2C2C2')};
  border-radius: 30px;
  color: ${({ selected }) => (selected ? '#08D485' : '#707070')};
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

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px; /* 추가된 여백 */
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  margin-bottom: 20px; /* 추가된 여백 */
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 5px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 5px;
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

export const SmallText = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #707070;
  margin: 0 0 5px 0;
`;

export const EventTypeButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ selected }) => (selected ? '#DDFCF0' : '#fff')};
  border: 1px solid #ddd;
  border-radius: 6px;
  color: ${({ selected }) => (selected ? '#08D485' : '#C2C2C2')};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  min-width: 190px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  margin-top: 15px; 

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  padding: 10px 15px;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
`;

export const DropdownItem = styled.div`
  width: 100%;
  padding: 8px 0;
  color: #212121;
  cursor: pointer;
  font-weight: 500;
  text-align: left;
  font-size: 15px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const DateInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 50px;
  padding: 10px 20px;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

export const ContactInputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ContactInputField = styled.input`
  width: 95%;
  padding: 17px 25px;
  font-size: 13px;
  font-weight: 500;
  color: #C2C2C2;
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