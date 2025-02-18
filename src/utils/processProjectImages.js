import axios from "axios";

const API_BASE_URL = "https://api.partnerd.site";

const getImageUrl = async (thumbnailKeyName) => {
    try {
        if (!thumbnailKeyName) return null; // 이미지 키 값이 없으면 처리 안 함

        const response = await axios.get(`${API_BASE_URL}/api/s3/preSignedUrl`, {
            params: { keyName: thumbnailKeyName }
        });

        return response.data.result.cloudFrontUrl || null;
    } catch (err) {
        console.error("이미지 URL 가져오기 실패:", err);
        return null;
    }
};
