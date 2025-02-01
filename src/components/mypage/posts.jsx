import styled from "styled-components"
import { MainWrapp, Title } from "../../styles/mypagestyles";
import PostFeed from "./mypost_feed";
import { CategoryGroup, CategoryButton } from "../../styled-components/styled-project-recruitment";
import { useState } from "react";

const MyPostsComp = () =>{

    const [selectedCategory, setSelectedCategory] = useState('전체');

    const projectCategories = [
        '콜라보레이션',
        '프로젝트 모집하기',
        '프로젝트 홍보하기',
        '커뮤니티',
    ];


     // 예시 데이터
  const projects = Array(50).fill().map((_, index) => ({
    title: 'UMC',
    description: 'UMC는 IT연합 동아리입니다.',
    category: ['Web', 'Server', 'iOS', 'Android', 'Design', 'PM', 'AI/데이터', '게임 개발', '기타'][Math.floor(Math.random() * 9)],
    status: index % 2 === 0 ? 'recruiting' : 'completed',
    imageUrl: 'default-image-url.jpg'
  }));




    return(
        <MainWrapp>
        <Title>내가 쓴 글</Title>

        <CategoryGroup>
                    {projectCategories.map(category => (
                    <CategoryButton style={{fontSize:'10px'}}
                        key={category}
                        isActive={selectedCategory === category}
                        onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                        }}
                    >
                        {category}
                    </CategoryButton>
                    ))}
        </CategoryGroup>
        <PostFeed />
        </MainWrapp>
    )
}

export default MyPostsComp;