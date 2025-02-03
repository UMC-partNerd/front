import styled from "styled-components";

export const MainWrapp = styled.main`
justify-content:center;
align-items: center;
display:flex;
flex-direction:column;
width: 60vw;
max-width:2700px;
height: auto;
background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 16px;
margin-top:50px;
margin-bottom:50px;
padding-top:20px;
padding-bottom:50px;
`

export const Form = styled.form`
display:flex;
justify-content: center;
flex-direction: column;
align-items: center;
width:70%;
margin-top:20px;
`
export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
`;

export const Subup = styled.label`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
    font-family: 'Pretendard';
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
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
`;

export const InputPass = styled.input`
    width: 100%;
    padding: 12px;
    border: hidden;
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    background-color:transparent;
    transition: all 0.3s ease;
    text-indent:2px;
    color: ${({ isAvailable }) => (isAvailable ? "#08D485" : "#000")}; 
`;

export const Subdown = styled.p`
    font-size: 12px;
    font-family: 'Pretendard';
    font-size: 12px;
    color: #0D29B7;
    margin-top: 4px;
`;



export const NicknameWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
    
    width: 100%;
    padding: 0 19px 0 5px;
    border: 1px solid ${({ isAvailable }) => (isAvailable ? "#08D485" : "#ddd")}; 
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


export const NicknameCheck = styled.div`
font-size: 9px;
    color: ${({ isAvailable }) => (isAvailable ? "#B0B0B0" : "#007bff")}; 
    width: 50px;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
`