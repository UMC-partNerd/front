import { FeedWrap, FeedTitle, FeedTop , FeedDate, FeedMain} from "../../styles/mypagestyles";
import { formData } from "../../utils/dataUtilsDot";

const PostFeed = ({ post }) =>{
    return(
        <FeedWrap>
            <FeedTop>
            <FeedTitle> {post.title || "제목없음"}</FeedTitle>

            {/* updatedAt이 존재하면 그것을 사용하고, 없으면 createdAt 사용 */}
            <FeedDate>{formData(post.updatedAt || post.createdAt)}</FeedDate>
            </FeedTop>
            <FeedMain>
            {post.description || "내용 없음"}
            </FeedMain>
            
        </FeedWrap>
    )
}

export default PostFeed;