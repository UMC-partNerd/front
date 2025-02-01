import styled from "styled-components";
import { Title } from "../../styles/mypagestyles";
import ButtonWhite from "../mypage/button_white";

const CommuRegist = () =>{
    return(
        <HeaderWrapp>
            <Title>커뮤니티</Title>
            <ButtonWhite style={{width:'60px', height:"15px"}}>글 작성하기</ButtonWhite>
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