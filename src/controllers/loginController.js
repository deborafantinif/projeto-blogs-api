const loginService = require('../services/loginService');

const auth = {
  async auth(req, res) {
    const { email, password } = req.body;
    const { code, data } = await loginService.auth(email, password);
    res.status(code).json(data);
  },
};
  
module.exports = auth;