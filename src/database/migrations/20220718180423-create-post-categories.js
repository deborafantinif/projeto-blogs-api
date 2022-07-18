'use strict';
module.exports = {
    /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        primaryKey: true,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};