import React from "react";
import {
  CollaborationContainer,
  Header,
  Title,
  MoreButton,
  CardGrid,
  CollabCard,
  CompanyLogo,
  TitleRow,
  InfoColumn,
  CompanyName,
  CollabTitle,
  CollabDescription,
  PostDate
} from "../../styled-components/styled-Collaboration";
import { useCollaborationData } from '../../hooks/useCollaborationData';
import { useNavigate } from 'react-router-dom';

const Collaboration = () => {
  const navigate = useNavigate();
  const { collaborations, isLoading, error } = useCollaborationData();

  const handleCardClick = (id) => {
    navigate(`/collaboration/${id}`);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!collaborations || collaborations.length === 0) return <div>콜라보레이션 데이터가 없습니다.</div>;

  return (
    <CollaborationContainer>
      <Header>
        <Title>최근 등록된 콜라보레이션</Title>
        <MoreButton href="/collaboration">더보기 ›</MoreButton>
      </Header>
      <CardGrid>
        {collaborations.map((collab) => (
          <CollabCard 
            key={collab.id}
            onClick={() => handleCardClick(collab.id)}
          >
            <TitleRow>
              <CompanyLogo>
                <img 
                  src={collab.imageUrl || collab.thumbnail || '/default-image.png'} 
                  alt={collab.clubName}
                  onError={(e) => {
                    e.target.src = '/default-image.png';
                    e.target.onerror = null;
                  }}
                />
              </CompanyLogo>
              <CollabTitle>{collab.title}</CollabTitle>
              <PostDate>1일 전</PostDate>
            </TitleRow>
            <InfoColumn>
              <CollabDescription>{collab.intro}</CollabDescription>
              <CompanyName>{collab.clubName}</CompanyName>
            </InfoColumn>
          </CollabCard>
        ))}
      </CardGrid>
    </CollaborationContainer>
  );
};

export default Collaboration;
