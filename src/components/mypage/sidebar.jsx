import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <MainWrapp>
            <TestWrapp>
            <h3  style={{marginBottom : '30px', cursor:'default'}}>
                마이페이지
            </h3>
            <List 
                isActive = {location.pathname === "/mypage/profile"}
                onClick={() => navigate("/mypage/profile")}>내 프로필
            </List>
            <List
                isActive = {location.pathname === "/mypage/personal-page"}
                onClick={() => navigate('/mypage/personal-page')}>퍼스널 페이지
            </List>
            <List 
                isActive = {location.pathname === "/mypage/teams"}
                onClick={() => navigate('/mypage/teams')}>팀 페이지
            </List>
            <List 
                isActive = {location.pathname === "/mypage/my-posts"}
                onClick={() => navigate('/mypage/my-posts')}>내가 쓴 글
            </List>
            </TestWrapp>
        </MainWrapp>
    )
}

const TestWrapp = styled.div `
display:flex;
flex-direction: column;
margin-top:60px;
box-sizing: border-box;
`

const MainWrapp = styled.aside`
display:flex;
width:300px;
height:100vh;
flex-direction: row-reverse;
padding-right:55px;
box-sizing: border-box;
border-right: 1px solid lightgray;
`

const List = styled.span`
margin-bottom:20px;
font-style: normal;
font-weight: 600;
line-height: 29px;
letter-spacing: -0.02em;
font-size:13px;
cursor:pointer;

color: ${(props) => (props.isActive ? "#0D29B7" : "#707070")}; /* 현재 경로일 때 파란색 */
`

export default Sidebar;