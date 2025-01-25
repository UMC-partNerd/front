import Agreement from "../components/register/AgreementForm";
import RegisterHeader from "../components/register/registerheader";
import {MainWrapp} from "../styles/registerstyles" 

const SignUpSocialPage = () =>{
    return(
        <main className="loginPage">
            <MainWrapp>
                <RegisterHeader />
                <Agreement/>
            </MainWrapp>
        </main>
    )
}

export default SignUpSocialPage;