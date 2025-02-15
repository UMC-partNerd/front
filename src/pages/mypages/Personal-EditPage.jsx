import styled from "styled-components";
import Sidebar from "../../components/mypage/sidebar";
import PersonalEditComp from "../../components/mypage/PersonalEditComp";

const MyPagePersonalEdit = () => {
    return(
        <Wrapp>
            <Sidebar />
            <PersonalEditComp />
        </Wrapp>
    )
}

const Wrapp = styled.main`
display:flex;
flex-direction:row;
`

export default MyPagePersonalEdit;