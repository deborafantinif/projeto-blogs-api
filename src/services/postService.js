const Joi = require('joi');
const models = require('../database/models');
const validation = require('./validation');
require('dotenv').config();

const schemaPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const schemaUpdatedPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const verifyCategoryExist = async (categories) => {
  const findCategories = await Promise.all(
    categories.map(async (category) => models.Category.findByPk(category, { raw: true })),
    );
  const areCategoriesExist = findCategories.filter((category) => category != null);

  if (areCategoriesExist.length > 0) return areCategoriesExist;
  return false;
};

const post = {
  async create(values, userId) {
    const isErrValid = validation(schemaPost)(values);
    if (isErrValid) return { code: 400, data: { message: 'Some required fields are missing' } };

    const areCategoriesExist = await verifyCategoryExist(values.categoryIds);
    if (!areCategoriesExist) return { code: 400, data: { message: '"categoryIds" not found' } };

    const newPostValues = {
      title: values.title,
      content: values.content,
      userId,
    };
    const newPost = await models.BlogPost.create(newPostValues);
    Promise.all(
      areCategoriesExist.map(async ({ id }) => models.PostCategory
      .create({ postId: newPost.id, categoryId: id })),
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

  async getById(id) {
    const postByPk = await models.BlogPost.findByPk(
      id,
      {
        include: [
          { model: models.User, as: 'user', attributes: { exclude: ['password'] } }, 
          { model: models.Category, as: 'categories' },
        ],
      },
    );
    if (!postByPk) return { code: 404, data: { message: 'Post does not exist' } };
    return { code: 200, data: postByPk };
  },

  async update(values, postId, userId) {
    if (postId !== userId) return { code: 401, data: { message: 'Unauthorized user' } };

    const isErrValid = validation(schemaUpdatedPost)(values);
    if (isErrValid) return { code: 400, data: { message: 'Some required fields are missing' } };

    // const areCategoriesExist = await verifyCategoryExist(values.categoryIds);
    // if (!areCategoriesExist) return { code: 400, data: { message: '"categoryIds" not found' } };

    const updatedValues = {
      title: values.title,
      content: values.content,
    };
    await models.BlogPost.update(updatedValues, { where: { id: postId } });
    const updatedPost = await models.BlogPost.findByPk(
      postId,
      {
        include: [
          { model: models.User, as: 'user', attributes: { exclude: ['password'] } }, 
          { model: models.Category, as: 'categories' },
        ],
      },
    );
    // Promise.all(
    //   areCategoriesExist.map(async ({ id }) => models.PostCategory
    //   .create({ postId: updatedPost.id, categoryId: id })),
    //   );
    return { code: 200, data: updatedPost };
  },
};

module.exports = post;