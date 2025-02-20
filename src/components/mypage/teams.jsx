import styled from "styled-components"
import { MainWrapp, Title } from "../../styles/mypagestyles";
import { ClubContainer, CardGrid, ClubCard, ImagePlaceholder, CardContent,
    CategoryBadge, ClubTitle, Description
} from "../../styled-components/styled-Club";
import { useState, useEffect } from "react";
import axios from "axios";
import { useClubData } from "../../hooks/useClubDataimg";
import { Navigate, useNavigate } from "react-router-dom";

const MyTeamsComp = () => {

    const navigate = useNavigate();

    const {clubs, isLoading, error} = useClubData();

    return (
        <MainWrapp>
            <Title>팀 페이지</Title>

            {/* 로딩 상태 표시 */}
            {isLoading && <p>팀 데이터를 불러오는 중입니다...</p>}

            {/* 에러 메시지 표시 */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            
            <CardGrid>
            {!isLoading && !error && clubs.length > 0 ? (

                    
                    clubs.map((club) => {
                        
                        return (
                            <ClubCard key={club.clubId} 
                                onClick={() => navigate('/find/${club.clubId}')}
                                style={{cursor:'pointer'}}
                                >
                                <ImagePlaceholder>
                                    <img 
                                    src={club.profileImageUrl || "/default-image.png"}
                                    alt={club.name}
                                    />
                                    
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
                    !isLoading &&  <p>등록된 팀이 없습니다.</p>
                )}
            </CardGrid>
        </MainWrapp>
    )
}

export default MyTeamsComp;