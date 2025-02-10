import styled from "styled-components"
import { MainWrapp, Title, PersonalField, StyledHr,SubTitle, SubupSec } from "../../styles/mypagestyles";
import { Subup } from "../../styles/registerstyles";
import PersonalContact from "../common/contact";

import Button, { TYPES } from "../common/button";

const MyPersonalComp = () =>{

    const onClickHandler = () => {
    //   navigate('/collaboration/collab-registration');
    };
    return(
        <MainWrapp>
        <Title>펄스널 페이지</Title>

        <PersonalContact />

        <Button
            type={TYPES.NO}
            text='작성하기'
            onClick={onClickHandler}
        />
        {/* <ButtonWrapp>
            
            <ButtonWhite style={{width:'50px', height:'10px'}}>작성하기</ButtonWhite>
        </ButtonWrapp> */}
        

        <PersonalField>
            <Subup>등록한 프로젝트</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 프로젝트가 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>경력</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 경력이 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>학력</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 학력이 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>활동 프로젝트</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 활동 프로젝트가 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>스킬</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 스킬이 없습니다</SubupSec>
        </PersonalField>

        <PersonalField>
            <Subup>링크</Subup>
            <StyledHr />
            <SubupSec style={{marginTop:'50px', justifyContent:'center', display:'flex'}}>등록한 링크가 없습니다</SubupSec>
        </PersonalField>
        </MainWrapp>
    )
}

const ButtonWrapp = styled.div`
display:flex;
justify-content:flex-end;
width:100%;
`

export default MyPersonalComp;