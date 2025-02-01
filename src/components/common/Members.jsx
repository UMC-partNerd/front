//함께 한 팀원
import styled from "styled-components"

const Members = () =>{
    return(
        <MembersField>
            <ImageComp />
            <NameTag>이름</NameTag>
        </MembersField>
    )
}

const NameTag = styled.div`
font-size: 14px;
margin-top:20px;
`

const ImageComp = styled.div`
border-radius: 50%;
background:gray;
min-width: 70px; /* 최소 너비를 고정 */
  max-width: 70px; /* 최대 너비를 고정 */
  min-height: 70px; /* 최소 높이를 고정 */
  max-height: 70px; /* 최대 높이를 고정 */
`


const MembersField = styled.main`
display:flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
margin-right:40px;
`

export default Members;