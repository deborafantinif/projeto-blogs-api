const { Router } = require('express');
const postController = require('../controllers/postController');

const postRouter = Router();

postRouter.get('/:id', postController.getById);
postRouter.put('/:id', postController.update);
postRouter.get('/', postController.getAll);
postRouter.post('/', postController.create);

module.exports = postRouter;