const authorization = require('../middlewares/authorization');
const postService = require('../services/postService');

const post = {
  async create(req, res) {
    const userId = authorization.getDataToken(req.headers.authorization);
    const { code, data } = await postService.create(req.body, userId.data);

    res.status(code).json(data);
  },

  async getAll(_req, res) {
    const posts = await postService.getAll();
    res.json(posts);
  },
};

module.exports = post;