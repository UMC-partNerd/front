import styled from "styled-components";
import { Title } from "../../styles/mypagestyles";
import Button, { TYPES } from "../common/button";

const CommuRegist = () =>{
    const onClickHandler = () => {
      // 버튼 클릭 시 실행할 로직 작성
      console.log('버튼이 클릭되었습니다!');
    };

    return(
        <HeaderWrapp>
            <Title>커뮤니티</Title>
            <Button
                type={TYPES.PLUS}
                text='글 작성하기'
                onClick={onClickHandler}
            />
        </HeaderWrapp>
    )
}

const HeaderWrapp= styled.header`
width:100%;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
padding: 10px 100px 10px 20px;
box-sizing: border-box;
`

export default CommuRegist;