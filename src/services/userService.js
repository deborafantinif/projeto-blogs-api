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

    const newUser = await models.User.create(values, { raw: true });
    const { dataValues: { id } } = newUser;
    const token = jwt.sign({ data: id }, process.env.JWT_SECRET);

    return { code: 201, data: { token } };
  },

  async getAll() {
    return models.User.findAll({ attributes: { exclude: ['password'] } });
  },

  async getById(id) {
    const isFindUser = await models.User.findByPk(id, { raw: true });
    if (!isFindUser) return { code: 404, data: { message: 'User does not exist' } };

    const { password, ...restDataUser } = isFindUser;
    return { code: 200, data: restDataUser };
  },
};

module.exports = user;