// MessageList.jsx - Flexible message renderer for chat
import React from 'react';

const MessageList = ({ messages }) => (
    <div style={{ padding: 0, margin: 0 }}>
        {messages.map((msg) => (
            <div key={msg.id} style={{ margin: '8px 0', padding: 8, borderRadius: 4, background: msg.system ? '#f5f5f5' : '#fff' }}>
                {msg.system ? (
                    <em>{msg.message}</em>
                ) : (
                    <>
                        <span style={{ fontWeight: 'bold' }}>{msg.sender || 'Anonymous'}:</span> {msg.message}
                        <span style={{ fontSize: '0.8em', color: '#888', marginLeft: 8 }}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                        {msg.isPrivate && <span style={{ color: 'red', marginLeft: 8 }}>(private)</span>}
                    </>
                )}
            </div>
        ))}
    </div>
);

export default MessageList;
