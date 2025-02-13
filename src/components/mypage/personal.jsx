import styled from "styled-components"
import { MainWrapp, Title, PersonalField, StyledHr,SubTitle, SubupSec } from "../../styles/mypagestyles";
import { Subup } from "../../styles/registerstyles";
import PersonalContact from "../common/contact";
import { useEffect, useState } from "react";
import axios from "axios";
import useMypageImg from "../../hooks/useMypagesProfileImg";

import Button, { TYPES } from "../common/button";

const MyPersonalComp = () =>{

    const onClickHandler = () => {
    //   navigate('/collaboration/collab-registration');
    };
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    //펄스널 데이터
    const [personal, setPersonal] = useState(null);



    //펄스널페이지 조회 api
    const getMyPersonal = async () =>{
        try{
            const jwtToken = localStorage.getItem("jwtToken"); 

                if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    return;
                }
                const response = await axios.get(`${API_BASE_URL}/api/personal/`,
                    {
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        }
                    });

                console.log("펄스널 데이터", response.data.result);
                setPersonal(response.data.result);
                
        }catch (error) {
            console.error("펄스널 불러오기 실패:", error);
        }
    }

    //프로필 이미지 가져오기
    const {profileImageUrl, isLoading, error} = useMypageImg(personal?.profileKeyName)


    useEffect(() =>{
        getMyPersonal();
            }, []);
    
    
    return(
        <MainWrapp>
        <Title>펄스널 페이지</Title>

        <PersonalContact profileImageUrl={profileImageUrl} nickname={personal?.nickname} explan={personal?.occupation_of_interest || "-"}/>

        <Button
            type={TYPES.NO}
            text='작성하기'
            onClick={onClickHandler}
        />
        {/* <ButtonWrapp>
            
            <ButtonWhite style={{width:'50px', height:'10px'}}>작성하기</ButtonWhite>
        </ButtonWrapp> */}
        

        <PersonalField>
            <Subup>등록한 프로젝트</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>
                {"등록한 프로젝트가 없습니다"}
                </SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>경력</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>
                등록한 경력이 없습니다
                </SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>학력</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 학력이 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>활동 프로젝트</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 활동 프로젝트가 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>스킬</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 스킬이 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>링크</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 링크가 없습니다</SubupSec>
        </PersonalField>
        </MainWrapp>
    )
}

const ButtonWrapp = styled.div`
display:flex;
justify-content:flex-end;
width:100%;
`

export default MyPersonalComp;