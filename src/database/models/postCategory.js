'use strict';
const { DataTypes } = require('sequelize')

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'PostBlog',
      key: 'id'
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Category',
      key: 'id'
    },
  },
}

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const postCategory = sequelize.define('PostCategory', attributes, { timestamps: false })

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'categoryId',
      through: postCategory,
      otherKey: 'postId',
    })

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      foreignKey: 'postId',
      through: postCategory,
      otherKey: 'categoryId',
    })
  }

  return postCategory;
};