const userService = require('../services/userService');

const user = {
  async create(req, res) {
    const { code, data } = await userService.create(req.body);

    res.status(code).json(data);
  },

  async getAll(_req, res) {
    const users = await userService.getAll();
    res.json(users);
  },
};

module.exports = user;