import React from 'react';
import { useRecoilValue } from 'recoil';
import { alarmCountState } from '../../hooks/atom';

import {
    Container,
    AlarmWrap1,
    Title,
    AlarmWrap2,
    AlarmContainer,
    Row,
    Indicator,
    AlarmMessage,
    Timer,
    From,
    StyledPath,
} from '../../styled-components/styled-Alarm';

function Alarm({ club, timer }) {

    const Ellipse427 = "Ellipse 427.png";
    const chevronRight = "chevron-right.png";

    return (
        <Container>
            <AlarmWrap1>
                <Title>알림</Title>
                <AlarmWrap2>

                    <AlarmContainer>
                        <Row>
                            <Indicator>
                                <img src={`/${Ellipse427}`} alt="안 읽은 알림" />
                            </Indicator>

                            <AlarmMessage msg="club">{club}</AlarmMessage>
                            <AlarmMessage>로부터 콜라보 신청이 왔습니다.</AlarmMessage>
                        </Row>
                        <Row>
                            <From>확인하러 가기<img src={`/${chevronRight}`} alt="확인하러 가기" /></From>
                            <Timer>{timer}방금전</Timer>
                        </Row>
                        <StyledPath><path d="M0 1L452 1.00004" /></StyledPath>
                    </AlarmContainer>

                </AlarmWrap2>
            </AlarmWrap1>
        </Container>
    )
}

export default Alarm;