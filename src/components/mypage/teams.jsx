import styled from "styled-components"
import { MainWrapp, Title } from "../../styles/mypagestyles";
import { ClubContainer, CardGrid, ClubCard, ImagePlaceholder, CardContent,
    CategoryBadge, ClubTitle, Description
} from "../../styled-components/styled-Club";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHomeData } from "../../hooks/useHomeData";

const MyTeamsComp = () => {
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [clubImages, setClubImages] = useState({}); // 이미지 URL 저장
    const [clubs, setClub] = useState([]);
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const {homeData, isLoading} = useHomeData();
    

    const fetchClubs = async () =>{
        try{
            const jwtToken = localStorage.getItem("jwtToken"); 

            if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    setLoading(false);
                    return;
            }

            const response = await axios.get(`${API_BASE_URL}/api/partnerd/myPartnerdPosts`, 
                {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                        }
                });

            console.log("마이페이지-팀페이지", response.data.result);
            setClub(response.data.result?.clubPreviewDTOList);
        }catch (error) {
            console.error("게시글 불러오기 실패:", error);
            setError("게시글을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClubs();
    }, []);

    return (
        <MainWrapp>
            <Title>팀 페이지</Title>

            {/* 로딩 상태 표시 */}
            {loading && <p>팀 데이터를 불러오는 중입니다...</p>}

            {/* 에러 메시지 표시 */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            
            <CardGrid>
            {!loading && !error && clubs.length > 0 ? (
                    clubs.map((club) => {
                        const clubImage = clubImages[club.clubId] || {};

                        return (
                            <ClubCard key={club.clubId}>
                                <ImagePlaceholder>
                                    {clubImage.isLoading ? (
                                        <p>이미지 로딩 중...</p>
                                    ) : clubImage.error ? (
                                        <p style={{ color: "red" }}>이미지를 불러올 수 없습니다.</p>
                                    ) : (
                                        <img 
                                            src={clubImage.profileImageUrl || "/default-image.png"} 
                                            alt={club.name} 
                                        />
                                    )}
                                </ImagePlaceholder>
                                <CardContent>
                                    <CategoryBadge>{club.category}</CategoryBadge>
                                    <ClubTitle>{club.name}</ClubTitle>
                                    <Description>{club.intro}</Description>
                                </CardContent>
                            </ClubCard>
                        );
                    })
                ) : (
                    !loading && !error && <p>등록된 팀이 없습니다.</p>
                )}
            </CardGrid>
        </MainWrapp>
    )
}

export default MyTeamsComp;