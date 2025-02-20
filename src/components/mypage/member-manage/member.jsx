import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

// import {

// } from '../../../styled-components/user-Manage/styled-manageWindow';

export const STATUS = {
    PROJECT: 'project',
    CLUB: 'club',
};

function MamberList ({  }) {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const usersPerPage = 5;

    const allRequests = [
        {
            profileImageUrl: '/user01.png',
            nickname: '김원필',
            job: 'Android개발자',
            club: 'TectTect',
        },
        {
            profileImageUrl: '/user03.png',
            nickname: '조조',
            job: 'Design',
            club: '김치찌개',
        },
        {
            profileImageUrl: '/user05.png',
            nickname: '영광굴비',
            job: 'SpringBoot',
            club: '서울특별시',
        },
        {
            profileImageUrl: '/user04.png',
            nickname: '박명수',
            job: 'PM',
            club: '무한도전',
        },
    ];

    const allMembers = [
        {
            profileImageUrl: '/user05.png',
            nickname: '영광굴비',
            job: 'SpringBoot',
            club: '서울특별시',
        },
        {
            profileImageUrl: '/user02.png',
            nickname: '김영수',
            job: 'iOS개발자',
            club: '김밥천국',
        },
        {
            profileImageUrl: '/user04.png',
            nickname: '박명수',
            job: 'PM',
            club: '무한도전',
        },
        {
            profileImageUrl: '/user03.png',
            nickname: '조조',
            job: 'Design',
            club: '김치찌개',
        },
    ];

    // 요청
    useEffect(() => {
        fetchMoreRequests(); 
      }, []);
  
      const fetchMoreRequests = () => {
          setTimeout(() => {
          const startIndex = (page - 1) * usersPerPage;
          const endIndex = startIndex + usersPerPage;
          const newUsers = allRequests.slice(startIndex, endIndex);
      
          setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      
          
          if (endIndex >= allRequests.length) {
              setHasMore(false);
          }
      
          setPage((prevPage) => prevPage + 1);
          }, 1000); 
      };

    // 멤버
    useEffect(() => {
        fetchMoreMembers(); 
    }, []);

    const fetchMoreMembers = () => {
        setTimeout(() => {
        const startIndex = (page - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        const newUsers = allMembers.slice(startIndex, endIndex);
    
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
    
        
        if (endIndex >= allMembers.length) {
            setHasMore(false);
        }
    
        setPage((prevPage) => prevPage + 1);
        }, 1000); 
    };
    
    // const navigate = useNavigate();
    // const moveToColab = () => {
    //     navigate('/collaboration');
    // };

    const deleteHandler = () => {
        // 멤버 제거 동작
    };
  
    const approveHandler = () => {
        // 멤버 승인 동작
    };
    
    const rejectHandler = () => {
        // 멤버 거절 동작
    };  

    return (
        <UserListContainer>
            <InfiniteScroll
                dataLength={users.length}
                next={fetchMoreMembers}
                hasMore={hasMore}
                loader={<h4>로딩 중...</h4>}
                endMessage={<p>사용자를 불러왔습니다.</p>}
            >
                {users.map((user, index) => (
                    <Member key={index}
                            user={user}
                            status={STATUS.YES}
                            onClickXBtn={deleteHandler}
                            // onClickOBtn={approveHandler}
                    />
                ))}
            </InfiniteScroll>
        </UserListContainer>
    )
}


const UserListContainer = styled.div`
    padding: 10px;
`;


export default MamberList;