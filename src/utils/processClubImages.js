import axios from "axios";
import Project from "../components/home/Project";

const API_BASE_URL = "https://api.partnerd.site";

const getImageUrl = async (profileKeyName) =>{
    try{
        if (!profileKeyName) return null; // profileKeyName이 없으면 처리 안 함

        const response = await axios.get(`${API_BASE_URL}/api/s3/preSignedUrl`, {
            params: { keyName: profileKeyName }
        });
        return response.data.result.cloudFrontUrl || null;
    } catch (err) {
        console.error("이미지 URL 가져오기 실패:", err);
        return null;
    }
};

//클럽 리스트 데이터 변환 
// ✅ 클럽 리스트 데이터를 변환하는 함수
export const processClubImages = async (clubList) => {
    return Promise.all(
        clubList.map(async (club) => {
            if (club.profileKeyName) {
                const cloudFrontUrl = await getImageUrl(club.profileKeyName);
                return {
                    ...club,
                    profileImageUrl: cloudFrontUrl || "", // 이미지 URL을 새로운 필드에 저장
                };
            }
            
            return club;
        })
    );
};

//퍼스널 페이지 프로젝트 리스트 변환
export const processProjectImages = async (projectList) =>{
    return Promise.all(
        projectList.map(async (project) =>{
            if (project.thumbnailKeyName) {
                const cloudFrontUrl = await getImageUrl(project.thumbnailKeyName);
                return {
                    ...project,
                    thumbnailUrl: cloudFrontUrl || "", // 변환된 이미지 URL 저장
                };
            }
        return project;
        })
    )
}