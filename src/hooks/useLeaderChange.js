import { useState } from 'react';
import axios from 'axios';

export const useLeaderChange = (clubId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 리더 정보 가져오기
  const fetchLeaderInfo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwtToken');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      
      const response = await axios.get(`${API_BASE_URL}/api/partnerd/${clubId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      return response.data.leader;
    } catch (error) {
      console.error('리더 정보를 가져오는 데 실패했습니다:', error);
      setError('리더 정보를 가져오는 데 실패했습니다.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 리더 변경하기
  const changeLeader = async (newLeaderId) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('jwtToken');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      
      const response = await axios.put(
        `${API_BASE_URL}/api/partnerd/${clubId}/${newLeaderId}`,
        {},
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        }
      );

      if (response.data.isSucess) {
        return true;
      }
      throw new Error('리더 변경에 실패했습니다.');
    } catch (error) {
      console.error('리더 변경에 실패했습니다:', error);
      setError('리더 변경에 실패했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchLeaderInfo,
    changeLeader,
    isLoading,
    error
  };
}; 