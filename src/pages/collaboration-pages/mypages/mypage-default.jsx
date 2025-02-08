import MyProfile from "../../components/mypage/profile"
import Sidebar from "../../components/mypage/sidebar"
import styled from "styled-components"

const MyPageDe = () => {
    return(
        <Wrapp>
            <Sidebar/>
            <MyProfile/>
        </Wrapp>
    )
}

const Wrapp = styled.main`
display:flex;
flex-direction:row;
`

export default MyPageDe