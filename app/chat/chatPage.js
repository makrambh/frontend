"use client";

import React, { useState, useEffect } from 'react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [clientData, setClientData] = useState(null); // Fetch this from your backend

  useEffect(() => {
    // Fetch client data here (replace with your actual API endpoint)
    const fetchClientData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/client-data');
        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }
        const data = await response.json();
        setClientData(data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!message) return;

    // Send message to backend (replace with your API endpoint)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_data: clientData,
          message: message,
          chat_history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Update chat history
      setChatHistory([...chatHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: data.response }
      ]);

      // Clear input
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Chat Agent</h1>

      <div className="chat-history">
        {chatHistory.map((chatMessage, index) => (
          <div key={index} className={`message ${chatMessage.role}`}>
            <strong>{chatMessage.role === 'user' ? 'You:' : 'Agent:'}</strong>
            {chatMessage.content}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;