import styled from "styled-components";

export const MainContainer = styled.div`
  background: #FFFFFF;
  padding: 24px;
  border-radius: 8px;
  width: 1180px;
  height: 886px;
  flex-shrink: 0;
`;

export const Title = styled.h2`
  color: #212121;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  color: #707070;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;
  margin-bottom: 20px;
`;

export const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 1028px;
  height: 229px;
  flex-shrink: 0;
`;

export const InputContainer = styled.div`
  background: #F3F3F3;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 210px 632px;
  gap: 16px;
  flex: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Input = styled.input`
  padding: 22px 28px;
  border: 2px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;
  color: #212121;
  background: #FFFFFF;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  &.method {
    width: 210px;
    height: 64px;
  }

  &.link {
    width: 632px;
    height: 64px;
  }

  &:focus {
    border-color: #C2C2C2;
    outline: none;
  }

  &::placeholder {
    color: #E1E1E1;
  }

  &:disabled {
    background: #FFFFFF;
    border-color: #E1E1E1;
    color: #212121;
  }
`;

export const RegisterButton = styled.button`
  display: inline-flex;
  padding: 20px 24px;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #0D29B7;
  background: #FFF;
  color: #0D29B7;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;
  cursor: pointer;

  &:hover {
    background: #F8F9FF;
  }
`;

export const RegisteredContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F3F3F3;
  padding: 16px;
  border-radius: 8px;
`;

export const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: 210px 632px;
  gap: 16px;
  flex: 1;
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 82px;

  &:hover {
    svg path {
      stroke: #666666;
    }
  }
`;