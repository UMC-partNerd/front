import styled from "styled-components";

const Sidebar = () =>{
    return(
        <MainWrapp>
            <h3>
                마이페이지
            </h3>
            <List>내 프로필</List>
        </MainWrapp>
    )
}

const MainWrapp = styled.aside`
display:flex;
width:300px;
background:gray;
height:100%;
`

const List = styled.span`

`

export default Sidebar;