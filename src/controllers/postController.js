const postService = require('../services/postService');

const post = {
  async create(req, res) {
    const { code, data } = await postService.create(req.body);

    res.status(code).json(data);
  },

  async getAll(_req, res) {
    const posts = await postService.getAll();
    res.json(posts);
  },
};

module.exports = post;