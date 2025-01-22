import React from 'react';
import useCustomNavigate from "../hooks/useCustomNavigate";

const CollaborationPage = () => {

    const { goToRequest } = useCustomNavigate();

    return(
        <>
            <h3>콜라보레이션</h3>

            <button onClick={goToRequest}>
                협업 요청 확인하기
            </button>
        </>
    )
}

export default CollaborationPage