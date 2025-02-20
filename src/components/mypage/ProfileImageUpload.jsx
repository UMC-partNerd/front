import React, { useRef, useState } from 'react';
import Button, { TYPES } from "../common/button"; // ✅ 버튼 재사용

const ProfileImageUpload = ({ setImageKey, setImagePreview }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleClick = () => {
        fileInputRef.current.click(); // 파일 선택창 열기
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const response = await fetch('https://api.partnerd.site/api/s3/preSignedUrl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    folderName: "profile",
                    type: "userProfile",
                    contentType: file.type,
                }),
            });

            const data = await response.json();
            console.log("🔍 Presigned URL 응답 데이터:", data);

            if (!data?.result?.preSignedUrl || !data?.result?.keyName) {
                throw new Error("🚨 Presigned URL 요청 실패: " + JSON.stringify(data));
            }

            const { preSignedUrl, keyName } = data.result;
            setImageKey(keyName); // ✅ 업로드된 이미지 키 저장
            console.log("📂 업로드된 이미지 Key:", keyName);

            await fetch(preSignedUrl, {
                method: 'PUT',
                headers: { 'Content-Type': file.type },
                body: file,
            });

            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            console.log("✅ 이미지 업로드 완료:", imageUrl);
        } catch (error) {
            console.error("❌ 이미지 업로드 중 오류 발생", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <S.UploadGroup>
            <S.UploadRectangle onClick={handleClick}>
                <S.CenterContainer>
                    <S.ImagePreview src='/image.png' alt='Icon' />
                    <S.UploadText>이미지 업로드하기</S.UploadText>
                </S.CenterContainer>
            </S.UploadRectangle>
            <input
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {uploading && <p>업로드 중...</p>}
        </S.UploadGroup>
    );
};

export default ProfileImageUpload;
