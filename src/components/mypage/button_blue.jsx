import styled from "styled-components";

const ButtonBlue = ({ children, onClick, style }) => {
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

color: #FFFFFF;
border-radius: 4px;
background:#0D29B7;
font-size:13px;

height:20px;


cursor:pointer;
`

export default ButtonBlue;