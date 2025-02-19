import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
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
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        async function fetchAlarms() {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) {
                    console.warn("⚠️ 로그인 토큰이 없습니다.");
                    return;
                }

                // const fetchedAlarms = TEMP_ALARMS.map(alarm => ({
                //     ...alarm,
                //     isRead: false
                // }));

                // setAlarms(prev => (JSON.stringify(prev) === JSON.stringify(fetchedAlarms) ? prev : fetchedAlarms));


                // ✅ 마지막 이벤트 ID 가져오기
                const lastEventId = localStorage.getItem("lastEventId") || "";

                // ✅ 서버에 알림 구독 요청
                const response = await axios.get("https://api.partnerd.site/api/notify/subscribe", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Last-Event-ID": lastEventId
                    }
                });

                if (response.data.isSuccess) {
                    console.log("📩 알림 데이터 수신:", response.data.result);

                    const fetchedAlarms = response.data.result.collabAskPreviewDTOLList.map(alarm => ({
                        club: alarm.clubName,
                        timer: "방금 전",  // API에 시간이 없으면 임의 설정
                        isRead: false
                    }));

                    // ✅ 기존 상태와 다를 때만 업데이트하여 불필요한 렌더링 방지
                    setAlarms(prev => 
                        JSON.stringify(prev) === JSON.stringify(fetchedAlarms) ? prev : fetchedAlarms
                    );

                    // ✅ 마지막 이벤트 ID 저장
                    localStorage.setItem("lastEventId", response.data.result.lastEventId || "");

                } else {
                    console.error("알림 데이터 요청 실패:", response.data.message);
                }
            } catch (error) {
                console.error("서버 요청 오류:", error);
                setErrorMessage("알림 데이터를 불러올 수 없습니다.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchAlarms();
    }, []); // 한 번만 실행되도록 의존성 배열 설정

    const handleIsRead = (index) => {
        setAlarms(prevAlarms => {
            // const updatedAlarms = [...prevAlarms];
            // updatedAlarms[index].isRead = true;

            // ✅ 이미 읽음 상태이면 변경하지 않음 (렌더링 최적화)
            if (prevAlarms[index].isRead) return prevAlarms;
            
            const updatedAlarms = prevAlarms.map((alarm, i) =>
                i === index ? { ...alarm, isRead: true } : alarm
            );

            return updatedAlarms;
        });
    };
    
    // const unreadCount = alarms.filter((alarm) => !alarm.isRead).length;
    // ✅ 읽지 않은 알림 개수를 useMemo로 최적화
    const unreadCount = useMemo(() => alarms.filter((alarm) => !alarm.isRead).length, [alarms]);
    
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