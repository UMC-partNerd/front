import { useState, useEffect, useCallback } from "react";
import axios from "axios";

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

  const convertToCloudFrontUrl = (url) => {
    if (url && url.startsWith("http://localhost:3000")) {
      return url.replace(
        "http://localhost:3000",
        "https://d5sroz33vtblq.cloudfront.net"
      );
    }
    return url;
  };

  const fetchPhotoUrl = useCallback(async (keyName) => {
    return `https://www.partnerd.site/${keyName}`;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      try {
        if (profileImageFile && !profilePhotoUrl && isMounted) {
          const profileUrl = await fetchPhotoUrl(profileImageFile);
          if (isMounted) {
            setProfilePhotoUrl(convertToCloudFrontUrl(profileUrl)); // CloudFront URL로 변환
          }
        }

        if (bannerImageFile && !bannerPhotoUrl && isMounted) {
          const bannerUrl = await fetchPhotoUrl(bannerImageFile);
          if (isMounted) {
            setBannerPhotoUrl(convertToCloudFrontUrl(bannerUrl)); // CloudFront URL로 변환
          }
        }

        if (mainImageFile && !mainPhotoUrl && isMounted) {
          const mainUrl = await fetchPhotoUrl(mainImageFile);
          if (isMounted) {
            setMainPhotoUrl(convertToCloudFrontUrl(mainUrl)); // CloudFront URL로 변환
          }
        }

        if (
          eventImageFiles &&
          eventImageFiles.length > 0 &&
          !eventPhotoUrls.length &&
          isMounted
        ) {
          const eventUrls = await Promise.all(
            eventImageFiles.map((file) => fetchPhotoUrl(file))
          );
          if (isMounted) {
            setEventPhotoUrls(
              eventUrls.map((url) => convertToCloudFrontUrl(url))
            ); // CloudFront URL로 변환
          }
        }

        if (thumbnailImageFile && !thumbnailPhotoUrl && isMounted) {
          const thumbnailUrl = await fetchPhotoUrl(thumbnailImageFile);
          if (isMounted) {
            setThumbnailPhotoUrl(convertToCloudFrontUrl(thumbnailUrl)); // CloudFront URL로 변환
          }
        }

        if (introImageFile && !introPhotoUrl && isMounted) {
          const introUrl = await fetchPhotoUrl(introImageFile);
          if (isMounted) {
            setIntroPhotoUrl(convertToCloudFrontUrl(introUrl)); // CloudFront URL로 변환
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
    profilePhotoUrl,
  ]);

  return {
    bannerPhotoUrl,
    mainPhotoUrl,
    eventPhotoUrls,
    thumbnailPhotoUrl,
    introPhotoUrl,
    profilePhotoUrl,
    isLoading,
    error,
  };
};

export default useBannerPhoto;
