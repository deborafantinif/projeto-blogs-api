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
  name: {
    type: DataTypes.STRING,
  },
}

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const category = sequelize.define('Category', attributes, { timestamp: false })
  return category;
};