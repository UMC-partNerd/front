import styled from 'styled-components';

// overlay: 모달창 밖
export const RequestContainer = styled.div`
  width: 400px;
  height: 160px;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileWrapp = styled.div`
  display: felx;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Profile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%; 
  background: #212121;
`;

export const Boldface = styled.h3`
  font-size: 20px;
  font-weight: 520;
  margin: 0;
  color: #212121;
`;

export const Regular = styled.p`
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  color: #414141;
`;

// ver3 버튼 2개 컨테이너
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  alignItems: center;
`;