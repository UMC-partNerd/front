import { useState, useEffect } from 'react';
import { fetchHomeData } from '../apis/config';

export const useHomeData = () => {
  const [homeData, setHomeData] = useState({
    collaborations: [],
    clubs: [],
    projects: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHomeData();
        setHomeData({
          collaborations: data.collaborations || [],
          clubs: data.clubs || [],
          projects: data.projects || []
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { homeData, isLoading, error };
};
