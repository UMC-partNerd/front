import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.partnerd.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCollaborations = async (page, sortBy, categories) => {
  try {
    let url = `/api/collab-posts?page=${page}&sortBy=${sortBy}`;
    if (categories) {
      url += `&categories=${categories}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('콜라보레이션 데이터 조회 실패:', error);
    throw error;
  }
};

export const getImageUrl = async (keyName) => {
  try {
    if (!keyName) return null;
    
    const response = await api.get(`/api/s3/preSignedUrl`, {
      params: { keyName }
    });
    
    return response.data.result.cloudFrontUrl;
  } catch (error) {
    console.error('이미지 URL 조회 실패:', error);
    return null;
  }
}; 