import styled from "styled-components";
import React, { useState } from "react";

const ToggleButton = () =>{
    const [isOn, setIsOn] = useState(false); // 초기 상태는 Off

    const handleToggle = () => {
        setIsOn((prev) => !prev); // 상태를 반전
    };

    return (
        <ToggleWrapper onClick={handleToggle} isOn={isOn}>
            <ToggleCircle isOn={isOn} />
        </ToggleWrapper>
        );
}

    const ToggleWrapper = styled.div`
    width: 40px;
    height: 14px;
    border-radius: 15px;
    background-color: ${(props) => (props.isOn ? "#373CD3" : "#ccc")};
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    `;

    const ToggleCircle = styled.div`
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
    transform: ${(props) => (props.isOn ? "translateX(25px)" : "translateX(0)")};
    transition: transform 0.3s;
    `;

export default ToggleButton;