// Home.jsx - Main chat interface
import React, { useEffect, useState } from 'react';
import { useSocket } from '../socket/socket';
import { fetchMessages, logout as apiLogout } from '../services/api';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import UserList from './UserList';

const Home = ({ user, onLogout }) => {
    const [initialMessages, setInitialMessages] = useState([]);
    const {
        isConnected,
        messages,
        users,
        typingUsers,
        connect,
        disconnect,
        sendMessage,
        setTyping,
    } = useSocket();

    useEffect(() => {
        // Connect socket and fetch messages on mount
        if (user?.username) {
            connect(user.username);
            fetchMessages().then(msgs => setInitialMessages(msgs.reverse()));
        }
        // Disconnect socket on unmount
        return () => disconnect();
    }, [user, connect, disconnect]);

    const handleSend = (msg) => {
        sendMessage(msg);
    };

    const handleDisconnect = async () => {
        await apiLogout(user.username);
        disconnect();
        if (onLogout) onLogout();
    };

    // Merge initialMessages (from REST) and messages (from socket)
    const allMessages = [...initialMessages, ...messages];

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #eee' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                    <ChatList messages={allMessages} />
                </div>
                <div style={{ padding: 16, borderTop: '1px solid #eee' }}>
                    <ChatInput onSend={handleSend} onTyping={setTyping} />
                </div>
            </div>
            <div style={{ width: 250, padding: 16, background: '#fafafa' }}>
                <UserList users={users} typingUsers={typingUsers} />
                <div style={{ marginTop: 24 }}>
                    <button onClick={handleDisconnect} style={{ color: 'red' }}>Disconnect</button>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: isConnected ? 'green' : 'red' }}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </div>
                <div style={{ marginTop: 16, fontSize: 14 }}>
                    <strong>Logged in as:</strong> {user?.username}
                </div>
            </div>
        </div>
    );
};

export default Home;
