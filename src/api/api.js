import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.partnerd.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      console.error('Response Error:', error.response.data);
      
      // 401 Unauthorized 에러 처리
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
    } else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      console.error('Request Error:', error.request);
    } else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 