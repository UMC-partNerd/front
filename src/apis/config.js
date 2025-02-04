export const BASE_URL = 'https://api.partnerd.site';

export const fetchHomeData = async () => {
  try {
    console.log('Fetching data from:', `${BASE_URL}/api/home`);
    const response = await fetch(`${BASE_URL}/api/home`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
