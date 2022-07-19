const categoryService = require('../services/categoryService');

const category = {
  async create(req, res) {
    const { code, data } = await categoryService.create(req.body);

    res.status(code).json(data);
  },

  async getAll(_req, res) {
    const users = await categoryService.getAll();
    res.json(users);
  },
};

module.exports = category;