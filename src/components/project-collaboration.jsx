import React, { useState } from 'react';
import {
  PaginationContainer,
  ArrowButton,
  ArrowIcon,
  PageButton
} from "../styled-components/styled-common";

import {
  Container as CollaborationContainer,
  ProjectGrid,
  ProjectCard,
  ImagePlaceholder,
  CardContent,
  CategoryBadge,
  Title,
  Deadline,
  SortContainer,
  SortButton,
  ButtonContainer,
  WriteButton,
  CategoryContainer,
  CategoryButton,
  CategoryTitle
} from "../styled-components/styled-project-collaboration";

const ProjectCollaboration = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [collaborations, setCollaborations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const CATEGORY_MAPPING = {
    '전체': null,
    '웹/앱 개발': 1,
    '인공지능': 2,
    '데이터': 3,
    '디자인': 4,
    '마케팅': 5,
    '게임': 6,
    '기타': 7
  };

  useEffect(() => {
    const loadCollaborations = async () => {
      try {
        setIsLoading(true);
        const categoryId = CATEGORY_MAPPING[selectedCategory];
        const response = await fetchCollaborations(currentPage, sortBy, categoryId);
        
        if (response.isSuccess) {
          const { collabPostPreviewDTOLList, totalPage } = response.result;
          setCollaborations(collabPostPreviewDTOLList);
          setTotalPages(totalPage);
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        setError(err.message);
        console.error('콜라보레이션 데이터 로딩 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCollaborations();
  }, [currentPage, sortBy, selectedCategory]);

  const handleWriteClick = () => {
    navigate('/collaboration/collab-registration');
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  const renderPageButtons = () => {
    const buttons = [];
    
    buttons.push(
      <ArrowButton
        key="prev"
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
      >
        <ArrowIcon className="left" />
      </ArrowButton>
    );

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PageButton
          key={i}
          $isActive={currentPage === i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PageButton>
      );
    }

    buttons.push(
      <ArrowButton
        key="next"
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
      >
        <ArrowIcon className="right" />
      </ArrowButton>
    );

    return buttons;
  };

  // useNavigate 훅을 사용하여 이동 기능 추가
  const navigate = useNavigate();
  const handleWriteClick = () => {
    navigate('/collaboration/collab-registration');  // 버튼 클릭 시 이동
  };

  return (
    <CollaborationContainer>
      <CategoryTitle>카테고리</CategoryTitle>
      <CategoryContainer>
        {Object.keys(CATEGORY_MAPPING).map(category => (
          <CategoryButton
            key={category}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryContainer>

      <ButtonContainer>
        <SortContainer>
          <SortButton
            isActive={sortBy === 'createdAt'}
            onClick={() => setSortBy('createdAt')}
          >
            최신순
          </SortButton>
          <SortButton
            isActive={sortBy === 'endDate'}
            onClick={() => setSortBy('endDate')}
          >
            마감순
          </SortButton>
        </SortContainer>
        <WriteButton>협업글 작성하기</WriteButton>
      </ButtonContainer>

      <ProjectGrid>
        {collaborations.map((collab) => (
          <ProjectCard 
            key={collab.collabPostId}
            onClick={() => navigate(`/collaboration/${collab.collabPostId}`)}
          >
            <ImagePlaceholder>
              <img src={collab.imageUrl || "/default-image.png"} alt={collab.title} />
            </ImagePlaceholder>
            <CardContent>
              <CategoryBadge>
                {collab.categoryDTOList[0]?.name || '기타'}
              </CategoryBadge>
              <Title>{collab.title}</Title>
              <Deadline>
                {new Date(collab.startDate).toLocaleDateString()} ~ 
                {new Date(collab.endDate).toLocaleDateString()}
              </Deadline>
            </CardContent>
          </ProjectCard>
        ))}
      </ProjectGrid>

      <PaginationContainer>
        {renderPageButtons()}
      </PaginationContainer>
    </CollaborationContainer>
  );
};

export default ProjectCollaboration;
