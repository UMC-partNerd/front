
import Sidebar from "../../components/mypage/sidebar"
import styled from "styled-components"
import MyPostsComp from "../../components/mypage/posts"

const MyPagePosts = () => {
    return(
        <Wrapp>
            <Sidebar />
            <MyPostsComp />
        </Wrapp>
    )
}

const Wrapp = styled.main`
display:flex;
flex-direction:row;
`

export default MyPagePosts