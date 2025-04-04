import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useMypageImg = (profileKeyName) => {
  const API_BASE_URL = `https://api.partnerd.site`;
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageType, setImageType] = useState("image/jpeg"); // 기본 MIME 타입 설정

  const getProfileImageUrl = useCallback(async () => {
    if (!profileKeyName) {
      console.error("profileKeyName이 설정되지 않았습니다.");
      setIsLoading(false);
      return;
    }

    try {
      const encodedKeyName = encodeURIComponent(
        decodeURIComponent(profileKeyName)
      );
      console.log(`🔄 요청하는 파일명: ${encodedKeyName}`);

      const response = `https://www.partnerd.site/${encodedKeyName}`;

      const url = response;
      setProfileImageUrl(url);

      // 🔍 확장자로 MIME 타입 추정
      const extension = url.split(".").pop().toLowerCase();
      let mimeType = "image/jpeg"; // 기본값

      if (extension === "png") mimeType = "image/png";
      if (extension === "jpg" || extension === "jpeg") mimeType = "image/jpeg";
      if (extension === "gif") mimeType = "image/gif";
      if (extension === "webp") mimeType = "image/webp";

      setImageType(mimeType);

      console.log("✅ 이미지 불러오기 성공:", response);
    } catch (err) {
      console.error("이미지 데이터를 불러오는 중 오류 발생:", err);
      setError("이미지 데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [profileKeyName]);
  // 프로필 이미지 가져오기 실행
  useEffect(() => {
    if (profileKeyName) {
      getProfileImageUrl();
    }
  }, [profileKeyName, getProfileImageUrl]);

  return { profileImageUrl, isLoading, error, imageType };
};

export default useMypageImg;
