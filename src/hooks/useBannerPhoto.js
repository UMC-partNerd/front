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
    if (!keyName || keyName.startsWith('http')) {
      return keyName;
    }

    try {
      const encodedKeyName = encodeURIComponent(keyName);
      console.log('Requesting for encodedKeyName:', encodedKeyName);  // 로깅 추가

      const response = await axios.get(
        `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${encodedKeyName}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      console.log('Response from fetchPhotoUrl:', response);  // 응답 내용 확인

      if (response.data && response.data.result && response.data.result.cloudFrontUrl) {
        return response.data.result.cloudFrontUrl;
      } else {
        throw new Error('이미지 URL을 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error("Error fetching URL:", err);
      setError(err.message);
      throw new Error('이미지 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      try {
        // profileImageFile 값이 제대로 설정되었을 경우에만 fetchPhotoUrl 호출
        if (profileImageFile && !profilePhotoUrl && isMounted) {
          const profileUrl = await fetchPhotoUrl(profileImageFile);
          if (isMounted) {
            setProfilePhotoUrl(profileUrl);
          }
        }

        if (bannerImageFile && !bannerPhotoUrl && isMounted) {
          const bannerUrl = await fetchPhotoUrl(bannerImageFile);
          if (isMounted) {
            setBannerPhotoUrl(bannerUrl);
          }
        }

        if (mainImageFile && !mainPhotoUrl && isMounted) {
          const mainUrl = await fetchPhotoUrl(mainImageFile);
          if (isMounted) {
            setMainPhotoUrl(mainUrl);
          }
        }

        if (eventImageFiles && eventImageFiles.length > 0 && !eventPhotoUrls.length && isMounted) {
          const eventUrls = await Promise.all(
            eventImageFiles.map(file => fetchPhotoUrl(file))
          );
          if (isMounted) {
            setEventPhotoUrls(eventUrls);
          }
        }

        if (thumbnailImageFile && !thumbnailPhotoUrl && isMounted) {
          const thumbnailUrl = await fetchPhotoUrl(thumbnailImageFile);
          if (isMounted) {
            setThumbnailPhotoUrl(thumbnailUrl);
          }
        }

        if (introImageFile && !introPhotoUrl && isMounted) {
          const introUrl = await fetchPhotoUrl(introImageFile);
          if (isMounted) {
            setIntroPhotoUrl(introUrl);
          }
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

    // 이미지 파일이 제공되었을 때만 fetchPhotos 호출
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
    fetchPhotoUrl,
    bannerPhotoUrl,  
    mainPhotoUrl,
    eventPhotoUrls,
    thumbnailPhotoUrl,
    introPhotoUrl,
    profilePhotoUrl
  ]);

  console.log("Fetched profile image URL:", profilePhotoUrl); // 로깅

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
