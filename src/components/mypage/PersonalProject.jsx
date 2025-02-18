import { ClubContainer, CardGrid, ClubCard, ImagePlaceholder, CardContent,
    CategoryBadge, ClubTitle, Description,
    CardGridPersonal
} from "../../styled-components/styled-Club";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { SubupSec } from "../../styles/mypagestyles";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import useMypageImg from "../../hooks/useMypagesProfileImg";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PersonalProject = () => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const pageSize = 4; //한 페이지 당 프로젝트 개수 

    const [projects, setProject] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const location = useLocation();
    const navigate = useNavigate();
    
    const isEditPage = location.pathname === "/mypage/personal-page-edit";

    const fetchProjects = async (pageNumber) =>{
        try{
            const jwtToken = localStorage.getItem("jwtToken"); 

            if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    setLoading(false);
                    return;
            }

            const response = await axios.get(`${API_BASE_URL}/api/project/promotion/personal`, 
                {
                    params: { page: pageNumber, pageSize },
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                        }
                });

            console.log("마이페이지-퍼스널페이지:프로젝트", response.data.result);
            setProject(response.data.result?.promotionProjectPreviewDTOList || []);

            //페이지 수 계산
            const totalElements = response.data.result?.totalElements || 0;
            setTotalPages(Math.ceil(totalElements / pageSize));
        }catch (error) {
            console.error("게시글 불러오기 실패:", error);
            setError("게시글을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProjects(page);
    }, [page]);


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
        {/* 로딩 상태 표시 */}
        {loading && <p>팀 데이터를 불러오는 중입니다...</p>}

        {/* 에러 메시지 표시 */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 프로젝트가 없을 때 메시지를 CardGrid 바깥으로 이동 */}
        {!loading && !error && projects.length === 0 && (
            <SubupSec style={{ marginTop: "50px", justifyContent: "center", display: "flex" }}>
                {"등록한 경력이 없습니다"}
            </SubupSec>
        )}

        <SelectButtonWrapp>
            <SelectButton
                onClick={handlePrevPage} disabled = {page ===1}
            ><SlArrowLeft size="0.7em"/></SelectButton>
            <SelectButton
                onClick={handleNextPage} disabled = {page === totalPages}
            >< SlArrowRight size="0.7em"/></SelectButton>
        </SelectButtonWrapp>

        <CardGridPersonal>
            {!loading && !error && projects.length > 0 ? (
                projects.map((project) => (
                    <ClubCard key={project.promotionProjectId} style={{boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"}}>
                        <ImagePlaceholder>
                            {/* 이미지 URL 생성 */}
                            <img
                                src={`${API_BASE_URL}/${project.thumbnailKeyName}`}
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
            <PlusProject onClick={() => navigate('/mypage/my-posts')}>
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

margin-top:30px;
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