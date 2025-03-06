import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const chats = [
  { id: 1, name: "John Doe", lastMessage: "Is this available?", time: "10:30 AM" },
  { id: 2, name: "Alice Smith", lastMessage: "Can you reduce the price?", time: "11:15 AM" },
  { id: 3, name: "Michael Brown", lastMessage: "I’ll pick it up tomorrow.", time: "12:45 PM" },
];

const messagesData = {
  1: [
    { sender: "John Doe", text: "Is this available?", time: "10:30 AM" },
    { sender: "You", text: "Yes, it's available!", time: "10:32 AM" },
  ],
  2: [
    { sender: "Alice Smith", text: "Can you reduce the price?", time: "11:15 AM" },
    { sender: "You", text: "Sorry, the price is fixed.", time: "11:18 AM" },
  ],
  3: [
    { sender: "Michael Brown", text: "I’ll pick it up tomorrow.", time: "12:45 PM" },
    { sender: "You", text: "Sure! See you then.", time: "12:50 PM" },
  ],
};

const MessagePage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    setMessages(messagesData[chatId] || []);
  };

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const updatedMessages = [...messages, { sender: "You", text: newMessage, time: "Now" }];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <>
      <Header />

      <MessageContainer>
        <ChatList>
          <h2>Messages</h2>
          {chats.map((chat) => (
            <ChatItem key={chat.id} active={selectedChat === chat.id} onClick={() => handleSelectChat(chat.id)}>
              <h4>{chat.name}</h4>
              <p>{chat.lastMessage}</p>
              <span>{chat.time}</span>
            </ChatItem>
          ))}
        </ChatList>

        <ChatWindow>
          {selectedChat ? (
            <>
              <ChatHeader>
                <h3>Chat with {chats.find((c) => c.id === selectedChat)?.name}</h3>
              </ChatHeader>
              <ChatMessages>
                {messages.map((msg, index) => (
                  <Message key={index} sender={msg.sender === "You"}>
                    <p>{msg.text}</p>
                    <span>{msg.time}</span>
                  </Message>
                ))}
              </ChatMessages>
              <ChatInput>
                <input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Send</button>
              </ChatInput>
            </>
          ) : (
            <SelectChatMessage>Select a chat to start messaging</SelectChatMessage>
          )}
        </ChatWindow>
      </MessageContainer>

      <Footer />
    </>
  );
};

// Styled Components
const MessageContainer = styled.div`
  display: flex;
  height: 80vh;
  max-width: 1200px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const ChatList = styled.div`
  width: 30%;
  background-color: #f8f9fa;
  border-right: 1px solid #ddd;
  padding: 15px;
  overflow-y: auto;

  h2 {
    margin-bottom: 10px;
  }
`;

const ChatItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#e3f2fd" : "white")};
  transition: background-color 0.3s;

  h4 {
    margin: 0;
  }

  p {
    font-size: 14px;
    color: gray;
    margin: 5px 0 0;
  }

  span {
    font-size: 12px;
    color: gray;
  }

  &:hover {
    background-color: #e3f2fd;
  }
`;

const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 15px;
  background-color: #007bff;
  color: white;
  text-align: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f1f1f1;
`;

const Message = styled.div`
  max-width: 60%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.sender ? "#007bff" : "#ffffff")};
  color: ${(props) => (props.sender ? "#ffffff" : "#000000")};
  align-self: ${(props) => (props.sender ? "flex-end" : "flex-start")};

  p {
    margin: 0;
  }

  span {
    font-size: 12px;
    color: ${(props) => (props.sender ? "#d1e7ff" : "#666")};
    display: block;
    margin-top: 5px;
  }
`;

const ChatInput = styled.div`
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const SelectChatMessage = styled.p`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export default MessagePage;
