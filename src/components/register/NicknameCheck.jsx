import styled from "styled-components"
import { InputPass,NicknameWrapper,Form, FieldGroup, Subup, Input, Subdown, NicknameCheck } from "../../styles/registerstyles"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NicknameField = ({ value, onChange, onNicknameCheck , currentNickname}) =>{
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [nicknameError, setNicknameError] = useState("");

    //닉네임 변경 시 중복 확인 상태 초기화
    const handleInputChange = (e) =>{
        const newValue = e.target.value;
        onChange(e);
        setIsNicknameAvailable(null); //중복 확인 상태 초기화
        setIsNicknameChecked(false); //중복 확인 버튼 다시 활성화
        onNicknameCheck(false); //닉네임 중복 체크 상태 초기화

        
    }

    //닉네임 중복 확인 
    const handleNicknameSubmit = async () =>{
        if (value.length < 2) {
            setNicknameError("닉네임은 2자 이상 입력해야 합니다.");
        }
        //닉네임이 현재 사용중인 경우 API 요청을 생략함 
        if(value === currentNickname) {
            setIsNicknameAvailable(true);
            setIsNicknameChecked(true);
            onNicknameCheck(true);
            return;
        }
        try{
            const jwtToken = localStorage.getItem("jwtToken"); // JWT 토큰 불러오기
    
            if (!jwtToken) {
                alert("로그인이 필요합니다.");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/api/users/nickname/check?nickname=${value}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            setIsNicknameChecked(true);
            onNicknameCheck(true);

            console.log("닉네임이 중복이면 true", response.data.result);

            if (response.data.result) {
                setIsNicknameAvailable(false); // 닉네임 중복됨
                setIsNicknameChecked(false);
                onNicknameCheck(false);
            } else {
                setIsNicknameAvailable(true); // 사용 가능한 닉네임
                setIsNicknameChecked(true);
                onNicknameCheck(true); // ✅ 닉네임 사용 가능할 때만 true
            }
        } catch (error) {
            console.error("닉네임 중복 확인 오류:", error);
            setIsNicknameAvailable(null);
            setIsNicknameChecked(false);
            onNicknameCheck(false);
        }
    };

    return (
        <FieldGroup>
                    <Subup>닉네임</Subup>
                    <NicknameWrapper  isAvailable={isNicknameAvailable}>
                    <InputPass placeholder="2자 이상 입력해주세요" 
                    type="text"
                    name="nickname" 
                    value={value}
                    onChange={handleInputChange}
                    
                    />
                    <NicknameCheck 
                    isAvailable={isNicknameAvailable} 
                    onClick={handleNicknameSubmit}
                    disabled = {isNicknameChecked || (value? value.length<2 : true)}
                    >
                    중복확인
                    </NicknameCheck>
                    </NicknameWrapper>
                    
                    {nicknameError ? (
                    <Subdown >
                        닉네임은 2글자 이상이어야 합니다.</Subdown>
                    ) : isNicknameAvailable === null ? (
                        <Subdown>닉네임은 중복일 수 없습니다.</Subdown>
                    ): isNicknameAvailable ? (
                        <Subdown style={{ color: "#08D485" }}>사용 가능한 닉네임입니다.</Subdown>
                    ):value === currentNickname ? (
                        <Subdown style={{ color: "#08D485" }}>현재 사용 중인 닉네임입니다.</Subdown>
                    ) : (
                        <Subdown>중복된 닉네임 입니다.</Subdown>
                    )}
                </FieldGroup>
    )
    
}

export default NicknameField;