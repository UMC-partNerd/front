import styled from "styled-components"
import { MainWrapp, Title, SubTitle, SubupSec } from "../../styles/mypagestyles"
import ButtonWhite from "./button_white"
import { Subup, Input, Subdown, FieldGroup , InputPass} from "../../styles/registerstyles"
import React, {useState, useEffect} from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ButtonBlue from "./button_blue";
import ToggleButton from "./button_toggle";
import axios from "axios";
import NicknameField from "../register/NicknameCheck";
import useMypageImg from "../../hooks/useMypagesProfileImg";

const MyProfile = () => {
    // 비밀번호 상태
        const [passwordType, setPasswordType] = useState('password');
        const [passwordIcon, setPasswordIcon] = useState(<FaRegEyeSlash size={15} />);
    
        // 비밀번호 확인 상태
        const [confirmPasswordType, setConfirmPasswordType] = useState('password');
        const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(<FaRegEyeSlash size={15} />);

        //프로필 데이터 상태
        const [profile, setProfile] = useState(null);
    
        const handleTogglePassword = () => {
            if (passwordType === 'password') {
                setPasswordType('text');
                setPasswordIcon(<FaRegEye size={15} />);
            } else {
                setPasswordType('password');
                setPasswordIcon(<FaRegEyeSlash size={15} />);
            }
        };
    
        const handleToggleConfirmPassword = () => {
            if (confirmPasswordType === 'password') {
                setConfirmPasswordType('text');
                setConfirmPasswordIcon(<FaRegEye size={15} />);
            } else {
                setConfirmPasswordType('password');
                setConfirmPasswordIcon(<FaRegEyeSlash size={15} />);
            }
        };

        //필드 변경 
        const handleChange = (e) =>{
            const { name, value } = e.target;
            const updatedData = { ...profile, [name]: value };
            setProfile(updatedData);
            if (name === "nickname") {
                setIsNicknameAvailable(null); // 닉네임 변경 시 상태 초기화
                setIsNicknameChecked(false);
                onNicknameCheck(false);
            }
        }

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        //내 프로필 조회 api 
        const getMyProfile = async () =>{
            try {
                const jwtToken = localStorage.getItem("jwtToken"); 

                if (!jwtToken) {
                    alert("로그인이 필요합니다.");
                    return;
                }
                const response = await axios.get(`${API_BASE_URL}/api/users/me/info`,
                    {
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwtToken}`,
                        }
                    });

                console.log("프로필 데이터", response.data.result);
                setProfile(response.data.result); //상태 업데이트 
            }
            catch (error) {
                console.error("프로필 불러오기 실패:", error);
            }
        }

        //usestate로 초기에 getMyProfile 실행
        useEffect(() =>{
            getMyProfile();
        }, []);

        //프로필 이미지 가져오기
        const {profileImageUrl, isLoading, error} = useMypageImg(profile?.profileKeyName)

    return (
        <MainWrapp>
            <Title>내 프로필</Title>
            <SubTitle>프로필 정보를 관리할 수 있습니다</SubTitle>

            <Title style={{ marginTop: '50px' }}>기본 정보</Title>
            <SubTitle>프로필 사진</SubTitle>

            <ProfileWrapp>
            {isLoading ? (
                    <p>로딩 중...</p>
                ) : error ? (
                    <p>이미지를 불러올 수 없습니다.</p>
                ) : (
                    <ImageComp
                        src={profileImageUrl}
                        alt="프로필 이미지"
                        onError={(e) => { e.target.src = "/banner1.png"; }} // 기본 이미지 처리
                    />
                )}
                <ButtonWhite>사진 등록하기</ButtonWhite>
            </ProfileWrapp>

            <FieldGroup>
                <Subup>이름</Subup>
                <Input placeholder="이름(실명)을 입력해주세요"
                name="name"
                value={profile?.name|| ""}
                onChange={handleChange}
                ></Input>
            </FieldGroup>

            <NicknameField />

            <FieldGroup>
            <Subup>생년월일</Subup>
            <Input placeholder="생년월일을 입력해주세요"
            type="text"
            name="birthDate"
            onChange={handleChange}
            value={profile?.birth?.slice(0, 10) || ""}
            ></Input>
            </FieldGroup>

            {/* 약간 공백  */}
            <FieldGroup style={{marginTop:'50px'}}>
                <Subup>이메일</Subup>
                <Input placeholder="이메일을 입력해주세요"
                value={profile?.email || ""}
                type="text"
                name="email"
                onChange={handleChange} />
            </FieldGroup>

            <FieldGroup>
                <Subup>비밀번호 변경</Subup>
                <PasswordWrapper>
                    <InputPass
                        placeholder="영문, 숫자, 특수문자를 8자 이상 조합하여 입력해주세요"
                        type={passwordType}
                        onChange={handleChange}
                        value={profile?.email || ""}
                    />
                    <IconButton onClick={handleTogglePassword}>
                        {passwordIcon}
                    </IconButton>
                </PasswordWrapper>
            </FieldGroup>

            <FieldGroup>
                <Subup>비밀번호 확인</Subup>
                <PasswordWrapper>
                    <InputPass
                        placeholder="영문, 숫자, 특수문자를 8자 이상 조합하여 입력해주세요"
                        type={confirmPasswordType}
                    />
                    <IconButton onClick={handleToggleConfirmPassword}>
                        {confirmPasswordIcon}
                    </IconButton>
                </PasswordWrapper>
            </FieldGroup>


            <FieldGroup style={{marginTop:'50px'}}>
                <Subup>소속</Subup>
                <SubupSec>대표 1가지만 등록할 수 있습니다.</SubupSec>
                <Input placeholder="소속 동아리를 입력헤주세요" 
                value={profile?.belong_to_club || ""}
                type="email" />
            </FieldGroup>

            <FieldGroup>
                <Subup>관심 직군</Subup>
                <SubupSec>대표 1가지만 등록할 수 있습니다.</SubupSec>
                <Input placeholder="예) PM, Android 개발자 등" 
                value={profile?.occupation_of_interest || ""}
                type="email" />
            </FieldGroup>

            <FieldGroup style={{marginTop:'50px'}}>
            <Subup>마케팅 수신 동의</Subup>
            <MarketingField>
                <SubTitle style={{fontSize:'12px'}}>
                파트너드의 신규 서비스 오픈, 변경사항 등 서비스 소식과 정보를 받아볼래요
                </SubTitle>
                <ToggleButton  initialState={profile?.marketing_notify}/>
            </MarketingField>
            <p></p>
            </FieldGroup>

            <SaveWrapp>
            <ButtonBlue style={{width : '120px', marginBottom: '30px'}}>저장하기</ButtonBlue>
            <SubupSec style={{textDecoration: 'underline', cursor:'pointer', marginBottom: '30px'}}>파트너드 탈퇴하기</SubupSec>
            </SaveWrapp>
            
            
        </MainWrapp>
    )
}

const MarketingField = styled.div`
display:flex;
flex-direction:row;
width:100%;
justify-content: space-between;
 align-items: flex-end;
`

const SaveWrapp = styled.div`
width:100%;
display:flex;
align-items: center;
justify-content:center;
flex-direction:column;
`


const PasswordWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
    
    width: 100%;
    padding: 0 19px 0 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    color: #333;
    outline: none;
    transition: all 0.3s ease;

    &::placeholder {
        font-size: 11px; 
        color: #C2C2C2;

    }

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    }


    input:-webkit-autofill {
    background-color: white !important; /* 배경색을 원하는 색으로 설정 */
    color: inherit !important; /* 글자색 유지 */
    box-shadow: 0 0 0px 1000px white inset !important; /* 배경색 덮어쓰기 */
    
    transition: background-color 5000s ease-in-out 0s; /* 배경색 애니메이션 제거 */
}

`;

// const StyledInput = styled(Input)`
//     padding-right: 40px; /* 아이콘과 겹치지 않도록 여백 추가 */
// `;


const IconButton = styled.span`
    cursor:pointer;
`;

const ProfileWrapp = styled.div`
display:flex;
flex-direction:row;

margin-top:20px;
align-items:center;
gap: 50px;
height:100%;
margin-bottom:40px;
`

const ImageComp = styled.img`
border-radius: 50%;
width: 80px;
  height: 80px;
  object-fit: cover; /* 이미지를 잘 맞추기 위해 */
`

export default MyProfile;