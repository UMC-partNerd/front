import React from 'react';
import List from '../components/chat/chat-list';
import Room from '../components/chat/chat-room';
  const ChatPage = () =>{
    return(
        <>
          채팅

          <List></List>
          <Room></Room>
        </>
    )
  }
  
  export default ChatPage;