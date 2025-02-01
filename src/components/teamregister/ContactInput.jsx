import React, { useState } from 'react';
import styled from 'styled-components';

const ContactInput = ({ onAddContact }) => {
  const [contactMethod, setContactMethod] = useState('');
  const [link, setLink] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleContactChange = (e) => setContactMethod(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);

  const handleSubmit = () => {
    if (contactMethod && link) {
      const newContact = { contactMethod, link };
      setContacts([...contacts, newContact]);
      setContactMethod('');
      setLink('');
    }
  };

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, idx) => idx !== index);
    setContacts(updatedContacts);
  };

  return (
    <div>
      <ContactInputContainer>
        <InputField
          type="text"
          value={contactMethod}
          onChange={handleContactChange}
          placeholder="연락 방법 입력"
          isLink={false}
        />
        <InputField
          type="text"
          value={link}
          onChange={handleLinkChange}
          placeholder="링크 입력"
          isLink={true}
        />
        <AddButton onClick={handleSubmit}>등록하기</AddButton>
      </ContactInputContainer>

      <ContactList>
        {contacts.map((contact, index) => (
          <ContactItem key={index}>
            <ContactBox isLink={true}>{contact.link}</ContactBox>
            <ContactBox isLink={false}>{contact.contactMethod}</ContactBox>
            <DeleteButton onClick={() => handleDelete(index)}>X</DeleteButton>
          </ContactItem>
        ))}
      </ContactList>
    </div>
  );
};

export default ContactInput;

const ContactInputContainer = styled.div`
  background-color: #F3F3F3;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-sizing: border-box; 
`;

const InputField = styled.input`
  width: ${({ isLink }) => (isLink ? '50%' : '30%')};
  padding: 8px 10px;
  font-size: 14px;
  border: 1.5px solid #E1E1E1;
  border-radius: 5px;
  outline: none;
  height: 30px;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #0D29B7;
  }

  &::placeholder {
    color: #C2C2C2;
  }
`;

const AddButton = styled.button`
  padding: 10px 14px;
  background-color: white;
  color: #0D29B7;
  font-size: 14px;
  font-weight: 700;
  border: 1.5px solid #0D29B7;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  flex-shrink: 0;
  white-space: nowrap;
  
  &:hover {
    background-color: #f0f0f0;
    color: #0B218A;
    border-color: #0B218A;
  }
`;

const ContactList = styled.div`
  margin-top: 10px;
`;

const ContactItem = styled.div`
  background-color: #F3F3F3;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ContactBox = styled.div`
  width: ${({ isLink }) => (isLink ? '32%' : '53%')};
  padding: 8px 10px;
  font-size: 14px;
  border: 1.5px solid #C2C2C2;
  border-radius: 5px;
  color: #333;
  background-color: #fff;
  word-break: break-word;
  transition: border 0.3s ease;
  box-sizing: border-box;
  height: 50px;
  display: flex;
  align-items: center; 

  ${({ isLink }) =>
    isLink &&
    `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `}
`;

const DeleteButton = styled.button`
  color: #C2C2C2;
  background-color: transparent;
  border: none;
  font-size: 23px; 
  font-weight: 400;
  cursor: pointer;
  padding: 0;
  margin-left: 20px; 
  transition: color 0.3s ease;

  &:hover {
    color: #0D29B7;
  }
`;
