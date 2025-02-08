import styled from "styled-components"
import { MainWrapp, Title } from "../../styles/mypagestyles";
import PostFeed from "./mypost_feed";
import { CategoryGroup, CategoryButton } from "../../styled-components/styled-project-recruitment";
import { useState, useEffect } from "react";
import axios from "axios";

const MyPostsComp = () =>{

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [selectedCategory, setSelectedCategory] = useState("콜라보레이션");
    const [posts, setPosts] = useState([]); // 가져온 게시글 데이터
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const projectCategories = [
        { name: "콜라보레이션", endpoint: "/api/collabPosts/mypage" },
        { name: "프로젝트 모집하기", endpoint: "/api/project/recruit/mypage" },
        { name: "프로젝트 홍보하기", endpoint: "/api/project/promotion/mypage" },
        { name: "커뮤니티", endpoint: "" }, // 커뮤니티 API 엔드포인트 추가 필요 ↗️
    ];

    //선택된 카테고리의 api 호출
    const fetchPosts = async (category) =>{
        const categoryObj = projectCategories.find((c) => c.name === category);
        if (!categoryObj || !categoryObj.endpoint) return;

        setLoading(true);
        setError(null);

        try{
            const jwtToken = localStorage.getItem("jwtToken"); 

            if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    setLoading(false);
                    return;
            }

            const response = await axios.get(`${API_BASE_URL}${categoryObj.endpoint}`,
            {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                    }
            });

            console.log("내가 쓴 글", response.data.result);
            const postList = response.data.result?.[categoryObj.key] || [];
            setPosts(postList);
        }catch (error) {
            console.error("게시글 불러오기 실패:", error);
            setError("게시글을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

     // 카테고리 변경 시 데이터 가져오기
    useEffect(() => {
        fetchPosts(selectedCategory);
    }, [selectedCategory]);




    return(
        <MainWrapp>
        <Title>내가 쓴 글</Title>
{/* 
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
        </CategoryGroup> */}
        <CategoryGroup>
                {projectCategories.map(({ name }) => (
                    <CategoryButton
                        key={name}
                        isActive={selectedCategory === name}
                        onClick={() => setSelectedCategory(name)}
                        style={{ fontSize: "10px" }}
                    >
                        {name}
                    </CategoryButton>
                ))}
        </CategoryGroup>

        {/* 🔹 로딩 상태 */}
        {loading && <Title>게시글을 불러오는 중...</Title>}

        {/* 🔹 에러 상태 */}
        {error && <Title style={{ color: "red" }}>{error}</Title>}

        {/* 🔹 게시글 목록 렌더링 */}
        {!loading && !error && posts.length > 0 ? (
            posts.map((post) => <PostFeed key={post.id || post.projectId || post.collabPostId} post={post} />)
        ) : (
            // 배열이 0인 경우
            !loading && <Title>작성한 게시글이 없습니다.</Title>
)}

        </MainWrapp>
    )
}

export default MyPostsComp;