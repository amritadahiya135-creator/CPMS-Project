const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
  constructor() {
    super('user');
  }

  // Cloudant specific Mango query to find a user by their email
  async findByEmail(email) {
    const users = await this.findMany({ email: email });
    return users.length > 0 ? users[0] : null;
  }
}

module.exports = new UserModel();
