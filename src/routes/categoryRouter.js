const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.post('/', categoryController.create);

module.exports = categoryRouter;