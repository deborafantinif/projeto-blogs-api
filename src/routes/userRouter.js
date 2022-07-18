const { Router } = require('express');
const userController = require('../controllers/userControler');

const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);

module.exports = userRouter;