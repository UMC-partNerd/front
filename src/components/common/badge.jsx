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
                    <circle>
                            {badgeCount > 0 && <CountBadge>{badgeCount}</CountBadge>}
                    </circle>
                </StyledCircle>
            </BadgeContainer> 
        </>
    )
}

export default Badge;