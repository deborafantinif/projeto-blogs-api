const Joi = require('joi');
const models = require('../database/models');
const validation = require('./validation');
require('dotenv').config();

const schemaCategory = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '400|"name" is required',
  }),
});

const category = {
  async create(values) {
    const isErrorValidation = validation(schemaCategory)(values);
    if (isErrorValidation) {
      return { code: isErrorValidation[0], data: { message: isErrorValidation[1] } };
    }

    const newCategory = await models.Category.create({ name: values.name });

    return { code: 201, data: newCategory };
  },

  // async getAll() {
  //   return models.User.findAll({ attributes: { exclude: ['password'] } });
  // },
};

module.exports = category;