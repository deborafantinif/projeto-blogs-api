const authorization = require('../middlewares/authorization');
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

  async getById(req, res) {
    const { id } = req.params;
    const { code, data } = await userService.getById(+id);
    res.status(code).json(data);
  },

  async remove(req, res) {
    const userId = authorization.getDataToken(req.headers.authorization);
    await userService.remove(userId.data);
    res.status(204).end();
  },
};

module.exports = user;