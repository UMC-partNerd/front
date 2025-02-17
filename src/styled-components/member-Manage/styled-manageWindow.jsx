import styled from 'styled-components';
import { VERSIONS } from '../../components/mypage/member-manage/manageWindow';

export const ManageConcainer = styled.div`
    width: 683px;
    height: 648px;
    flex-shrink: 0;
    border-radius: 16px;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    gap: 16px;
`;

export const CancelContainer = styled.div`
    padding: 8px;
    swidth: 100%;
    display: flex;
    justify-content: flex-end;`;

export const ManageNavBar = styled.div`
    display: flex;
    justify-content: space-evenly;

`;

export const ManageItem = styled.div`
    width: 30%;
    text-align: center;

    color: #C2C2C2;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.48px;
`;

export const UnderBarWrapper = styled.div`
    width: 100%;
`;

export const SelectedItem = styled.div`
    width: 40%;
    height: 8px
    background-color: #0D29B7;
    border-radius: 2px;
`;

export const UnderBar = styled.hr`
    width: 40%;
    stroke-width: 2px;
    stroke: #E1E1E1;
`;

export const UserListWrapper = styled.div`
    width: 90%;
    max-width: 800px; 
`;
