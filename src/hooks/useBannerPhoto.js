import { useState, useEffect } from 'react';
import axios from 'axios';

const useBannerPhoto = (folderName, bannerImageFile, mainImageFile, eventImageFiles) => {
  const [bannerPhotoUrl, setBannerPhotoUrl] = useState(null);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
  const [eventPhotoUrls, setEventPhotoUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (bannerImageFile) {
          // 배너 이미지 URL 요청
          const bannerResponse = await axios.get(
            `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${folderName}%2FBANNER%2F${bannerImageFile}`
          );

          if (bannerResponse.data && bannerResponse.data.result && bannerResponse.data.result.cloudFrontUrl) {
            setBannerPhotoUrl(bannerResponse.data.result.cloudFrontUrl); // CloudFront URL 설정
          } else {
            setError('배너 이미지 URL을 찾을 수 없습니다.');
          }
        } else {
          setError('배너 이미지 파일이 없습니다.');
        }

        if (mainImageFile) {
          // 메인 이미지 URL 요청
          const mainResponse = await axios.get(
            `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${folderName}%2FMAIN%2F${mainImageFile}`
          );

          if (mainResponse.data && mainResponse.data.result && mainResponse.data.result.cloudFrontUrl) {
            setMainPhotoUrl(mainResponse.data.result.cloudFrontUrl); // CloudFront URL 설정
          } else {
            setError('메인 이미지 URL을 찾을 수 없습니다.');
          }
        } else {
          setError('메인 이미지 파일이 없습니다.');
        }

        if (eventImageFiles && eventImageFiles.length > 0) {
          const eventPhotosPromises = eventImageFiles.map(async (file) => {
            const eventResponse = await axios.get(
              `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${folderName}%2FEVENT%2F${file}`
            );
            if (eventResponse.data && eventResponse.data.result && eventResponse.data.result.cloudFrontUrl) {
              return eventResponse.data.result.cloudFrontUrl;
            } else {
              throw new Error('이벤트 이미지 URL을 찾을 수 없습니다.');
            }
          });

          const eventPhotoUrls = await Promise.all(eventPhotosPromises);
          setEventPhotoUrls(eventPhotoUrls);
        }

      } catch (err) {
        setError('이미지 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (bannerImageFile || mainImageFile || (eventImageFiles && eventImageFiles.length > 0)) {
      fetchPhotos(); // 이미지 파일이 존재하면 요청 보내기
    }
  }, [folderName, bannerImageFile, mainImageFile, eventImageFiles]); // folderName, imageFile이 변경될 때마다 실행

  return { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, isLoading, error };
};

export default useBannerPhoto;