import styled from "styled-components";
import axios from "axios";
import { getRedirectURI } from "./RedirectURI";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


const KakaoBtn = () => {
    const kakaoRestAPI = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirect_uri = getRedirectURI();
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestAPI}&redirect_uri=${redirect_uri}&response_type=code`;

    //카카오 로그인 화면 
    const handleLogin = () => {
        console.log("버튼 클릭");
        window.location.href = kakaoURL;
    };

    return (
        <ButtonWRapp>
            <ButtonImage src="/kakaoBtn.png"
                alt="Kakao Login" onClick={handleLogin} />
        </ButtonWRapp >
    )
}

const ButtonWRapp = styled.div`
background:	#FEE500;
width:100%;
min-height:54px;
max-width:420px;
display: inline-block;
display:flex;
justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
`

const ButtonImage = styled.img`
max-width:449px;
    width: 100%; /* 원하는 버튼 너비 */
    min-width:160px;
    height: auto;
    border: none;
    background-color: transparent;
    user-select: none; /* 이미지 드래그 방지 */
border-radius: 4px;

`;

export default KakaoBtn;