import React from 'react';

import {
    BadgeContainer,
    StyledCircle,
    Circle,
    CountBadge,
} from '../../../styled-components/alarm/styled-Badge';

function Badge({ isStatus, badgeCount }) {
    return (
        <>
            <BadgeContainer isStatus={isStatus}>                
                <StyledCircle>
                    <Circle/>
                </StyledCircle>
                <CountBadge>{badgeCount}5</CountBadge>
            </BadgeContainer> 
        </>
    )
}

export default Badge;