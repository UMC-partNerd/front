import styled from "styled-components";
import React, { useState , useEffect} from "react";

const ToggleButton = ({ initialState, onToggle }) =>{
    const [isOn, setIsOn] = useState(initialState); // 초기값을 `initialOn`으로 설정

    useEffect(() => {
        setIsOn(initialState); // props 값이 바뀌면 동기화
    }, [initialState]);

    const handleToggle = () => {
        const newState = !isOn;  // 상태 반전
        setIsOn(newState);
        onToggle(newState); // ✅ 부모 컴포넌트에 변경된 값 전달
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
    justify-content: ${(props) => (props.isOn ? "flex-end" : "flex-start")}; // ✅ 정렬 보장
    `;

    const ToggleCircle = styled.div`
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out;
    margin-left: ${(props) => (props.isOn ? "20px" : "0px")}; // ✅ transform 대신 margin 사용
    `;

export default ToggleButton;