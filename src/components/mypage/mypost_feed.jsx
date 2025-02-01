import { FeedWrap, FeedTitle, FeedTop , FeedDate, FeedMain} from "../../styles/mypagestyles";

const PostFeed = () =>{
    return(
        <FeedWrap>
            <FeedTop>
            <FeedTitle>컴퍼런스 공동개최</FeedTitle>
            <FeedDate>2025......11</FeedDate>
            </FeedTop>
            <FeedMain>
            안녕하세요! 저희는 IT 연합동아리 TectTect입니다.
2024년 3월에 대학생과 IT 산업 전문가가 함께하는 ‘IT의 미래를 말하다’ 컨퍼런스를 준비 중입니다. 이번 행사를 더욱 풍성
하게 만들기 위해 함께 협업할 IT 동아리를 찾고 있습니다. 희망하는 동아리들은 자세한 내용을 확인해보고, 적극적으로 지원
해주시면 감사하겠습니다. 이번 컨퍼런스를 통해 새로운 경험을 향상시키며 동아리들끼리의 관계를 발전하는
            </FeedMain>
            
        </FeedWrap>
    )
}

export default PostFeed;