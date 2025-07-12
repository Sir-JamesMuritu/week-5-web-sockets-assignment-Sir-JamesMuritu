// UserList.jsx - Displays online users

import React from 'react';

const UserList = ({ users, typingUsers }) => (
  <div>
    <h3>Online Users</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {users.map((user) => (
        <li key={user.id}>
          {user.username}
          {typingUsers.includes(user.username) && <span style={{ color: 'green', marginLeft: 8 }}>(typing...)</span>}
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
