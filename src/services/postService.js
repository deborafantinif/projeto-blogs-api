const Joi = require('joi');
const models = require('../database/models');
const validation = require('./validation');
require('dotenv').config();

const schemaPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const post = {
  async create(values) {
    const isErrValid = validation(schemaPost)(values);
    if (isErrValid) return { code: 400, data: { message: 'Some required fields are missing' } };

    const areCategoriesExist = values.categoryIds
      .map(async (category) => models.Category.findByPk(category))
      .filter(true);
    if (!areCategoriesExist) return { code: 400, data: { message: '"categoryIds" not found' } };

    const { categoryIds, ...valuesByBlogPost } = values;
    const newPost = await models.BlogPost.create(valuesByBlogPost);
    Promise.all(
      categoryIds.map(async (categoryId) => models.PostCategory
        .create({ postId: newPost.id, categoryId })),
    );

    return { code: 201, data: newPost };
  },

  async getAll() {
    return models.BlogPost.findAll(
      {
        include: [
          { model: models.User, as: 'user', attributes: { exclude: ['password'] } }, 
          { model: models.Category, as: 'categories' },
        ],
      },
    );
  },
};

module.exports = post;