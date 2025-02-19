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
    // 이미 URL 형식인 경우 바로 반환
    if (!keyName || keyName.startsWith('http')) {
      return keyName;
    }

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
    let isMounted = true;

    const fetchPhotos = async () => {
      try {
        // 각각의 이미지 파일에 대해 URL 요청
        if (bannerImageFile && isMounted) {
          const bannerUrl = await fetchPhotoUrl(bannerImageFile);
          setBannerPhotoUrl(bannerUrl);
        }

        if (mainImageFile && isMounted) {
          const mainUrl = await fetchPhotoUrl(mainImageFile);
          setMainPhotoUrl(mainUrl);
        }

        if (eventImageFiles && eventImageFiles.length > 0 && isMounted) {
          const eventUrls = await Promise.all(
            eventImageFiles.map(file => fetchPhotoUrl(file))
          );
          setEventPhotoUrls(eventUrls);
        }

        if (thumbnailImageFile && isMounted) {
          const thumbnailUrl = await fetchPhotoUrl(thumbnailImageFile);
          setThumbnailPhotoUrl(thumbnailUrl);
        }

        if (introImageFile && isMounted) {
          const introUrl = await fetchPhotoUrl(introImageFile);
          setIntroPhotoUrl(introUrl);
        }

        if (profileImageFile && isMounted) {
          const profileUrl = await fetchPhotoUrl(profileImageFile);
          setProfilePhotoUrl(profileUrl);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
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
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
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