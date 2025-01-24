import styled from "styled-components"
import { MainWrapp, Title, SubTitle, SubupSec } from "../../styles/mypagestyles"
import ButtonWhite from "./button_white"
import { Subup, Input, Subdown, FieldGroup , InputPass} from "../../styles/registerstyles"
import React, {useState} from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ButtonBlue from "./button_blue";
import ToggleButton from "./button_toggle";


const MyProfile = () => {
    // 비밀번호 상태
        const [passwordType, setPasswordType] = useState('password');
        const [passwordIcon, setPasswordIcon] = useState(<FaRegEyeSlash size={15} />);
    
        // 비밀번호 확인 상태
        const [confirmPasswordType, setConfirmPasswordType] = useState('password');
        const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(<FaRegEyeSlash size={15} />);
    
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


    return (
        <MainWrapp>
            <Title>내 프로필</Title>
            <SubTitle>프로필 정보를 관리할 수 있습니다</SubTitle>

            <Title style={{ marginTop: '50px' }}>기본 정보</Title>
            <SubTitle>프로필 사진</SubTitle>

            <ProfileWrapp>
                <ImageComp />
                <ButtonWhite>사진 등록하기</ButtonWhite>
            </ProfileWrapp>

            <FieldGroup>
                <Subup>이름</Subup>
                <Input placeholder="이름(실명)을 입력해주세요"></Input>
            </FieldGroup>

            <FieldGroup>
            <Subup>닉네임</Subup>
            <Input placeholder="닉네임을 입력해주세요"></Input>
            <Subdown>닉네임은 중복될 수 없습니다</Subdown>
            </FieldGroup>

            <FieldGroup>
            <Subup>생년월일</Subup>
            <Input placeholder="생년월일을 입력해주세요"></Input>
            </FieldGroup>

            {/* 약간 공백  */}
            <FieldGroup style={{marginTop:'50px'}}>
                <Subup>이메일</Subup>
                <Input placeholder="이메일을 입력해주세요" type="email" />
            </FieldGroup>

            <FieldGroup>
                <Subup>비밀번호 변경</Subup>
                <PasswordWrapper>
                    <InputPass
                        placeholder="영문, 숫자, 특수문자를 8자 이상 조합하여 입력해주세요"
                        type={passwordType}
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
                <Input placeholder="소속 동아리를 입력헤주세요" type="email" />
            </FieldGroup>

            <FieldGroup>
                <Subup>관심 직군</Subup>
                <SubupSec>대표 1가지만 등록할 수 있습니다.</SubupSec>
                <Input placeholder="예) PM, Android 개발자 등" type="email" />
            </FieldGroup>

            <FieldGroup style={{marginTop:'50px'}}>
            <Subup>마케팅 수신 동의</Subup>
            <MarketingField>
                <SubTitle style={{fontSize:'12px'}}>
                파트너드의 신규 서비스 오픈, 변경사항 등 서비스 소식과 정보를 받아볼래요
                </SubTitle>
                <ToggleButton />
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

const ImageComp = styled.div`
border-radius: 50%;
background:gray;
min-width: 100px; /* 최소 너비를 고정 */
  max-width: 100px; /* 최대 너비를 고정 */
  min-height: 100px; /* 최소 높이를 고정 */
  max-height: 100px; /* 최대 높이를 고정 */
`

export default MyProfile;