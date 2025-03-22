import React, { useEffect, useState } from "react";

const ChatDrawer = ({ socketRef, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!socketRef.current) return;

    // Load previous messages when joining
    socketRef.current.on("previous_messages", (previousMessages) => {
      setMessages(previousMessages);
    });

    // Receive new messages in real-time
    socketRef.current.on("message_received", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.off("previous_messages");
      socketRef.current.off("message_received");
    };
  }, [socketRef]);

  const sendMessage = () => {
    if (newMessage.trim() === "" || !socketRef.current) return;

    const messageData = { username, text: newMessage };
    socketRef.current.emit("send_message", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}: </strong>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatDrawer;
