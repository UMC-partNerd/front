import styled from "styled-components"
import { MainWrapp, Title } from "../../styles/mypagestyles";
import PostFeed from "./mypost_feed";

const MyPostsComp = () =>{
    return(
        <MainWrapp>
        <Title>내가 쓴 글</Title>

        <h3>카테고리 넣을 자리</h3>
        <PostFeed/>
        </MainWrapp>
    )
}

export default MyPostsComp;