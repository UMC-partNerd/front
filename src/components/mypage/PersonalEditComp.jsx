import styled from "styled-components";
import Button, { TYPES } from "../common/button";
import { MainWrapp, Title, PersonalField, StyledHr, SubTitle, SubupSec } from "../../styles/mypagestyles";
import { Subup } from "../../styles/registerstyles";
import { useNavigate } from "react-router-dom";
import { Input } from "../../styles/registerstyles";
import PersonalProject from "./PersonalProject";
import { useEffect, useState } from "react";
import axios from "axios";

const PersonalEditComp = () => {
    const [inputValue, setInputValue] = useState(""); // 입력 필드 상태
    const [linkInput, setLinkInput] = useState(""); // 입력된 링크 상태
    const [skills, setSkills] = useState([]); // 스킬 태그 상태
    const [links, setLinks] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();

    //펄스널 데이터
    const [personal, setPersonal] = useState(null);
    const [personalId, setPersonalId] = useState(null);

    //한줄 소개
    const [introduction, setIntroduction] = useState("");
    //경력
    const [career, setCareer] = useState("");
    //학력
    const [education, setEducation] = useState("");
    //활동 프로젝트
    const [activities, setActivities] = useState("");

    //입력값 변경 핸들러
    const handleInputChange = (e) => { setInputValue(e.target.value); }
    const handleLinkChange = (e) => { setLinkInput(e.target.value); };
    const handleIntroductionChange = (e) => setIntroduction(e.target.value);
    const handleCareerChange = (e) => setCareer(e.target.value);
    const handleEducationChange = (e) => setEducation(e.target.value);
    const handleActivitiesChange = (e) => setActivities(e.target.value);

    //스킬 등록 태그 추가
    const handleAddSkill = () => {
        if (!inputValue.trim()) return; // 빈 값 방지
        const newSkills = inputValue.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
        setSkills([...skills, ...newSkills]); // 기존 리스트에 추가
        setInputValue(""); // 입력 필드 초기화
    };

    //태그 삭제 
    const handleRemoveSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    //링크 추가
    const handleAddLink = () => {
        if (!linkInput.trim()) return; // 빈 값 방지
        setLinks([...links, linkInput]); // 기존 링크 리스트에 추가
        setLinkInput(""); // 입력 필드 초기화
    };

    // 링크 삭제 핸들러
    const handleRemoveLink = (index) => {
        setLinks(links.filter((_, i) => i !== index));
    };






    //펄스널페이지 조회 api
    const getMyPersonal = async () => {
        try {
            const jwtToken = localStorage.getItem("jwtToken");

            if (!jwtToken) {
                alert("로그인이 필요합니다.");
                return;
            }
            const response = await axios.get(`${API_BASE_URL}/api/personal/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    }
                });

            console.log("펄스널 데이터", response.data.result);
            if (response.data.result) {
                setPersonal(response.data.result);
                setPersonalId(response.data.result.personalId || null);
                
                // 가져온 데이터를 입력 필드 상태에 반영
                setIntroduction(response.data.result.intro || "");  
            setCareer(response.data.result.personalHistory || "");  
            setEducation(response.data.result.education || "");  
            setActivities(response.data.result.activityProject || "");  
            setSkills(response.data.result.skill ? response.data.result.skill.split(", ") : []);  
            setLinks(response.data.result.personalLinkList ? response.data.result.personalLinkList.map(linkObj => linkObj.linkUrl) : []);  // ✅ 링크
            }
            if (response.data.result && response.data.result.personalId) {
                console.log("받아온 personalId:", response.data.result.personalId);
                setPersonalId(response.data.result.personalId); // 상태 업데이트
            } else {
                setPersonalId(null);
            }
            

        } catch (error) {
            console.error("펄스널 불러오기 실패:", error);
        }
    }

    useEffect(() => {
        getMyPersonal();
        
    }, []);


    //백엔드로 데이터 전송
    const handleSubmit = async () => {
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
            alert("로그인이 필요합니다.");
            return;
        }

        const payload = {
            intro: introduction,
            personalHistory: career,
            education: education,
            activityProject: activities,
            skill: skills.join(", "),
            personalLinkList: links.map(link => ({ linkUrl: link }))
        }

        console.log("전송할 데이터:", payload); // 데이터 확인

        try {
            let response;

            //신규 유져 등록록
            if(personalId === null) {
                response = await axios.post(`${API_BASE_URL}/api/personal/`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    }
                });

                console.log("신규 유저 등록 완료", response.data);
            }else {
                //personal아이디가 있는 경우, 수정 
                response = await axios.patch(`${API_BASE_URL}/api/personal/`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    }
                });

                console.log("수정 성공", response.data);
            }

            //최신 데이터 다시 불러오기
            getMyPersonal();
            navigate(`/mypage/personal-page`);

        } catch (error) {
            console.error("업데이트 실패:", error);
        }
    }

    return (
        <MainWrapp>
            <Title>펄스널 페이지</Title>

            <Subup
            >한 줄 소개</Subup>
            <Input
                placeholder="자신에 대해 한 줄 소개를 작성해주세요"
                value={introduction}  
                onChange={handleIntroductionChange}  // 상태 변경 핸들러 적용
                style={{
                    marginBottom: '70px', marginTop: '10px',
                    width: '95%'
                }}
            ></Input>

            <PersonalField >
                <Subup>등록한 프로젝트</Subup>
                <StyledHr />
                <CardWrapp>
                    <PersonalProject />
                </CardWrapp>
            </PersonalField>

            <PersonalField style ={{marginTop:'140px'}}>
                <Subup>경력</Subup>
                <StyledHr />
                <InputArea placeholder="인턴쉽 경험 등 자신의 경력에 대해 작성해주세요"
                value={career}
                onChange={handleCareerChange}
                >
                </InputArea>
            </PersonalField>

            <PersonalField >
                <Subup >학력</Subup>
                <StyledHr />
                <InputArea placeholder="자신의 학력 및 교육 경험에 대해 작성해주세요"
                value={education}
                onChange={handleEducationChange}
                >
                </InputArea>
            </PersonalField>

            <PersonalField>
                <Subup>활동 프로젝트</Subup>
                <StyledHr />
                <InputArea placeholder="프로젝트, 활동 이력, 수상 내역 등 자신의 활동 프로젝트에 대해 설명해주세요"
                value={activities}
                onChange={handleActivitiesChange}
                >
                </InputArea>
            </PersonalField>

            <PersonalField>
                <Subup>스킬</Subup>
                <StyledHr />
                <SubmitField>
                    <Input
                        placeholder="React, JavaScript, Figma 등 잘 사용하는 스킬을 작성해주세요"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />

                    <Button
                        style={{ width: '100%' }}
                        type={TYPES.NO}
                        text={"등록하기"}
                        onClick={handleAddSkill}
                    />
                </SubmitField>
                <TagContainer>
                    {skills.map((skill, index) => (
                        <SkillTag key={index}>
                            {skill}
                            <RemoveButton onClick={() => handleRemoveSkill(index)}>✕</RemoveButton>
                        </SkillTag>
                    ))}
                </TagContainer>
            </PersonalField>

            <PersonalField>
                <Subup>링크</Subup>
                <StyledHr />
                <SubmitField>
                    <Input
                        placeholder="URL 링크를 입력해주세요"
                        type="text"
                        value={linkInput}
                        onChange={handleLinkChange}
                    />
                    <Button
                        style={{ width: '100%' }}
                        type={TYPES.NO}
                        text={"등록하기"}
                        onClick={handleAddLink}
                    />
                </SubmitField>
                <ListContainer>
                    {links.map((link, index) => (
                        <LinkTag key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#000000' }}>
                                {link}
                            </a>
                            <RemoveButton style={{ color: 'black' }}
                                onClick={() => handleRemoveLink(index)}>✕</RemoveButton>
                        </LinkTag>
                    ))}
                </ListContainer>
            </PersonalField>


            <ButtonWrapp>
                <Button
                    style={{ width: '100%' }}
                    type={TYPES.YES}
                    text={"수정하기"}
                    onClick={handleSubmit}
                />
            </ButtonWrapp>

        </MainWrapp>
    )
}

const CardWrapp = styled.main`
display:flex;
margin-bottom:60px;
width:100%;
flex-wrap:wrap;
max-height:20%;
position:relative;
`

const ListContainer = styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`

const LinkTag = styled.div`
display:flex;
`

const ButtonWrapp = styled.div`
display:flex;
justify-content:center;
width:100%;
`

const SubmitField = styled.div`
display:flex;
flex-direction:row;
justify-content:start;

height:auto;
`

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    
`;

const SkillTag = styled.div`
    display: flex;
    align-items: center;
    background: #f0f4ff;
    color: #0033cc;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 10px;
    border: 1px solid  #0033cc;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #0033cc;
    font-size: 13px;
    margin-left: 5px;
    cursor: pointer;
`;

const InputArea = styled.textarea`
font-family: "Pretendard", sans-serif !important;
box-sizing:border-box;
resize:none;
width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    color: #333;
    outline: none;
    transition: all 0.3s ease;

    &::placeholder {
        font-size: 11px; 
        color: #C2C2C2;

    }
height:80px;


    input:-webkit-autofill {
    background-color: white !important; /* 배경색을 원하는 색으로 설정 */
    color: inherit !important; /* 글자색 유지 */
    box-shadow: 0 0 0px 1000px white inset !important; /* 배경색 덮어쓰기 */
    
    transition: background-color 5000s ease-in-out 0s; /* 배경색 애니메이션 제거 */
`

export default PersonalEditComp