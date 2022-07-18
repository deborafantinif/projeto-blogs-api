const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const validation = require('./validation');
require('dotenv').config();

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '400|"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '400|"email" must be a valid email',
  }),
  password: Joi.string().min(6).messages({
    'string.min': '400|"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

const user = {
  async create(values) {
    const isErrorValidation = validation(schemaUser)(values);
    if (isErrorValidation) {
      return { code: isErrorValidation[0], data: { message: isErrorValidation[1] } };
    }

    const isEmailAlreadyRegisted = await models.User.findOne({ where: { email: values.email } });
    if (isEmailAlreadyRegisted) return { code: 409, data: { message: 'User already registered' } };

    await models.User.create(values);
    const token = jwt.sign({ data: values.email }, process.env.JWT_SECRET);

    return { code: 201, data: { token } };
  },

  async getAll() {
    return models.User.findAll();
  },
};

module.exports = user;