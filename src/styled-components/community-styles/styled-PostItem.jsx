import styled from 'styled-components';
import { MdMoreVert } from 'react-icons/md';

export const PostWrapper = styled.div`
  max-width: 700px;
  padding: 22px;
  margin: 20px auto; 
  background: #fff;
  border-bottom: 1px solid #ddd;
  min-height: 600px;
  display: flex;
  flex-direction: column;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export const Role = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

export const PostDate = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 10px;
`;

export const PostContent = styled.div`
  margin-top: 12px;
`;

export const PostTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #212121;
  font-weight: 600;
  letter-spacing: -0.4px;
`;

export const PostSummary = styled.p`
  font-size: 0.9rem;
  color: #414141;
  white-space: pre-line;
  margin: 0;
  padding: 0;
  text-indent: 0;
  line-height: 1.4em;
  font-weight: 500;
  font-size: 15px;
`;

export const ImageSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const LargeImageWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const SmallImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const ImageBox = styled.div`
  background-color: #ccc;
  flex-shrink: 0;
  width: ${({ large }) => (large ? '48%' : '30%')};
  height: 0;
  padding-bottom: ${({ large }) => (large ? '25%' : '22%')};
  border-radius: 3px;
`;

export const CommentSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const CommentWrapper = styled.div`
  max-width: 100%; 
  width: 100%;
  margin: 0 auto; 
`;
