const jwt = require('jsonwebtoken');
const models = require('../database/models');
require('dotenv').config();

const auth = {
  async auth(email, pass) {
    if (!email || !pass) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }
  
    const user = await models.User.findOne({
      where: { email, password: pass },
    });
  
    if (!user) return { code: 400, data: { message: 'Invalid fields' } };
    const { id } = user;
    const token = jwt.sign({ data: id }, process.env.JWT_SECRET);
  
    return { code: 200, data: { token } };
  },
};

module.exports = auth;