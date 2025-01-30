import React, { useState } from 'react';
import styled from 'styled-components';

const ContactForm = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({
    method: '',
    link: '',
    isRegistered: false
  });

  const handleRegister = () => {
    if (currentContact.method && currentContact.link) {
      setContacts([...contacts, { ...currentContact, isRegistered: true }]);
      setCurrentContact({ method: '', link: '', isRegistered: false });
    }
  };

  const handleDelete = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  return (
    <MainContainer>
      <Title>연락 방법</Title>
      <Description>이메일, 오픈채팅방, 인스타그램 등 연락 방법을 입력해주세요</Description>
      
      <ContactsContainer>
        {contacts.length < 10 && (
          <InputContainer>
            <InputWrapper>
              <InputGroup>
                <Input
                  placeholder="연락 방법 입력"
                  value={currentContact.method}
                  onChange={(e) => setCurrentContact({
                    ...currentContact,
                    method: e.target.value
                  })}
                  className="method"
                />
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="링크 입력"
                  value={currentContact.link}
                  onChange={(e) => setCurrentContact({
                    ...currentContact,
                    link: e.target.value
                  })}
                  className="link"
                />
              </InputGroup>
            </InputWrapper>
            <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
          </InputContainer>
        )}

        {contacts.map((contact, index) => (
          <RegisteredContact key={index}>
            <ContactInfo>
              <Input
                value={contact.method}
                readOnly
                className="method"
                disabled
              />
              <Input
                value={contact.link}
                readOnly
                className="link"
                disabled
              />
            </ContactInfo>
            <DeleteButton onClick={() => handleDelete(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M30 10L10 30" stroke="#C2C2C2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 10L30 30" stroke="#C2C2C2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </DeleteButton>
          </RegisteredContact>
        ))}
      </ContactsContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background: #FFFFFF;
  padding: 24px;
  border-radius: 8px;
  width: 1180px;
  height: 886px;
  flex-shrink: 0;
`;

const Title = styled.h2`
  color: #212121;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.64px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: #707070;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.32px;
  margin-bottom: 20px;
`;

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 1028px;
  height: 229px;
  flex-shrink: 0;
`;

const InputContainer = styled.div`
  background: #F3F3F3;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 210px 632px;
  gap: 16px;
  flex: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
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

const RegisterButton = styled.button`
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

const RegisteredContact = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F3F3F3;
  padding: 16px;
  border-radius: 8px;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: 210px 632px;
  gap: 16px;
  flex: 1;
`;

const DeleteButton = styled.button`
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

export default ContactForm;
