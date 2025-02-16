import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import Member from './PostItem';

import {
    ManageNavBar,
    ManageItem,
    UnderBar,
    UserContainer
} from '../../../styled-components/styled-Modal';
import Button, { TYPES } from "../../common/button";
// import { useNavigate } from 'react-router-dom';

export const VERSIONS = {
    APPROVE: 'approve', // 동아리 가입 승인
    MANAGE: 'manage'    // 멤버 관리
};

function ManageWindow ({  }) {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const memberPerPage = 5;

    // 창 끄기
    const [openWindow, setOpenWindow] = useState(false);
    const closeWindow = setOpenWindow(false);

    // 요청 및 멤버
    useEffect(() => {
      fetchMoreMembers(); 
    }, []);

    const fetchMoreMembers = () => {
        setTimeout(() => {
        const startIndex = (page - 1) * memberPerPage;
        const endIndex = startIndex + memberPerPage;
        const newMembers = allMembers.slice(startIndex, endIndex);
    
        setMembers((prevMembers) => [...prevMembers, ...newMembers]);
    
        
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

    const renderManageWindow = () => (
        <>
            {/* 승인 / 관리 */}
            <ManageNavBar>
                <ManageItem>동아리 가입 승인</ManageItem>
                <ManageItem>멤버 관리</ManageItem>
                <UnderBar/>
            </ManageNavBar>

            {/* 창 끄기 x */}
            <Button
                type={TYPES.CANCEL}
                onClick={closeWindow}
            />

            {/* 창 끄기 x */}
            <UserContainer>
                <InfiniteScroll
                    dataLength={members.length}
                    next={fetchMoreMembers}
                    hasMore={hasMore}
                    loader={<h4>로딩 중...</h4>}
                    endMessage={<p>모든 게시물을 불러왔습니다.</p>}
                >
                    {members.map((member, index) => (
                        <PostItem key={index} member={member} />
                    ))}
                </InfiniteScroll>
            </UserContainer>
            </>
    );

    if (variant === VERSIONS.APPROVE) {
    }

    if (variant === VERSIONS.MANAGE) {
    }

    return renderManageWindow();
};

export default CustomModal;