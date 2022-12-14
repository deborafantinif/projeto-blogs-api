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

  async getById(req, res) {
    const { code, data } = await postService.getById(req.params.id);
    res.status(code).json(data);
  },

  async update(req, res) {
    const userId = authorization.getDataToken(req.headers.authorization);
    const { code, data } = await postService.update(
      req.body,
      Number(req.params.id), 
      Number(userId.data),
    );
    res.status(code).json(data);
  },

  async remove(req, res) {
    const userId = authorization.getDataToken(req.headers.authorization);
    const { code, data } = await postService.remove(
      Number(req.params.id), 
      Number(userId.data),
    );
    res.status(code).json(data);
  },

  async search(req, res) {
    console.log('caiu');
    const data = await postService.search(req.query.q);
    res.json(data);
  },
};

module.exports = post;