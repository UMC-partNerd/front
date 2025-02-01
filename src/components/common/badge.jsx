import React from 'react';
// import { useRecoilValue } from 'recoil';
// import { alarmCountState } from '../../hooks/atom';

import {
    BadgeContainer,
    StyledCircle,
    Circle,
    CountBadge,
} from '../../styled-components/styled-Badge';

function Badge({ badgeCount }) {
    return (
        <>
            <BadgeContainer>                
                <StyledCircle>
                    <Circle/>
                </StyledCircle>
                <CountBadge>{badgeCount}5</CountBadge>
            </BadgeContainer> 
        </>
    )
}

export default Badge;