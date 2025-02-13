import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfilePhoto = () => {
  const [nickname, setNickname] = useState(null);  // 닉네임만 저장
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);  // 프로필 사진 URL
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // 사용자 정보 조회 API 호출
        const response = await axios.get('https://api.partnerd.site/api/users/me/info');

        if (response.data.isSuccess) {
          const { nickname, profileKeyName } = response.data.result;

          // nickname이 없으면 '익명'으로 설정
          setNickname(nickname || '익명');  

          // profileKeyName을 이용해 프로필 이미지 URL 요청
          const fullProfileKeyName = `myProfileImage/MYPROFILE/${profileKeyName}`;  // folderName과 type 적용
          
          const profilePhotoResponse = await axios.get(
            `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${fullProfileKeyName}`
          );
          
          if (profilePhotoResponse.data.result && profilePhotoResponse.data.result.cloudFrontUrl) {
            setProfilePhotoUrl(profilePhotoResponse.data.result.cloudFrontUrl);
          } else {
            setError('프로필 사진 URL을 불러오는 중 오류가 발생했습니다.');
          }
        } else {
          setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
        }
      } catch (err) {
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();  // 컴포넌트가 마운트되었을 때 API 호출
  }, []);

  return { nickname, profilePhotoUrl, isLoading, error };
};


export default useProfilePhoto;
