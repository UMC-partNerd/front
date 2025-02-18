import React, { useState, useEffect } from "react";
import {
  About,
  ChatItemContainer,
  Profile,
  ChatInfo,
  ChatName,
  MessageInfo,
  LastMessage,
  ChatTime

} from "../../styled-components/styled-chat/chat-Item";

const ChatItem = ({ chat, selectedTab, handleChatClick, avatarUrls }) => {
  return (
    <>
      {selectedTab === "collab" && <About>{chat.collabName || "콜라보 채팅"}</About>}

      <ChatItemContainer
          key={chat.id}
          onClick={() => handleChatClick(chat.chatRoomId, chat)}
      >
          <Profile src={avatarUrls[chat.chatRoomId] || "/default-avatar.png"} />
          <ChatInfo>
            <ChatName>
                {selectedTab === "private" ? chat.receiverNickname : chat.clubName}
            </ChatName>
            <MessageInfo>
              <LastMessage>
                  {chat.lastMessage || "메시지가 없습니다"}
              </LastMessage>
              <ChatTime>{chat.time}</ChatTime>
            </MessageInfo>
          </ChatInfo>
      </ChatItemContainer>
    </>
  );
}

export default ChatItem;