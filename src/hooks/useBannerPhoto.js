import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/*
  주석 달지 않은 부분이 dev에 있는 코드 입니다.
*/

const useBannerPhoto = (folderName, bannerImageFile, mainImageFile, eventImageFiles, thumbnailImageFile, introImageFile) => {
  const [bannerPhotoUrl, setBannerPhotoUrl] = useState(null);
  const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
  const [eventPhotoUrls, setEventPhotoUrls] = useState([]);         //
  const [thumbnailPhotoUrl, setThumbnailPhotoUrl] = useState(null); //
  const [introPhotoUrl, setIntroPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotoUrl = useCallback(async (keyName) => {
    console.log('Fetching URL for keyName:', keyName); 
    try {
      const encodedKeyName = encodeURIComponent(keyName);
      console.log('Encoded keyName:', encodedKeyName);  
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

        // 인트로 이미지 처리 (중요)
        if (introImageFile) {
          console.log('Requesting intro image URL with keyName:', introImageFile); 
          const introUrl = await fetchPhotoUrl(introImageFile);
          setIntroPhotoUrl(introUrl);
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
      introImageFile 
    ) {
      fetchPhotos();
    }
  }, [bannerImageFile, mainImageFile, eventImageFiles, thumbnailImageFile, introImageFile, fetchPhotoUrl]);

  return { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, thumbnailPhotoUrl, introPhotoUrl, isLoading, error };
};

// const useBannerPhoto = (folderName, bannerImageFile, mainImageFile, eventImageFiles) => {
//   const [bannerPhotoUrl, setBannerPhotoUrl] = useState(null);
//   const [mainPhotoUrl, setMainPhotoUrl] = useState(null);
//   const [eventPhotoUrls, setEventPhotoUrls] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         if (bannerImageFile) {
//           // 배너 이미지 URL 요청
//           const bannerResponse = await axios.get(
//             `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${folderName}%2FBANNER%2F${bannerImageFile}`
//           );

//           if (bannerResponse.data && bannerResponse.data.result && bannerResponse.data.result.cloudFrontUrl) {
//             setBannerPhotoUrl(bannerResponse.data.result.cloudFrontUrl); // CloudFront URL 설정
//           } else {
//             setError('배너 이미지 URL을 찾을 수 없습니다.');
//           }
//         } else {
//           setError('배너 이미지 파일이 없습니다.');
//         }

//         if (mainImageFile) {
//           // 메인 이미지 URL 요청
//           const mainResponse = await axios.get(
//             `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${folderName}%2FMAIN%2F${mainImageFile}`
//           );

//           if (mainResponse.data && mainResponse.data.result && mainResponse.data.result.cloudFrontUrl) {
//             setMainPhotoUrl(mainResponse.data.result.cloudFrontUrl); // CloudFront URL 설정
//           } else {
//             setError('메인 이미지 URL을 찾을 수 없습니다.');
//           }
//         } else {
//           setError('메인 이미지 파일이 없습니다.');
//         }

//         if (eventImageFiles && eventImageFiles.length > 0) {
//           const eventPhotosPromises = eventImageFiles.map(async (file) => {
//             const eventResponse = await axios.get(
//               `https://api.partnerd.site/api/s3/preSignedUrl?keyName=${folderName}%2FEVENT%2F${file}`
//             );
//             if (eventResponse.data && eventResponse.data.result && eventResponse.data.result.cloudFrontUrl) {
//               return eventResponse.data.result.cloudFrontUrl;
//             } else {
//               throw new Error('이벤트 이미지 URL을 찾을 수 없습니다.');
//             }
//           });

//           const eventPhotoUrls = await Promise.all(eventPhotosPromises);
//           setEventPhotoUrls(eventPhotoUrls);
//         }

//       } catch (err) {
//         setError('이미지 데이터를 불러오는 중 오류가 발생했습니다.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (bannerImageFile || mainImageFile || (eventImageFiles && eventImageFiles.length > 0)) {
//       fetchPhotos(); // 이미지 파일이 존재하면 요청 보내기
//     }
//   }, [folderName, bannerImageFile, mainImageFile, eventImageFiles]); // folderName, imageFile이 변경될 때마다 실행

//   return { bannerPhotoUrl, mainPhotoUrl, eventPhotoUrls, isLoading, error };
// };

export default useBannerPhoto;