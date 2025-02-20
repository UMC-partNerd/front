import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useContectChat = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    const startChat = async (nickname) => {
        setLoading(true);
        setError(null); // 이전 에러 초기화
        const jwtToken = localStorage.getItem("jwtToken"); 

        try {

            if (!jwtToken) {
                alert("로그인이 필요합니다.");
                setLoading(false);
                return;
            }
            const response = await axios.post(`${API_BASE_URL}/api/chatRooms/private/${nickname}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            const chatRoom = response.data;
            console.log("확인된 chatroom데이터", chatRoom);

            if (chatRoom && chatRoom.code) {
                navigate(`/chat/${chatRoom.code}`); // 생성된 채팅방으로 이동
            } else {
                throw new Error("채팅방 code가 없습니다.");
            }
        }catch (err) {
            console.error("채팅방 생성 오류:", err);
            setError(err.message || "채팅방을 생성하는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { startChat, loading, error };
}


export default useContectChat;
