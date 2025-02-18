import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useBannerPhoto = (
  folderName,
  bannerImageFile,
  mainImageFile,
  eventImageFiles,
  thumbnailImageFile,
  introImageFile,
  profileImageFile 
) => {
  const [bannerPhotoUrl, setBannerPhotoUrl] = useState(null);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
  const [eventPhotoUrls, setEventPhotoUrls] = useState([]);
  const [thumbnailPhotoUrl, setThumbnailPhotoUrl] = useState(null);
  const [introPhotoUrl, setIntroPhotoUrl] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotoUrl = useCallback(async (keyName) => {
    console.log('Fetching URL for keyName:', keyName);
    try {
      const encodedKeyName = encodeURIComponent(keyName);
      const response = await axios.get(
        `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${encodedKeyName}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      console.log('API Response:', response.data); // API 응답 확인

      if (response.data && response.data.result && response.data.result.cloudFrontUrl) {
        return response.data.result.cloudFrontUrl;
      } else {
        throw new Error('이미지 URL을 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error("Error fetching URL:", err);
      throw new Error('이미지 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // 각각의 이미지 파일에 대해 URL 요청
        if (bannerImageFile) {
          const bannerUrl = await fetchPhotoUrl(bannerImageFile);
          setBannerPhotoUrl(bannerUrl);
        }

        if (mainImageFile) {
          const mainUrl = await fetchPhotoUrl(mainImageFile);
          setMainPhotoUrl(mainUrl);
        }

        if (eventImageFiles && eventImageFiles.length > 0) {
          const eventUrls = await Promise.all(
            eventImageFiles.map(file => fetchPhotoUrl(file))
          );
          setEventPhotoUrls(eventUrls);
        }

        // 썸네일 처리
        if (thumbnailImageFile) {
          const thumbnailUrl = await fetchPhotoUrl(thumbnailImageFile);
          setThumbnailPhotoUrl(thumbnailUrl);
        }

        // 인트로 이미지 처리
        if (introImageFile) {
          console.log('Requesting intro image URL with keyName:', introImageFile);
          const introUrl = await fetchPhotoUrl(introImageFile);
          setIntroPhotoUrl(introUrl);
        }

        // 프로필 이미지 처리
        if (profileImageFile) {
          const profileUrl = await fetchPhotoUrl(profileImageFile);
          setProfilePhotoUrl(profileUrl);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      bannerImageFile || 
      mainImageFile || 
      (eventImageFiles && eventImageFiles.length > 0) ||
      thumbnailImageFile || 
      introImageFile ||
      profileImageFile 
    ) {
      fetchPhotos();
    }
  }, [
    bannerImageFile,
    mainImageFile,
    eventImageFiles,
    thumbnailImageFile,
    introImageFile,
    profileImageFile,
    fetchPhotoUrl
  ]);

  return { 
    bannerPhotoUrl, 
    mainPhotoUrl, 
    eventPhotoUrls, 
    thumbnailPhotoUrl, 
    introPhotoUrl,
    profilePhotoUrl, 
    isLoading, 
    error 
  };
};

export default useBannerPhoto;