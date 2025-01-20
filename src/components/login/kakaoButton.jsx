import styled from "styled-components";



const KakaoBtn =() =>{
    const handleClick = () => {
        alert("카카오 버튼 클릭!");
        // window.location.href = kakaoURL;
        //KakaoRedirectHandler;
    };
    return(
        <ButtonWRapp>
            <ButtonImage src="/src/assets/images/kakaoBtn.png"
                alt="Kakao Login" onClick={handleClick}/>
        </ButtonWRapp >
    )
}

const ButtonWRapp = styled.div`
background:	#FEE500;
width:100%;
max-height:45px;
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