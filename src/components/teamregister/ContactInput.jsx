import React, { useState } from 'react';
import * as S from '../../styled-components/teamregister-styles/styled-ContactInput';

<<<<<<< HEAD
const ContactInput = ({ contactMethods, setContactMethods }) => {
=======
const ContactInput = ({ contactMethods = [], setContactMethods }) => {
>>>>>>> b4bb8dd3ea557fcc162f42e9498664b467fd7a91
  const [contactMethod, setContactMethod] = useState('');
  const [link, setLink] = useState('');

  const handleContactChange = (e) => setContactMethod(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);

  const handleSubmit = () => {
    if (contactMethod && link) {
      setContactMethods([...contactMethods, { contactType: contactMethod, contactUrl: link }]);
      setContactMethod('');
      setLink('');
    }
  };

  const handleDelete = (index) => {
    setContactMethods(contactMethods.filter((_, idx) => idx !== index));
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

<<<<<<< HEAD
      {contactMethods.map((contact, index) => (
        <S.SContactItem key={index}>
          <S.SContactBox>{contact.contactType}</S.SContactBox>
          <S.SContactBox isLink>{contact.contactUrl}</S.SContactBox>
          <S.SDeleteButton onClick={() => handleDelete(index)}>X</S.SDeleteButton>
        </S.SContactItem>
      ))}
=======
      {/* contactMethods가 배열인지 확인 후 map 사용 */}
      {Array.isArray(contactMethods) && contactMethods.length > 0 ? (
        contactMethods.map((contact, index) => (
          <S.SContactItem key={index}>
            <S.SContactBox>{contact.contactType}</S.SContactBox>
            <S.SContactBox isLink>{contact.contactUrl}</S.SContactBox>
            <S.SDeleteButton onClick={() => handleDelete(index)}>X</S.SDeleteButton>
          </S.SContactItem>
        ))
      ) : (
        <div></div> 
      )}
>>>>>>> b4bb8dd3ea557fcc162f42e9498664b467fd7a91
    </S.SContainer>
  );
};

export default ContactInput;
