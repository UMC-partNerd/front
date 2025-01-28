import styled from "styled-components";

const ButtonWhite = ({ children, onClick, style }) => {
    return (
        <ButtonWrapp onClick={onClick} style={style}>
            {children}
        </ButtonWrapp>
        );
    };

const ButtonWrapp = styled.div`

display: flex;
align-items: center;
justify-content:center;
padding:10px 10px;

background: #FFFFFF;
border: 1px solid #0D29B7;
border-radius: 8px;
color:#0D29B7;
font-size:13px;

height:20px;


cursor:pointer;
`

export default ButtonWhite;