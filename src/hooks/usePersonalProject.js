import { useState, useEffect } from "react";
import axios from "axios";
import { processProjectImages } from "../utils/processClubImages";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useProjectData = (pageSize = 4) => {
    const [projects, setProjects] = useState([]); // 클럽 데이터 저장
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProjects  = async () => {
            try {
                setIsLoading(true);

                const jwtToken = localStorage.getItem("jwtToken");
                if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/project/promotion/personal`, {
                    params: { page, pageSize },
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                console.log("마이페이지-퍼스널페이지:프로젝트", response.data.result);
                
                const projectList = response.data.result?.promotionProjectPreviewDTOList || [];
                const processedProjects = await processProjectImages(projectList); // ✅ 프로젝트 이미지 변환

                console.log("프로젝트 이미지 URL ", processedProjects)
                setProjects(processedProjects);
                setTotalPages(response.data.result?.totalPage || 1);
            } catch (err) {
                console.error("프로젝트 데이터 불러오기 실패:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [page]);

    return { projects, isLoading, error, page, totalPages, setPage };
};