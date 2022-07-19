const { Router } = require('express');
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authorization');

const userRouter = Router();

userRouter.get('/', authorization.auth, userController.getAll);
userRouter.get('/:id', authorization.auth, userController.getById);
userRouter.post('/', userController.create);

module.exports = userRouter;