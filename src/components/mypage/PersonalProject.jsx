import { ClubContainer, CardGrid, ClubCard, ImagePlaceholder, CardContent,
    CategoryBadge, ClubTitle, Description
} from "../../styled-components/styled-Club";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { SubupSec } from "../../styles/mypagestyles";

const PersonalProject = () => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [projects, setProject] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const fetchProjects = async () =>{
        try{
            const jwtToken = localStorage.getItem("jwtToken"); 

            if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    setLoading(false);
                    return;
            }

            const response = await axios.get(`${API_BASE_URL}/api/project/promotion/personal`, 
                {
                    params: { page: 1 },
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                        }
                });

            console.log("마이페이지-퍼스널페이지:프로젝트", response.data.result);
            setProject(response.data.result?.promotionProjectPreviewDTOList || []);
        }catch (error) {
            console.error("게시글 불러오기 실패:", error);
            setError("게시글을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);
return(
    <>
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

        <CardGrid>
            {!loading && !error && projects.length > 0 ? (
                projects.map((project) => (
                    <ClubCard key={project.promotionProjectId}>
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
        </CardGrid>
    </>
)
}

export default PersonalProject;