import styled from "styled-components";
import React, { useState , useEffect} from "react";

const ToggleButton = ({ initialState }) =>{
    const [isOn, setIsOn] = useState(initialState); // 초기값을 `initialOn`으로 설정

    useEffect(() => {
        setIsOn(initialState); // props 값이 바뀌면 동기화
    }, [initialState]);

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