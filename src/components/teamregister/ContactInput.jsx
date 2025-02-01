import React, { useState } from 'react';
import styled from 'styled-components';

const ContactInput = () => {
  const [contactMethod, setContactMethod] = useState('');
  const [link, setLink] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleContactChange = (e) => setContactMethod(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);

  const handleSubmit = () => {
    if (contactMethod && link) {
      setContacts([...contacts, { contactMethod, link }]);
      setContactMethod('');
      setLink('');
    }
  };

  const handleDelete = (index) => {
    setContacts(contacts.filter((_, idx) => idx !== index));
  };

  return (
    <Container>
      <InputRow>
        <InputField
          type="text"
          value={contactMethod}
          onChange={handleContactChange}
          placeholder="연락 방법 입력"
          short
        />
        <InputField
          type="text"
          value={link}
          onChange={handleLinkChange}
          placeholder="링크 입력"
        />
        <AddButton onClick={handleSubmit}>등록하기</AddButton>
      </InputRow>

      {contacts.map((contact, index) => (
        <ContactItem key={index}>
          <ContactBox>{contact.contactMethod}</ContactBox>
          <ContactBox isLink>{contact.link}</ContactBox>
          <DeleteButton onClick={() => handleDelete(index)}>X</DeleteButton>
        </ContactItem>
      ))}
    </Container>
  );
};

export default ContactInput;

const Container = styled.div`
  background-color: #F3F3F3;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom:30px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const InputField = styled.input`
  flex: ${({ short }) => (short ? '0.3' : '0.7')};
  padding: 8px 10px;
  font-size: 14px;
  border: 1.5px solid #E1E1E1;
  border-radius: 5px;
  outline: none;
  height: 36px;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #C2C2C2;
  }
`;

const AddButton = styled.button`
  padding: 8px 14px;
  background-color: white;
  color: #0D29B7;
  font-size: 14px;
  font-weight: 700;
  border: 1.5px solid #0D29B7;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f0f0f0;
    color: #0B218A;
    border-color: #0B218A;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-top: 10px;
`;

const ContactBox = styled.div`
  flex: ${({ isLink }) => (isLink ? '0.62' : '0.28')};  
  padding: 8px 10px;
  font-size: 14px;
  border: 1.5px solid #E1E1E1; /* 입력 필드와 동일한 테두리 색 */
  border-radius: 5px;
  color: #333;
  background-color: #fff;
  word-break: break-word;
  transition: border 0.3s ease;
  height: 30px; /* 원하는 높이 */
  display: flex;
  align-items: center;
  
  &:focus-within {
    border: 1.5px solid #0D29B7; /* 입력 필드랑 동일한 포커스 효과 */
  }
`;


const DeleteButton = styled.button`
  color: #C2C2C2;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #0D29B7;
  }
`;
