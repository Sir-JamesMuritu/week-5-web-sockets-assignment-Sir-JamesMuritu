// ChatInput.jsx - Input component for sending messages

import React, { useState } from 'react';

const ChatInput = ({ onSend, onTyping }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onTyping) onTyping(e.target.value.length > 0);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue('');
      if (onTyping) onTyping(false);
    }
  };

  return (
    <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type a message..."
        style={{ flex: 1 }}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
