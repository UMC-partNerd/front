import { ClubContainer, CardGrid, ClubCard, ImagePlaceholder, CardContent,
    CategoryBadge, ClubTitle, Description,
    CardGridPersonal
} from "../../styled-components/styled-Club";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { SubupSec, StyledHr } from "../../styles/mypagestyles";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useProjectData } from "../../hooks/usePersonalProject";

const PersonalProject = () => {

    const {projects, isLoading, error, page, totalPages, setPage} = useProjectData();

    const location = useLocation();
    const navigate = useNavigate();
    
    const isEditPage = location.pathname === "/mypage/personal-page-edit";

    //이전 페이지로 이동 
    const handlePrevPage = () =>{
        if(page >1) 
            setPage(page -1);
    }

     // 다음 페이지 이동
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    //이미지 가져오기 
    // const {thumnailImageUrl, isLoading, error} = useMypageImg(project?.thumbnailKeyName)
return(
    <CardWrapp>
        <StyledHr />
        {/* 로딩 상태 표시 */}
        {isLoading && <p>팀 데이터를 불러오는 중입니다...</p>}

        {/* 에러 메시지 표시 */}
        {error && <p style={{ color: "red" }}>{error.message || "알 수 없는 오류가 발생했습니다."}</p>}

        <SelectButtonWrapp>
            <SelectButton
                onClick={handlePrevPage} disabled = {page ===1}
            ><SlArrowLeft size="0.7em"/></SelectButton>
            <SelectButton
                onClick={handleNextPage} disabled = {page === totalPages}
            >< SlArrowRight size="0.7em"/></SelectButton>
        </SelectButtonWrapp>

        {/* 프로젝트가 없을 때 메시지를 CardGrid 바깥으로 이동 */}
        { !isEditPage &&!isLoading && !error && projects.length === 0 && (
            <SubupSec style={{ marginTop: "50px", marginBottom : '20px',justifyContent: "center", display: "flex" }}>
                {"등록한 프로젝트가 없습니다"}
            </SubupSec>
        )}

        <CardGridPersonal>
            {!isLoading && !error && projects.length > 0 ? (
                projects.map((project) => (
                    <ClubCard 
                    key={project.promotionProjectId} 
                    style={{boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)", cursor:'pointer'}}
                    onClick={() => navigate(`/project/recruit/${project.promotionProjectId}`)}
                    >
                        <ImagePlaceholder>
                            {/* 이미지 URL 생성 */}
                            <img
                                src={project.thumbnailUrl || "/default-image.png"}
                                alt={project.title}
                            />
                        </ImagePlaceholder>
                        <CardContent>
                            <ClubTitle>{project.title}</ClubTitle>
                            <Description>{project.intro}</Description>
                        </CardContent>
                    </ClubCard>
                ))
            ) : null}
        </CardGridPersonal>

        {isEditPage && (
            <PlusProject onClick={() => navigate('/find/team-registration')}>
                <FaPlus />
                <div>프로젝트 등록하기</div>
            </PlusProject>
        )}
    </CardWrapp>
)
}

const PlusProject = styled.div`
display:flex;
width: 140px;
min-height: 180px;

cursor:pointer;

margin-top:10px;
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
border-radius: 8px;
color:#A0A0A0;
flex-direction:column;
justify-content:center;
align-items:center;

&>div {
    font-size:14px;
    margin-top:12px;
}

`

const SelectButton = styled.div`
display:flex;
justify-content:center;
align-items:center;
background: #FFFFFF;
width:30px;
height:30px;
border-radius:50%;
filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15));
cursor:pointer;

`

const SelectButtonWrapp = styled.div`
display:flex;
justify-content:end;
margin-bottom:15px;
gap:20px;

`

const CardWrapp = styled.main`
display:flex;
margin-bottom:10px;
flex-direction:column;
width:100%;
max-height:100px;

`

export default PersonalProject;