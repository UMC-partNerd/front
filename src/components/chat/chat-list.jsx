import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
    Sidebar,
    TabMenu,
    Tab,
    ChatList
} from "../../styled-components/styled-chat/chat-list";
import ChatItem from "./chat-Item"  

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
  

const ChatListComponent = () => {
    const { chatRoomId: urlChatRoomId } = useParams();
    const [chatList, setChatList] = useState([]);
    const [collabChatList, setCollabChatList] = useState([]);
    const [selectedTab, setSelectedTab] = useState("private"); // "private" 또는 "collab"
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(urlChatRoomId);
    const [stompClient, setStompClient] = useState(null);
    // 🔹 이전 채팅방 ID를 저장하는 상태 추가
    const [previousChatRoomId, setPreviousChatRoomId] = useState(null);
    const [avatarUrls, setAvatarUrls] = useState({});
    const [isSubscribed, setIsSubscribed] = useState(false);
    const token = localStorage.getItem("jwtToken");

    const navigate = useNavigate();

    const connectWebSocket = async (SelectedchatRoomId) => {
        console.log(
        `🔄 채팅방 변경 감지: ${SelectedchatRoomId} -> WebSocket 재연결`
        );

        if (stompClient) {
        console.log(`🔴 기존 WebSocket 구독 해제: sub-${previousChatRoomId}`);

        await new Promise((resolve) => {
            stompClient.deactivate();
            setTimeout(() => {
            console.log("✅ 기존 WebSocket 종료 완료");
            resolve();
            }, 1000); // ✅ WebSocket이 완전히 종료될 때까지 기다림
        });
        }
        initializeWebSocket(SelectedchatRoomId);
    };

    // 🔹 새로운 WebSocket을 설정하는 함수
    const initializeWebSocket = (chatRoomId) => {
        console.log(`🔄 새로운 WebSocket 연결 시작: ${chatRoomId}`);
        const sessionId = encodeURIComponent(localStorage.getItem("sessionId"));

        const socket = new SockJS(
        `https://api.partnerd.site/chat?sessionId=${sessionId}`
        );

        const client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: { Authorization: `Bearer ${token}` },
        debug: (msg) => console.log("🐞 STOMP DEBUG:", msg),
        reconnectDelay: 1000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
            console.log("✅ WebSocket 연결 성공");
            setTimeout(() => {
            if (client.connected) {
                console.log(
                `📡 WebSocket 연결 확인됨, 채팅방 ${chatRoomId} 구독 시작`
                );
                subscribeToChat(chatRoomId, client);
            } else {
                console.warn("⚠️ WebSocket 연결이 아직 완료되지 않음!");
            }
            }, 500);
        },
        onDisconnect: () => {
            console.log("❌ WebSocket 연결 종료");
            setTimeout(() => initializeWebSocket(chatRoomId), 3000);
        },
        });

        client.activate();
        setStompClient(client);
    };

    // 🔹 기존 채팅방을 해제한 후 새로운 채팅방을 구독하는 함수
    const subscribeToChat = (chatRoomId, client) => {
        if (!client || !client.connected) {
        console.error(
            `❌ STOMP 클라이언트가 아직 연결되지 않음! [채팅방 ${chatRoomId}]`
        );
        return;
        }
        console.log(`🔍 채팅방 ${chatRoomId} 구독 요청 중...`);

        // ✅ 기존 채팅방 구독 해제
        if (previousChatRoomId) {
        console.log(`🚫 이전 채팅방 ${previousChatRoomId} 구독 해제 중...`);
        client.unsubscribe(`sub-${previousChatRoomId}`);
        console.log(`✅ 이전 채팅방 ${previousChatRoomId} 구독 해제 완료`);
        }

        setTimeout(() => {
        client.subscribe(
            `/subscribe/chat/${chatRoomId}`,
            (message) => {
                // 
            const receivedMessage = JSON.parse(message.body);
            console.log("📩 실시간 메시지 수신:", receivedMessage);

            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, receivedMessage];

                // ✅ 날짜별 그룹화하여 UI 업데이트
                setGroupedMessages((prev) => ({
                ...prev,
                [chatRoomId]: groupMessagesByDate(updatedMessages),
                }));

                return updatedMessages;
            });
            },
            { id: `sub-${chatRoomId}` }
        );
    // 
        console.log(`✅ 채팅방 ${chatRoomId} 구독 완료`);
        setIsSubscribed(true);
        //   
        }, 300);
    };

    const handleChatClick = async (newChatRoomId, newChat) => {
        console.log(`🔄 새로운 채팅방 선택: ${newChatRoomId}`);

        // ✅ 이미 같은 채팅방이면 다시 연결할 필요 없음
        if (selectedChatRoomId === newChatRoomId) {
        console.log(
            "⚠️ 이미 같은 채팅방에 연결되어 있음. WebSocket 재연결 불필요."
        );
        return;
        }

        // ✅ 이전 채팅방 ID 저장
        setPreviousChatRoomId(selectedChatRoomId);
        setSelectedChatRoomId(newChatRoomId);
        setSelectedChat(newChat);   //
        navigate(`/chat/${newChatRoomId}`);
    };

    // ✅ WebSocket 연결 감지 및 초기화 (중복 연결 방지)
    useEffect(() => {
        if (!selectedChatRoomId) return;

        console.log(`🔄 WebSocket 감지: 채팅방 ${selectedChatRoomId}`);

        const establishConnection = async () => {
        // ✅ 기존 WebSocket이 활성화된 경우 종료 후 재연결
        if (stompClient && stompClient.connected) {
            console.log(
            `🔴 기존 WebSocket 종료 요청: 채팅방 ${previousChatRoomId}`
            );

            await new Promise((resolve) => {
            stompClient.deactivate();
            stompClient.onDisconnect = () => {
                console.log("✅ 기존 WebSocket 완전히 종료됨");
                resolve();
            };
            });
        }

        // ✅ 새로운 WebSocket 연결 시작
        initializeWebSocket(selectedChatRoomId);
        };

        // ✅ 500ms 딜레이 후 WebSocket 연결 (중복 방지)
        const timeoutId = setTimeout(() => {
        establishConnection();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [selectedChatRoomId]);

    // ✅ 채팅방 목록 불러오기 (개인 채팅 & 콜라보 채팅)
    useEffect(() => {
        fetchChats(selectedTab);
    }, [selectedTab]);

    // ✅ 채팅방 목록 불러오기
    const fetchChats = async (tab) => {
        try {
        const url =
            tab === "private"
            ? "https://api.partnerd.site/api/chatRooms/private"
            : "https://api.partnerd.site/api/chatRooms/collab";

        const response = await axios.get(url, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        });

        console.log(`${tab} 채팅방 목록:`, response.data.result);

        if (tab === "private") {
            setChatList(response.data.result.privateChatRooms || []);
        } else {
            setCollabChatList(response.data.result.collabChatRooms || []);
        }
        } catch (error) {
        console.error(`${tab} 채팅방 불러오기 실패`, error);
        }
    };

    // ✅ 채팅 리스트 업데이트 시 아바타 이미지 URL 요청
    useEffect(() => {
        const fetchAvatars = async () => {
        console.log(`🔄 Avatar 업데이트 실행 - 현재 탭: ${selectedTab}`);

        const updatedUrls = {};
        const chatListToUse =
            selectedTab === "private" ? chatList : collabChatList;

        if (!chatListToUse || chatListToUse.length === 0) {
            console.log("⚠️ 채팅 목록이 비어 있음, 아바타 업데이트 중단");
            return;
        }
        // 기존 avatarUrls를 초기화하고 새로운 요청 실행
        setAvatarUrls({});
        const promises = chatListToUse.map(async (chat) => {
            const imgKey =
            selectedTab === "private"
                ? chat.receiverProfileImgKeyname
                : chat.clubProfileImgKeyname;
            if (!imgKey) return;

            // 기존 URL이 존재하는 경우 요청하지 않음 (캐싱 적용)
            if (!avatarUrls[chat.chatRoomId]) {
            const url = await fetchPresignedUrl(imgKey);
            updatedUrls[chat.chatRoomId] = url;
            }
        });
        await Promise.all(promises); // 병렬 처리

        console.log("✅ Avatar URL 업데이트 완료:", updatedUrls);
        setAvatarUrls((prev) => ({ ...prev, ...updatedUrls }));
        };

        fetchAvatars();
    }, [selectedTab, chatList, collabChatList]); // ✅ 탭 변경 시마다 업데이트

    const displayUsers = doors.length > 0 ? doors : TEMP_USERS;
    const displayCollabs = doors.length > 0 ? doors : TEMP_COLLABS;

    return(
        <>
            <Sidebar>
                <TabMenu>
                    <Tab
                        active={selectedTab === "private"}
                        onClick={() => setSelectedTab("private")}
                    >
                        개인 채팅
                    </Tab>
                    <Tab
                        active={selectedTab === "collab"}
                        onClick={() => setSelectedTab("collab")}
                    >
                        콜라보 채팅
                    </Tab>
                </TabMenu>

                <ChatList>
                    {(selectedTab === "private" ? chatList : collabChatList).map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            selectedTab={selectedTab}
                            handleChatClick={handleChatClick}
                            avatarUrls={avatarUrls}
                            // onClick={() => handleChatClick(chat.chatRoomId, chat)}
                        />
                    ))}
                </ChatList>
            </Sidebar>
        </>
    )
}

export default ChatList;