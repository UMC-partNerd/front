import styled from "styled-components"
import { MainWrapp, Title } from "../../styles/mypagestyles";
import { ClubContainer, CardGrid, ClubCard, ImagePlaceholder, CardContent,
    CategoryBadge, ClubTitle, Description
} from "../../styled-components/styled-Club";
import { useState, useEffect } from "react";
import axios from "axios";
import api from '../../api/api';  // api 인스턴스 임포트
import { Navigate, useNavigate } from "react-router-dom";

const getImageUrl = async (keyName) => {
  if (!keyName) return '/default-image.png';
  if (keyName.startsWith('http')) return keyName;

  try {
    const response = await api.get(`/api/s3/preSignedUrl`, {
      params: { keyName }
    });
    return response.data.result.cloudFrontUrl || '/default-image.png';
  } catch (err) {
    console.error('이미지 URL 가져오기 실패:', err);
    return '/default-image.png';
  }
};

const processClubImages = async (items) => {
  try {
    return Promise.all(
      items.map(async (item) => {
        const clubProfileImageUrl = await getImageUrl(item.clubProfileKeyName);
        
        return {
          ...item,
          clubProfileImageUrl: clubProfileImageUrl || '/default-image.png'
        };
      })
    );
  } catch (error) {
    console.error('이미지 처리 중 에러 발생:', error);
    return items.map(item => ({
      ...item,
      clubProfileImageUrl: '/default-image.png'
    }));
  }
};

const MyTeamsComp = () => {

    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await api.get('/api/clubs/my');
                if (response.data.isSuccess) {
                    const processedData = await processClubImages(response.data.result);
                    setTeams(processedData);
                }
            } catch (error) {
                console.error('팀 데이터 로딩 실패:', error);
                setError('팀 데이터를 불러오는 중 에러가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    return (
        <MainWrapp>
            <Title>팀 페이지</Title>

            {/* 로딩 상태 표시 */}
            {isLoading && <p>팀 데이터를 불러오는 중입니다...</p>}

            {/* 에러 메시지 표시 */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            
            <CardGrid>
            {!isLoading && !error && teams.length > 0 ? (

                    
                    teams.map((club) => {
                        
                        return (
                            <ClubCard key={club.clubId} 
                                onClick={() => navigate('/find/${club.clubId}')}
                                style={{cursor:'pointer'}}
                                >
                                <ImagePlaceholder>
                                    <img 
                                    src={club.clubProfileImageUrl}
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