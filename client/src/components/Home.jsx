// Home.jsx - Main chat interface
import React, { useState } from 'react';
import { useSocket } from '../socket/socket';
import { login as apiLogin, logout as apiLogout, fetchMessages } from '../services/api';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import UserList from './UserList';

const Home = () => {
    const [username, setUsername] = useState('');
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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

    const handleJoin = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        setLoading(true);
        setError('');
        try {
            await apiLogin(username.trim());
            const msgs = await fetchMessages();
            setInitialMessages(msgs.reverse()); // reverse to show oldest first
            connect(username.trim());
            setJoined(true);
        } catch {
            setError('Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSend = (msg) => {
        sendMessage(msg);
    };

    // On disconnect, call logout
    const handleDisconnect = async () => {
        await apiLogout(username);
        disconnect();
        setJoined(false);
        setUsername('');
    };

    if (!joined) {
        return (
            <div style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
                <h2>Join the Chat</h2>
                <form onSubmit={handleJoin}>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        style={{ width: '70%', padding: 8 }}
                        disabled={loading}
                    />
                    <button type="submit" style={{ marginLeft: 8, padding: 8 }} disabled={loading}>
                        {loading ? 'Joining...' : 'Join'}
                    </button>
                </form>
                {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
            </div>
        );
    }

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
            </div>
        </div>
    );
};

export default Home;
