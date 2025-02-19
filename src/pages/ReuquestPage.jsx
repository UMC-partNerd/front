import React from 'react';
import Banner from '../components/banner/Banner';
import Request, { TYPES } from '../components/collaboration/Request'

import {
    PaginationContainer,
    ArrowButton,
    ArrowIcon,
    PageButton
} from "../styled-components/styled-common";
  
const TEMP_REQUESTS = [
    {
      title: "동아리 이름",
      description: "동아리 한 줄 소개",
      imageUrl: "썸네일",
      category: "웹/앱 개발",
    },
    
];
  
const RequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('latest');
    const itemsPerPage = 2;

    // 예시 데이터
    const partners = Array(50).fill().map((_, index) => ({
        title: 'UMC',
        description: 'UMC는 IT연합 동아리입니다.',
        category: '웹/앱 개발',
        imageUrl: 'default-image-url.jpg'
    }));
    
    // 현재 페이지의 데이터만 선택
    const currentPartners = filteredPartners.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

    useEffect(() => {
        async function fetchRequests() {
          try {
            // const response = await fetch('/api/clubs/top');
            // const data = await response.json();
            // setClubs(data.slice(0, 3));
          } catch (error) {
            console.error('Failed to fetch clubs:', error);
          }
        }
    
        fetchRequests();
    }, []);

    const renderPageButtons = () => {
    const buttons = [];
    
    // 이전 페이지 버튼
    buttons.push(
        <ArrowButton
        key="prev"
        onClick={() => setCurrentPage(prev => prev === 1 ? totalPages : prev - 1)}
        >
        <ArrowIcon className="left" />
        </ArrowButton>
    );

    // 현재 페이지를 중심으로 순환하는 페이지 번호 생성
    let pageNumbers = [];
    for (let i = -2; i <= 2; i++) {
        let pageNum = currentPage + i;
        
        // 페이지 번호가 범위를 벗어나면 순환
        if (pageNum <= 0) pageNum = totalPages + pageNum;
        if (pageNum > totalPages) pageNum = pageNum - totalPages;
        
        pageNumbers.push(pageNum);
    }

    // 페이지 버튼 생성
    pageNumbers.forEach(num => {
        buttons.push(
        <PageButton
            key={num}
            $isActive={currentPage === num}
            onClick={() => setCurrentPage(num)}
        >
            {num}
        </PageButton>
        );
    });

    // 다음 페이지 버튼
    buttons.push(
        <ArrowButton
        key="next"
        onClick={() => setCurrentPage(prev => prev === totalPages ? 1 : prev + 1)}
        >
        <ArrowIcon className="right" />
        </ArrowButton>
    );

    return buttons;
    };

    const displayClubs = clubs.length > 0 ? clubs : TEMP_CARDS;

    return (
        <>
            <Banner
                largeText="협업 요청하기"
            />
            <>

                <PartnerGrid>
                {currentPartners.map((request, index) => (

                <Request  
                    key={index}
                    profile={requestprofile}
                    otherUser={request.otherUser}
                    title={request.title}
                    time={request.time}
                    message={request.message}
                    type={TYPES.SENDTO}
                />

                <Request  
                    key={index}
                    profile={requestprofile}
                    otherUser={request.otherUser}
                    title={request.title}
                    type={TYPES.RECEIVETO}
                />

                ))}
                </PartnerGrid>
        
                <PaginationContainer>
                    {renderPageButtons()}
                </PaginationContainer>
            </>
        </>
    );
};

export default RequestPage;