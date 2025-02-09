
import Sidebar from "../../components/mypage/sidebar"
import styled from "styled-components"
import MyTeamsComp from "../../components/mypage/teams"

const MyPageTeams = () => {
    return(
        <Wrapp>
            <Sidebar />
            <MyTeamsComp/>
        </Wrapp>
    )
}

const Wrapp = styled.main`
display:flex;
flex-direction:row;
`

export default MyPageTeams