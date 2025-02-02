import RegisterHeader from "../components/register/registerheader";
import RegisterEmail from "../components/register/email";
import styled from "styled-components";
import {MainWrapp} from "../styles/registerstyles" 
import Agreement from "../components/register/agreementForm";

const SignUpPage = () =>{
    return(
        <main className="loginPage">
            <MainWrapp>
                <RegisterHeader />
                <p style={{marginBottom:'20px'}} />
                <RegisterEmail />
                <Agreement />
            </MainWrapp>
        </main>
    )
}


export default SignUpPage;