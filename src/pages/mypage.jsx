import MypageComp from "../components/mypage/mypage"
import Sidebar from "../components/mypage/sidebar"
import styled from "styled-components"

const MyPage = () => {
    return(
        <Wrapp>
            <Sidebar />
            <MypageComp />
        </Wrapp>
    )
}

const Wrapp = styled.main`
display:flex;
flex-direction:row;
`

export default MyPage