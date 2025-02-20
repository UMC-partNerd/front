import styled from "styled-components"
import { MainWrapp, Title, PersonalField, StyledHr,SubTitle, SubupSec } from "../../styles/mypagestyles";
import { Subup } from "../../styles/registerstyles";
import PersonalContact from "../common/contact";
import { useEffect, useState } from "react";
import axios from "axios";
import useMypageImg from "../../hooks/useMypagesProfileImg";
import { useNavigate } from "react-router-dom";
import Button, { TYPES } from "../common/button";
import PersonalProject from "./PersonalProject";

const MyPersonalComp = () =>{

    const navigate = useNavigate();

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

        <PersonalContact 
        profileImageUrl={profileImageUrl} 
        nickname={personal?.nickname} 
        explan={personal?.occupation_of_interest || "-"}
        intro={personal?.intro || ""}
        />


        
        <ButtonWrapp>
        <Button
            type={TYPES.PLUS}
            width={'50px'} height={'16px'}
            text={personal?.personalId ? "수정하기" : "작성하기"}
            onClick={() => navigate(`/mypage/personal-page-edit`, { state: { personal } })}
        />
        </ButtonWrapp>

        
        
        <PersonalField style={{ marginBottom: "150px", height:'auto'}}>
        <Subup>등록한 프로젝트</Subup>
        <StyledHr />
            <CardWrapp>
                <PersonalProject />
            </CardWrapp>
            
        </PersonalField>

        <PersonalField>
            <Subup>경력</Subup>
            <StyledHr />
            {personal?.personalHistory ? (
                <TextBox>{personal?.personalHistory}</TextBox>
            ):(
                <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>
                {"등록한 경력이 없습니다"}
                </SubupSec>
            )}
            
        </PersonalField>

        <PersonalField>
            <Subup>학력</Subup>
            <StyledHr />
                {personal?.education ? (
                <TextBox>{personal?.education}</TextBox>
            ):(
                <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>
                {"등록한 학력력이 없습니다"}
                </SubupSec>
            )}
        </PersonalField>

        <PersonalField>
            <Subup>활동 프로젝트</Subup>
            <StyledHr />
            {personal?.activityProject ? (
                <TextBox>{personal?.activityProject}</TextBox>
            ):(
                <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>
                {"등록한 활동 프로젝트가 없습니다."}
                </SubupSec>
            )}
        </PersonalField>

        <PersonalField>
            <Subup>스킬</Subup>
            <StyledHr />
            {personal?.skill ? (
                <SkillContainer>
                {personal.skill.split(',').map((skill, index) => (
                    <SkillTag key={index}>{skill.trim()}</SkillTag>
                ))}
            </SkillContainer>
            ):(
                <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>
                {"등록한 스킬이 없습니다."}
                </SubupSec>
            )}
        </PersonalField>

        <PersonalField>
            <Subup>링크</Subup>
            <StyledHr />
            {personal?.personalLinkList  && personal.personalLinkList.length > 0 ? (
                <LinkContainer>
                    {personal?.personalLinkList.map((link, index) => (
                        <LinkItem key={index} href={link.linkUrl} target="_blank" rel="noopener noreferrer">
                        {link.linkUrl}
                    </LinkItem>
                    ))}
                </LinkContainer>
            ):(
                <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>
                {"등록한 링크가 없습니다."}
                </SubupSec>
            )}
        </PersonalField>
        </MainWrapp>
    )
}

const CardWrapp = styled.main`
display:flex;
margin-bottom:30px;

`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;  // 한 줄씩 정렬
    gap: 8px;  // 링크 간 간격
    align-items: start;
`;

const LinkItem = styled.a`
    text-decoration: none;
    color:rgb(0, 0, 0);
    font-size: 11px;
    word-break: break-all;  // 긴 URL이 잘리도록 설정
    &:hover {
        text-decoration: underline;
    }
`;

const SkillContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;  // 넘칠 경우 자동 줄바꿈
    justify-content: start;
`;

const SkillTag = styled.div`
    background-color: #f5f5f5;
    color: #333;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
`;

const TextBox = styled.div`
font-size:11px;
`

const ButtonWrapp = styled.div`
display:flex;
justify-content:flex-end;
width:100%;
`

export default MyPersonalComp;