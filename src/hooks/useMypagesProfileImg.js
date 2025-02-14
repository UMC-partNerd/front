import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useMypageImg = (profileKeyName) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const getProfileImageUrl = useCallback(async (file, type) => {
        if (!file || !type) {
            console.error("file 또는 type이 설정되지 않았습니다.", { file, type });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/s3/preSignedUrl?keyName=${profileKeyName}%2F${type}%2F${file}`
            );

            if (response.data?.result?.cloudFrontUrl) {
                setProfileImageUrl(response.data.result.cloudFrontUrl);
            } else {
                throw new Error(`${type} 이미지 URL을 찾을 수 없습니다.`);
            }

            console.log("이미지 불러오기", response.data);
        } catch (err) {
            console.error("이미지 데이터를 불러오는 중 오류 발생:", err);
            setError("이미지 데이터를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, [profileKeyName]);

    // 프로필 이미지 가져오기 실행
    useEffect(() => {
        if (profileKeyName) {
            getProfileImageUrl(profileKeyName, "jpeg");
        }
    }, [profileKeyName]);

    return { profileImageUrl, isLoading, error };

}

export default useMypageImg