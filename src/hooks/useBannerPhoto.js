import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useBannerPhoto = (folderName, bannerImageFile, mainImageFile, eventImageFiles) => {
  const [bannerPhotoUrl, setBannerPhotoUrl] = useState(null);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
  const [eventPhotoUrls, setEventPhotoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotoUrl = useCallback(async (file, type) => {
    try {
      const response = await axios.get(
        `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${folderName}%2F${type}%2F${file}`
      );
      if (response.data && response.data.result && response.data.result.cloudFrontUrl) {
        return response.data.result.cloudFrontUrl;
      } else {
        throw new Error(`${type} 이미지 URL을 찾을 수 없습니다.`);
      }
    } catch (err) {
      throw new Error('이미지 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  }, [folderName]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (bannerImageFile) {
          const bannerUrl = await fetchPhotoUrl(bannerImageFile, 'BANNER');
          setBannerPhotoUrl(bannerUrl);
        }

        if (mainImageFile) {
          const mainUrl = await fetchPhotoUrl(mainImageFile, 'MAIN');
          setMainPhotoUrl(mainUrl);
        }

        if (eventImageFiles && eventImageFiles.length > 0) {
          const eventUrls = await Promise.all(
            eventImageFiles.map(file => fetchPhotoUrl(file, 'EVENT'))
          );
          setEventPhotoUrls(eventUrls);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (bannerImageFile || mainImageFile || (eventImageFiles && eventImageFiles.length > 0)) {
      fetchPhotos();
    }
  }, [bannerImageFile, mainImageFile, eventImageFiles, fetchPhotoUrl]);

  return { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, isLoading, error };
};

export default useBannerPhoto;
