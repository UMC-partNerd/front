import styled from 'styled-components';

export const CommentInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 655px;
  height: 60px;
  margin-top: 30px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0 7px;
  border-radius: 6px;
  border: 1.5px solid #E1E1E1;
  background: #FFF;
  font-family: Pretendard;
  font-size: 17px;
  line-height: 60px;
  resize: none;
  outline: none;
  display: block;
  align-items: center;
  justify-content: flex-start;

  ::placeholder {
    color: #f2f2f2;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 500;
    line-height: 60px;
    text-align: left;
  }
`;

export const SvgIcon = styled.div`
  position: absolute;
  right: 10px;
  margin-top: 7px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin: 0;
  }
`;
