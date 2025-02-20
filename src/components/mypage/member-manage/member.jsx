import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
// import Button, { TYPES } from "../common/button";

// import {

// } from '../../../styled-components/user-Manage/styled-manageWindow';

export const STATUS = {
    YES: 'yes',
    NO: 'no',
};

function Mamber ({ status }) {
    // const [users, setUsers] = useState([]);
    // const [page, setPage] = useState(1);
    // const [hasMore, setHasMore] = useState(true);
    // const usersPerPage = 5;

    // const allRequests = [
    //     {
    //         profileImageUrl: '/user01.png',
    //         nickname: '김원필',
    //         job: 'Android개발자',
    //         club: 'TectTect',
    //     },
    //     {
    //         profileImageUrl: '/user03.png',
    //         nickname: '조조',
    //         job: 'Design',
    //         club: '김치찌개',
    //     },
    //     {
    //         profileImageUrl: '/user05.png',
    //         nickname: '영광굴비',
    //         job: 'SpringBoot',
    //         club: '서울특별시',
    //     },
    //     {
    //         profileImageUrl: '/user04.png',
    //         nickname: '박명수',
    //         job: 'PM',
    //         club: '무한도전',
    //     },
    // ];

    // const allMembers = [
    //     {
    //         profileImageUrl: '/user05.png',
    //         nickname: '영광굴비',
    //         job: 'SpringBoot',
    //         club: '서울특별시',
    //     },
    //     {
    //         profileImageUrl: '/user02.png',
    //         nickname: '김영수',
    //         job: 'iOS개발자',
    //         club: '김밥천국',
    //     },
    //     {
    //         profileImageUrl: '/user04.png',
    //         nickname: '박명수',
    //         job: 'PM',
    //         club: '무한도전',
    //     },
    //     {
    //         profileImageUrl: '/user03.png',
    //         nickname: '조조',
    //         job: 'Design',
    //         club: '김치찌개',
    //     },
    // ];

    // // 요청
    // useEffect(() => {
    //     fetchMoreRequests(); 
    //   }, []);
  
    //   const fetchMoreRequests = () => {
    //       setTimeout(() => {
    //       const startIndex = (page - 1) * usersPerPage;
    //       const endIndex = startIndex + usersPerPage;
    //       const newUsers = allRequests.slice(startIndex, endIndex);
      
    //       setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      
          
    //       if (endIndex >= allRequests.length) {
    //           setHasMore(false);
    //       }
      
    //       setPage((prevPage) => prevPage + 1);
    //       }, 1000); 
    //   };

    // // 멤버
    // useEffect(() => {
    //     fetchMoreMembers(); 
    // }, []);

    // const fetchMoreMembers = () => {
    //     setTimeout(() => {
    //     const startIndex = (page - 1) * usersPerPage;
    //     const endIndex = startIndex + usersPerPage;
    //     const newUsers = allMembers.slice(startIndex, endIndex);
    
    //     setUsers((prevUsers) => [...prevUsers, ...newUsers]);
    
        
    //     if (endIndex >= allMembers.length) {
    //         setHasMore(false);
    //     }
    
    //     setPage((prevPage) => prevPage + 1);
    //     }, 1000); 
    // };
    
    // // const navigate = useNavigate();
    // // const moveToColab = () => {
    // //     navigate('/collaboration');
    // // };

    // const deleteHandler = () => {
    //     // 멤버 제거 동작
    // };
  
    // const approveHandler = () => {
    //     // 멤버 승인 동작
    // };
    
    // const rejectHandler = () => {
    //     // 멤버 거절 동작
    // };  

    const location = useLocation();
    const isManagePage = location.pathname === `/find/${clubId}/manage`;

    const onClickHandler = () => {
    
    };

    const rederDefaultMember = () => (
        <Container status={status}>
            <UserWrapp>
                {/* 이미지 */}
                <ImageComp 
                        src={profileImageUrl}
                            alt = "프로필 이미지"
                        />
                <CenterContainer>
                        <NameField>
                            <Name>{nickname || "이름 없음"}</Name>
                            <Explan>{explan||"설명"}</Explan>
                        </NameField>
                    
                </CenterContainer>
            </UserWrapp>
            
            {intro && <BottomContainer>
                        <Divider />
                        <IntroText>{intro}</IntroText>
                    </BottomContainer>}
        </Container>
    );

    if (status === STATUS.NO) {
        return renderClubCard();
    }

    return rederDefaultMember();
}

export default Mamber;

const BottomContainer = styled.div`
display:flex;
width:62%;
flex-direction:column;

`

const ButtonWrapper = styled.div`
    margin-left: auto; /* 버튼을 오른쪽 끝으로 이동 */
`;

const UserWrapp = styled.div`
display:flex;
flex-direction:row;
align-items:center;
width: 100%;  
justify-content: flex-start; 

`

const CenterContainer = styled.div`
display:flex;
flex-direction:column;
`

const Divider = styled.hr`
    width: 100%;
    border: 0;
    border-top: 1px solid #ddd;
    margin: 8px 0;
`;


const IntroText = styled.p`
    font-size: 12px;
    color: #555;
    margin-top: 4px;
`;

const Name = styled.div`
font-size:16px;
`

const Explan = styled.div`
margin-top:10px;
font-size:14px;
`

const SubContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`

const NameField = styled.div`
display:flex;
flex-direction:column;
margin-left:15px;
`

const Container = styled.main`
width: 100%;
max-width:405px;
min-height: 110px;
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
border-radius: 8px;
display:flex;
flex-direction:column;
align-items:center;
padding:10px 20px 10px 20px;
box-sizing: border-box;
justify-content: space-between;
margin-bottom:50px;
`

const ImageComp = styled.img`
object-fit: cover;
border-radius: 50%;
background:gray;
width: 50px; /* 최소 너비를 고정 */
  max-width: 50px; /* 최대 너비를 고정 */
  min-height: 50px; /* 최소 높이를 고정 */
  max-height: 50px; /* 최대 높이를 고정 */
margin-left:0;
`