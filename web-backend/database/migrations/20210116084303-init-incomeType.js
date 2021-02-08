'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize
    await queryInterface.createTable('incomeType', {
      id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true },
      imgUrl: STRING(30),
      typeName: STRING(10),
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('incomeType')
  },
}
