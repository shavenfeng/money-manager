'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize
    await queryInterface.createTable('member', {
      id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true },
      memberName: STRING(10),
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('member')
  },
}
