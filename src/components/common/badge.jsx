import React from 'react';
// import { useRecoilValue } from 'recoil';
// import { alarmCountState } from '../../hooks/atom';

import {
    BadgeContainer,
    StyledCircle,
    CountBadge,
} from '../../styled-components/styled-Badge';

function Badge({ badgeCount }) {
    return (
        <>
            <BadgeContainer>
                <StyledCircle>
                    <circle/>
                </StyledCircle>
                {/* {badgeCount > 0 && <CountBadge>{badgeCount}5</CountBadge>} */}
                <CountBadge>{badgeCount}5</CountBadge>
            </BadgeContainer> 
        </>
    )
}

export default Badge;