// ChatList.jsx - Displays chat messages

import React from 'react';

const ChatList = ({ messages }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {messages.map((msg) => (
      <li key={msg.id} style={{ margin: '8px 0' }}>
        {msg.system ? (
          <em>{msg.message}</em>
        ) : (
          <>
            <strong>{msg.sender || 'Anonymous'}:</strong> {msg.message}
            <span style={{ fontSize: '0.8em', color: '#888', marginLeft: 8 }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            {msg.isPrivate && <span style={{ color: 'red', marginLeft: 8 }}>(private)</span>}
          </>
        )}
      </li>
    ))}
  </ul>
);

export default ChatList;
