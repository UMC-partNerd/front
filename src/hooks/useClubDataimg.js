import { useState, useEffect } from "react";
import axios from "axios";
import { processClubImages } from "../utils/processClubImages";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useClubData = () => {
    const [clubs, setClubs] = useState([]); // 클럽 데이터 저장
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsLoading(true);

                const jwtToken = localStorage.getItem("jwtToken");
                if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/partnerd/myPartnerdPosts`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                console.log("마이페이지 - 팀 데이터:", response.data.result);
                
                const clubList = response.data.result?.clubPreviewDTOList || [];
                
                //  클럽 데이터에 이미지 URL 추가
                const processedClubs = await processClubImages(clubList);
                console.log("✅팀 데이터 이미지 URL : ", processedClubs);
                setClubs(processedClubs);
            } catch (err) {
                console.error("클럽 데이터 불러오기 실패:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClubs();
    }, []);

    return { clubs, isLoading, error };
};