import React, { useState } from 'react';
import styled from 'styled-components';

const ContactForm = ({ onContactUpdate }) => {
  const [currentContact, setCurrentContact] = useState({ method: '', link: '' });
  const [contacts, setContacts] = useState([]);

  const contactMethods = ['이메일', '카카오톡', '인스타그램', '기타'];

  const handleAdd = () => {
    if (!currentContact.method || !currentContact.link) {
      alert('연락 방법과 링크를 모두 입력해주세요.');
      return;
    }

    const newContacts = [...contacts, { ...currentContact }];
    setContacts(newContacts);
    setCurrentContact({ method: '', link: '' });
    onContactUpdate(newContacts); // 부모 컴포넌트에 업데이트된 연락처 정보 전달
  };

  const handleRemove = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
    onContactUpdate(newContacts);
  };

  return (
    <Section>
      <Title>연락 방법<Required>*</Required></Title>
      <Description>이메일, 오픈채팅방, 인스타그램 등 연락 방법을 입력해주세요</Description>
      
      <InputGroup>
        <SelectWrapper>
          <Select
            value={currentContact.method}
            onChange={(e) => setCurrentContact({
              ...currentContact,
              method: e.target.value
            })}
          >
            <option value="">선택해주세요</option>
            {contactMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </Select>
        </SelectWrapper>
        
        <InputWrapper>
          <Input
            type="text"
            placeholder="링크를 입력해주세요"
            value={currentContact.link}
            onChange={(e) => setCurrentContact({
              ...currentContact,
              link: e.target.value
            })}
          />
          <AddButton onClick={handleAdd}>추가</AddButton>
        </InputWrapper>
      </InputGroup>

      <ContactList>
        {contacts.map((contact, index) => (
          <ContactItem key={index}>
            <ContactInfo>
              <ContactMethod>{contact.method}</ContactMethod>
              <ContactLink>{contact.link}</ContactLink>
            </ContactInfo>
            <DeleteButton onClick={() => handleRemove(index)}>×</DeleteButton>
          </ContactItem>
        ))}
      </ContactList>
    </Section>
  );
};

export default ContactForm;

// Styled Components
const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 26px;
  line-height: 38px;
  color: #212121;
  margin-bottom: 8px;
`;

const Required = styled.span`
  color: #FF2626;
  margin-left: 4px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  width: 200px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #0D29B7;
    outline: none;
  }
`;

const AddButton = styled.button`
  padding: 0 20px;
  background-color: #0D29B7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0A1F8F;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContactItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #F8F9FA;
  border-radius: 4px;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ContactMethod = styled.span`
  font-weight: 600;
  color: #212121;
  min-width: 100px;
`;

const ContactLink = styled.span`
  color: #666;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #FF2626;
  }
`;