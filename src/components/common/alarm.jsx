import React from 'react';
import { useRecoilValue } from 'recoil';
import { alarmCountState } from '../../hooks/atom';

import {
    BadgeContainer,
    CountBadge,

    AlarmWrap,
    AlarmContainer,
    Indicator,
    AlarmMessage,
    Timer,
    From,
} from '../styled-components/styled-Alarm';

function Alarm() {
    return (
        <>
            <BadgeContainer>
                <CountBadge>
                    {alarmCount > 0 && <CountBadge>{alarmCount}</CountBadge>}
                </CountBadge>
            </BadgeContainer>  

            <AlarmWrap>
                알림

                <AlarmContainer>
                    <Indicator></Indicator>
                    <AlarmMessage>{club}로부터 콜라보 신청이 왔습니다.</AlarmMessage>
                    <Timer>{timer}</Timer>
                    <From>확인하러 가기 &gt;</From>
                </AlarmContainer>
            </AlarmWrap>
        </>
    )
}

export default Alarm;