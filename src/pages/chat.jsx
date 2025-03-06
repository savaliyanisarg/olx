import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/chat.css"; // Add styling
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dummy seller data (Replace with API call)
const sellers = {
  1: { name: "John Doe", contact: "+91 98765 43210" },
  2: { name: "Alice Smith", contact: "+91 99876 54321" },
  3: { name: "Michael Brown", contact: "+91 98765 12345" }
};

const ChatWithSeller = () => {
  const { id } = useParams(); // Get seller ID from URL
  const seller = sellers[id] || { name: "Unknown", contact: "N/A" };
  
  const [messages, setMessages] = useState([
    { text: "Hello! Is this item still available?", sender: "buyer" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Handle sending message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages([...messages, { text: newMessage, sender: "buyer" }]);
    setNewMessage("");

    // Simulate seller response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Yes, it's available. Are you interested?", sender: "seller" }
      ]);
    }, 1000);
  };

  return (
    <div>
      <Header />
      <div className="chat-container">
        <h2>Chat with {seller.name}</h2>

        {/* Chat Messages */}
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatWithSeller;
