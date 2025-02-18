import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTeamMembers = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 현재 사용자 정보 가져오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('로그인이 필요합니다.');
        }

        const response = await axios.get('https://api.partnerd.site/api/users/me/info', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setCurrentUser(response.data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const getImageUrl = async (profileKeyName) => {
    try {
      if (!profileKeyName) return null;
      
      const response = await axios.get(`https://api.partnerd.site/api/s3/preSignedUrl`, {
        params: {
          keyName: profileKeyName
        }
      });
      
      return response.data.result.cloudFrontUrl;
    } catch (err) {
      console.error('이미지 URL 가져오기 실패:', err);
      return null;
    }
  };

  const searchMembers = async (nickname) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axios.get(`https://api.partnerd.site/api/partnerd/register/members`, {
        params: { nickname },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const members = await Promise.all(
        response.data.result.map(async (member) => ({
          nickname: member.nickname,
          profileImage: await getImageUrl(member.profileKeyName)
        }))
      );

      setSearchResults(members);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    searchMembers,
    currentUser
  };
}; 