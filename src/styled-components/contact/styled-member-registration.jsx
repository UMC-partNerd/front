import styled from "styled-components";

export const Container = styled.div`
  width: 863px;
`;

export const Title = styled.h2`
  color: #212121;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.64px;
  margin-bottom: 16px;
`;

export const Description = styled.p`
  color: #707070;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.48px;
  margin-bottom: 32px;
`;

export const MainSection = styled.div`
  display: flex;
  gap: 120px;
`;

export const SearchSection = styled.div`
  position: relative;
  width: 500px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 500px;
`;

export const SearchInput = styled.input`
  width: 500px;
  height: 52px;
  padding: 14px 24px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  background: #FFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  color: #212121;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;

  &::placeholder {
    color: #C2C2C2;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  margin-left: 500px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
`;

export const TagsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TagGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const TagLabel = styled.span`
  color: #212121;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.4px;
  white-space: nowrap;
  position: sticky;
  top: 0;
`;

export const TagsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 8px;
  width: fit-content;
  align-items: flex-start;
`;

export const LeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const MemberContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
`;

export const LeaderTag = styled.div`
  display: flex;
  padding: 4px 20px;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #0D29B7;
  background: #FFF;
  color: #0D29B7;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.4px;
`;

export const MemberTag = styled.div`
  display: inline-flex;
  padding: 4px 10px 4px 20px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid #0D29B7;
  background: #EAF1FF;
  color: #0D29B7;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.4px;
  white-space: nowrap;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchResultsList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  
  &:hover {
    background: #F3F3F3;
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
`;

export const ResultNickname = styled.span`
  color: #212121;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
`;