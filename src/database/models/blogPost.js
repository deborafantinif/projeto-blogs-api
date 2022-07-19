'use strict';
const { DataTypes } = require('sequelize')

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  published: {
    type: DataTypes.DATE,
  },
  updated: {
    type: DataTypes.DATE,
  }
}

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const blogPost = sequelize.define('BlogPost', attributes, { timestamps: false });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    })
  }

  return blogPost;
};