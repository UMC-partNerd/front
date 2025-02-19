import styled from 'styled-components';

export const MemberContainer = styled.div`
    display:flex;
    flex-direction:row;
`

export const UserContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

export const Profile = styled.img`
    object-fit: cover;
    border-radius: 50%;
    background:gray;
    min-width: 70px; /* 최소 너비를 고정 */
    max-width: 70px; /* 최대 너비를 고정 */
    min-height: 70px; /* 최소 높이를 고정 */
    max-height: 70px; /* 최대 높이를 고정 */
`

export const IdSection = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:20px;
`

export const NickName = styled.div`
    font-size:16px;
`

export const Description = styled.div`
    margin-top:10px;
    font-size:14px;
`