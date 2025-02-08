import { FeedWrap, FeedTitle, FeedTop , FeedDate, FeedMain} from "../../styles/mypagestyles";

const PostFeed = ({ post }) =>{
    return(
        <FeedWrap>
            <FeedTop>
            <FeedTitle> {post.title || "제목없음"}</FeedTitle>
            <FeedDate>{displayDate}</FeedDate>
            </FeedTop>
            <FeedMain>
            {post.description || "내용 없음"}
            </FeedMain>
            
        </FeedWrap>
    )
}

export default PostFeed;