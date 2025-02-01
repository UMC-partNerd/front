import React, { useState } from 'react';
import * as S from '../../styled-components/teamregister-styles/styled-ContactInput';

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
    <S.SContainer>
      <S.SInputRow>
        <S.SInputField
          type="text"
          value={contactMethod}
          onChange={handleContactChange}
          placeholder="연락 방법 입력"
          short
        />
        <S.SInputField
          type="text"
          value={link}
          onChange={handleLinkChange}
          placeholder="링크 입력"
        />
        <S.SAddButton onClick={handleSubmit}>등록하기</S.SAddButton>
      </S.SInputRow>

      {contacts.map((contact, index) => (
        <S.SContactItem key={index}>
          <S.SContactBox>{contact.contactMethod}</S.SContactBox>
          <S.SContactBox isLink>{contact.link}</S.SContactBox>
          <S.SDeleteButton onClick={() => handleDelete(index)}>X</S.SDeleteButton>
        </S.SContactItem>
      ))}
    </S.SContainer>
  );
};

export default ContactInput;