const { DataTypes } = require('sequelize')

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  displayName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
}

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const user = sequelize.define('User', attributes, { timestamps: false })
  return user
};