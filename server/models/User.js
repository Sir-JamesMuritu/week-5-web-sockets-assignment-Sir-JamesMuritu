// models/User.js - User model (in-memory for now)

class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.online = true;
  }
}

module.exports = User;
