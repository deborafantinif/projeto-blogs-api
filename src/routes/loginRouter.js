const { Router } = require('express');
const loginController = require('../controllers/loginController');
// const express = require('express');

const loginRouter = Router();

loginRouter.post('/', loginController.auth);

module.exports = loginRouter;