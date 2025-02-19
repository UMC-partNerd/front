import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');  
    
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

        if (response.data && response.data.isSucess) {
          setUserInfo(response.data.result);
        } else {
          throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []); 

  return { userInfo, isLoading, error };
};

export default useUserInfo;
