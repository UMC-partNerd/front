import React, { useState } from 'react';
import {
    AlarmContainer,
    Row,
    Indicator,
    AlarmMessage,
    Timer,
    From,
    StyledPath,
} from '../../styled-components/alarm/styled-Alarm';

function Alarm({ club, timer, isRead, onRead }) {
    const Ellipse427 = "Ellipse 427.png";
    const chevronRight = "chevron-right.png";
    
    return (
        <AlarmContainer>
            <Row>
                {/* {isRead ? null 
                        : (<Indicator>
                            <img src={`/${Ellipse427}`} alt="안 읽은 알림" />
                          </Indicator>
                )} */}
                <Indicator isRead={isRead} />

                <AlarmMessage msg="club">{club}로부터 콜라보 신청이 왔습니다.</AlarmMessage>
            </Row>
            <Row>
                <From onClick={onRead}>
                    확인하러 가기
                    <img src={`/${chevronRight}`} alt="확인하러 가기" />
                </From>
                <Timer>{timer}</Timer>
            </Row>
            <StyledPath><path d="M0 1L452 1.00004" /></StyledPath>
        </AlarmContainer>
    )
}

export default Alarm;