const jwt = require('jsonwebtoken');
const models = require('../database/models');
require('dotenv').config();

const auth = {
  async auth(email, password) {
    if (!email || !password) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }
  
    const user = await models.User.findOne({
      where: { email, password },
    });
  
    if (!user) return { code: 400, data: { message: 'Invalid fields' } };
  
    const token = jwt.sign({ data: email }, process.env.JWT_SECRET);
  
    return { code: 200, data: { token } };
  },
};

module.exports = auth;