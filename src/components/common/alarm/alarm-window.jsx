import React, { useState, useEffect } from "react";
import Alarm from './alarm';
import Badge from './badge';

import {
    Container,
    AlarmWrap1,
    Title,
    AlarmWrap2
} from '../../../styled-components/alarm/styled-Alarm';

const TEMP_ALARMS = [
    { club: "UMC", timer: "방금전", isRead: true },
    { club: "OZ", timer: "10분전", isRead: true },
    { club: "UMC", timer: "20분전", isRead: true },
    { club: "OZ", timer: "30분전", isRead: true },
    { club: "UMC", timer: "40분전", isRead: true },
];

function AlarmWindow() {
    const [alarms, setAlarms] = useState([]);
    useEffect(() => {
        async function fetchAlarms() {
          try {
            // const response = await fetch('/api/');
            // const data = await response.json();
            // setAlarms(data.slice(0, 5));
            const fetchedAlarms = TEMP_ALARMS.map(alarm => ({
                ...alarm,
                isRead: false
            }));
            setAlarms(fetchedAlarms);
          } catch (error) {
            console.error('Failed to fetch alarms:', error);
          }
        }
    
        fetchAlarms();
    }, []);

    const handleIsRead = (index) => {
        setAlarms(prevAlarms => {
            const updatedAlarms = [...prevAlarms];
            updatedAlarms[index].isRead = true;
            return updatedAlarms;
        });
    };
    
    const unreadCount = alarms.filter((alarm) => !alarm.isRead).length;

    return (
        <>
            <Badge isStatus={unreadCount > 0} badgeCount={unreadCount} />            
            <Container>
                <AlarmWrap1>
                    <Title>알림</Title>
                    <AlarmWrap2>
                        {alarms.map((alarm, index) => (
                            <Alarm
                                key={index}
                                club={alarm.club}
                                timer={alarm.timer}
                                isRead={alarm.isRead}
                                onRead={() => handleIsRead(index)}
                            />
                        ))}
                    </AlarmWrap2>
                </AlarmWrap1>
            </Container>
        </>
    )
}

export default AlarmWindow;