import styled from 'styled-components';

export const ProfileMenuContainer = styled.div`
  position: absolute;
  top: 68px;
  right: 250px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-width: 150px;
  z-index: 10;
  padding: 5px 0;
  height: auto;
`;

export const ProfileMenuItem = styled.div`
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 2px;
  &:first-child {
    padding-top: 15px;
  }
  &:last-child {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: black;
    display: block;
    padding-left: 5px;
    &:hover {
      color: #1a73e8;
    }
  }
`;

export const Separator = styled.div`
  height: 1px;
  background-color: #E1E1E1;
  width: 70%;
  margin: 5px auto;
  margin-top: 15px;
  margin-bottom: 15px;
`;
