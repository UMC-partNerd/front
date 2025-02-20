import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');  // JWT 토큰 가져오기
    
    if (!jwtToken) {
      setError('토큰이 없습니다.');
      setIsLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://api.partnerd.site/api/users/me/info', {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        });
        
        console.log('Response data:', response.data);  // 응답 데이터 로그 찍기
    
        if (response.data && response.data.isSuccess) {
          setUserInfo(response.data.result);
        } else {
          throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserInfo();
  }, []);  

  useEffect(() => {
    if (userInfo) {
      // userInfo가 정상적으로 세팅된 후 profileImageKey 로그 출력
      console.log("User Info (profileImageKey 확인):", userInfo.profileKeyName);  // profileKeyName이 잘 전달되었는지 확인
    }
  }, [userInfo]);

  return { userInfo, isLoading, error };
};

export default useUserInfo;
