import React, { useState, useEffect } from "react";
import RoomDoor from "./chat-roomDoor";
import {
    ChatListWrap,
    Header,
    Personal,
    Collab,
    DoorList
} from "../../styled-components/chat/chat-list";
  
const INITIAL_DOORS = [];

const TEMP_USERS = [
    {
        profile: "/user1.png", 
        who: "하디디", 
        lastChat: "안녕하세요", 
        time: "15:20",
    },
    {
        profile: "/user2.png", 
        who: "이우", 
        lastChat: "반가워요!", 
        time: "14:48",
    },{
        profile: "/user3.png", 
        who: "엠마", 
        lastChat: "만나서 반갑습니다.", 
        time: "11:04",
    }
];

const TEMP_COLLABS = [
    {
        collabName: "2025 IT 컨퍼런스", 
        profile: "/umc.png", 
        who: "UMC", 
        lastChat: "네 반가워요", 
        time: "15:40",
    },
    {
        collabName: "무박 2일 해커톤", 
        profile: "/umc.png", 
        who: "UMC", 
        lastChat: "안녕하세요! 무박 2일에 대해", 
        time: "13:18",
    },
];
  

function ChatList({ isOpen }) {

    const [doors, setDoors] = useState(INITIAL_DOORS);

    useEffect(() => {
        async function fetchChatList() {
            try {
            // const response = await fetch('/api/collaborations/top');
            // const data = await response.json();
            // setDoors(data.slice(0, 4));
            } catch (error) {
            console.error('Failed to fetch ChatList:', error);
            }
        }

        fetchChatList();
    }, []);

    const displayUsers = doors.length > 0 ? doors : TEMP_USERS;
    const displayCollabs = doors.length > 0 ? doors : TEMP_COLLABS;

    return(
        <>
            <ChatListWrap>
            <Header>
                <Personal isOpen={isOpen}>개인 채팅</Personal>
                <Collab isOpen={isOpen}>콜라보레이션 채팅</Collab>
            </Header>
            <DoorList isOpen={isOpen}>
                {displayUsers.slice(0, 3).map((door, index) => (
                <RoomDoor
                    key={index}
                    profile={door.profile}
                    who={door.who}
                    lastChat={door.lastChat}
                    time={door.time}
                    type={TYPES.PERSONAL}
                />
                ))}
            </DoorList>
            <DoorList isOpen={isOpen}>
                {displayCollabs.slice(0, 2).map((door, index) => (
                <RoomDoor
                    key={index}
                    collabName={door.collabName}
                    profile={door.profile}
                    who={door.who}
                    lastChat={door.lastChat}
                    time={door.time}
                    type={TYPES.COLLAB}
                />
                ))}
            </DoorList>
            </ChatListWrap>
        </>
    )
}

export default ChatList;