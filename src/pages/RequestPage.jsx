import styled from 'styled-components';
import React, { useState, useEffect } from "react";
import Banner from '../components/common/banner/Banner';
import CustomModal, { VERSIONS } from "../components/common/button/CustomModal";
import Request, { TO } from "../components/common/button/Request";
// import Tab from "../components/common/Tab/tab"
import {
    PaginationContainer,
    ArrowButton,
    ArrowIcon,
    PageButton
} from "../styled-components/styled-common";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const INIT = [];

const TEMP_RECEIVETO = [
    {
      otherUser: "LVflower",
      title: "2025 IT 컨퍼런스 공동 개최",
    },
    {
      otherUser: "갓페퍼민트",
      title: "2D 픽셀 게임 런칭 프로젝트",
    }
];
  
const RequestPage = () => {
    // const [cancel, setCancel] = useState(flase);
    const [sendRequests, setSendRequests] = useState([]);
    const [receiveRequests, setReceiveRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  const { requestId: urlRequestId } = useParams();
  const [selectedTab, setSelectedTab] = useState("receive"); // "send" 또는 "receive"   // 보낸 요청 조회 api가 없는 듯듯
  const token = localStorage.getItem("jwtToken");
  const [avatarUrls, setAvatarUrls] = useState({});
  const navigate = useNavigate();

  const itemsPerPage = 2;

  useEffect(() => {
    fetchRequests(selectedTab);
  }, [selectedTab]);

  const fetchRequests = async (tab) => {

    if (!jwtToken) {
        alert('로그인이 필요합니다.');
        return;
    }
    
    setLoading(true);

    try {
      const url =
        tab === "receive"
          ? "https://api.partnerd.site/api/collabAsks"
          : "";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`${tab} 요청 목록:`, response.data.result);

      if (tab === "receive") {
        setReceiveRequests(response.data.result || []);
      }
    //   } else {
    //     setSendRequests(response.data.result.sendRequests || []);
    //   } 

        setTotalPages(result.totalPage || 1);

    } catch (error) {
      console.error(`${tab} 요청 불러오기 실패`, error);
    } finally {
        setLoading(false);
    }
  };

  ///////
  // ✅ Presigned URL 요청 함수
  const fetchPresignedUrl = async (imgKey) => {
    console.log(imgKey);
    if (!imgKey) return "/default-avatar.png"; // 기본 이미지 반환
    try {
      const response = await axios.get(
        `https://api.partnerd.site/api/s3/preSignedUrl`,
        {
          params: {
            keyName: imgKey,
          },
        }
      );

      if (response.data.isSuccess) {
        return response.data.result.cloudFrontUrl;
      }
    } catch (error) {
      console.error("Presigned URL 요청 실패 ❌", error);
      return "/default-avatar.png"; // 요청 실패 시 기본 이미지 사용
    }
  };
  
  // 탭 변경시 아바타 이미지 URL 요청
  useEffect(() => {
    const fetchAvatars = async () => {
      console.log(`🔄 Avatar 업데이트 실행 - 현재 탭: ${selectedTab}`);

      const updatedUrls = {};
      const requestListToUse =
        selectedTab === "receive" ? receiveRequests : sendRequests;

      if (!requestListToUse || requestListToUse.length === 0) {
        console.log("⚠️ 요청 목록이 비어 있음, 아바타 업데이트 중단");
        return;
      }

      // 기존 avatarUrls를 초기화하고 새로운 요청 실행
      setAvatarUrls({});
      const promises = requestListToUse.map(async (request) => {
        const imgKey =
          selectedTab === "receive"
            ? request.receiverProfileImgKeyname
            : request.clubProfileImgKeyname;
        if (!imgKey) return;

        // 기존 URL이 존재하는 경우 요청하지 않음 (캐싱 적용)
        if (!avatarUrls[request.requestId]) {
          const url = await fetchPresignedUrl(imgKey);
          updatedUrls[request.requestId] = url;
        }
      });
      await Promise.all(promises); // 병렬 처리

      console.log("✅ Avatar URL 업데이트 완료:", updatedUrls);
      setAvatarUrls((prev) => ({ ...prev, ...updatedUrls }));
    };

    fetchAvatars();
  }, [selectedTab, sendRequests, receiveRequests]); // ✅ 탭 변경 시마다 업데이트

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
      const pageNumbers = new Set(); // 중복 제거를 위한 Set 사용
      for (let i = -2; i <= 2; i++) {
        let pageNum = currentPage + i;
        
        // 페이지 번호가 범위를 벗어나면 순환
        if (pageNum <= 0) pageNum = totalPages + pageNum;
        if (pageNum > totalPages) pageNum = pageNum - totalPages;
        
        // 유효한 페이지 번호만 추가 (1부터 totalPages까지)
        if (pageNum >= 1 && pageNum <= totalPages) {
          pageNumbers.add(pageNum);
        }
      }
  
      // Set을 배열로 변환하고 정렬하여 페이지 버튼 생성
      [...pageNumbers].sort((a, b) => a - b).forEach(num => {
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

    // (알림창에서 확인하러가기)요청이 삭제된 경우 
    const [openModal, setOpenModal] = useState(false);
    const moveToCollab = () => {
        setOpenModal(false);
        navigate(`/collabaration`);
    };
    
    const moveToPost = () => {
        setOpenModal(false);
        navigate(`/collaboration/${collabId}`);
    };
    
    const moveToChat = () => {
        setOpenModal(false);
        navigate(`/chat`);
    };

    return (
    <>
        <Banner largeText="협업 요청 확인하기"/>
        <ContentContainer>
            <TabMenu>
                <Tab
                    active={selectedTab === "send"}
                    onClick={() => setSelectedTab("send")}
                >
                    보낸 요청
                </Tab>
                <Tab
                    active={selectedTab === "receive"}
                    onClick={() => setSelectedTab("receive")}
                >
                    받은 요청
                </Tab>
            </TabMenu>

            <RequestBox>
            {(selectedTab === "receive" ? receiveRequests : sendRequests).map((request) => (

                // <Request  
                //     key={request.collabAsksId}
                //     profile={request.profile}
                //     otherUser={request.otherUser}
                //     title={request.title}
                //     time={request.time}
                //     message={request.message}
                //     type={TYPES.SENDTO}
                // />

                <Request  
                    key={request.collabAsksId}
                    profile={request.profile}                
                    who={request.who}
                    club={request.club}
                    onClickPost={onClickPost}
                    onClickChat={onClickChat}
                    to={TO.SEND}
                />

            ))}

                <Request  
                    profile=""                 
                    who="리아동"
                    club="컨퍼런스 IT"
                    onClickPost={moveToPost}
                    onClickChat={moveToChat}
                    to={TO.SEND}
                />
                <Request  
                    profile=""                 
                    who="동아리"
                    club="IT 컨퍼런스"
                    onClickPost={moveToPost}
                    onClickChat={moveToChat}
                    to={TO.SEND}
                />
            </RequestBox>
            
            {/* 요청 취소된 경우 띄우는 모달 */}
            <CustomModal
                openModal={openModal} 
                closeModal={moveToCollab}

                boldface='취소된 콜라보레이션'
                regular='다른 동아리와 협업해볼까요?'
                variant={VERSIONS.VER1}
            />

            <PaginationContainer>
                {totalPages > 0 && (
                    <PaginationContainer>
                    {renderPageButtons()}
                    </PaginationContainer>
                )}
            </PaginationContainer>
        </ContentContainer>
    </>
  );
};

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 20px;

    width: 80%,
    height: 80%,

    margin: 0 auto;
`;

const MenuWrapp = styled.div`
    align-items: center;
    margin-top: 40px;
    gap: 160px;
    padding: 8px 120px;

    width: 1000px,
    height: 500px,
`;

const TabMenu = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%,
    margin-bottom: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
    flex-shrink: 0;
    border-radius: 16px;
    background: #FFFFFF;
    padding: 20px 80px;
    gap: 160px;

`;

const Tab = styled.div`
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: ${({ active }) => (active ? "700" : "500")};
    line-height: normal;
    color: ${({ active }) => (active ? "#0D29B7" : "#C2C2C2")};
`;

const RequestBox = styled.div`
    weight: 80%;
    height: 80%;

    display: flex;
    justify-content: space-between;

    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 24px;
`;

export default RequestPage;