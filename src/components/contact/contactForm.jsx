import React, { useState } from 'react';

import {
  MainContainer,
  Title,
  Description,
  ContactsContainer,
  InputContainer,
  InputWrapper,
  InputGroup,
  Input,
  RegisterButton,
  RegisteredContact,
  ContactInfo,
  DeleteButton
} from "../../styled-components/contact/styled-contactForm";

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


export default ContactForm;
