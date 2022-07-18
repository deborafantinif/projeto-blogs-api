const { Router } = require('express');
const userController = require('../controllers/userControler');
const authorization = require('../middlewares/authorization');

const userRouter = Router();

userRouter.get('/', authorization, userController.getAll);
userRouter.post('/', userController.create);

module.exports = userRouter;