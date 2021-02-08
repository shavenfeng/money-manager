'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize
    await queryInterface.createTable('user', {
      id: { type: INTEGER, allowNull: false, primaryKey: true, unique: true, autoIncrement: true },
      username: STRING(30),
      phone: STRING(20),
      password: STRING(64),
      email: STRING(30),
      avatar: TEXT('long'),
      createdAt: {
        type: DATE,
        allowNul: false,
      },
      updatedAt: {
        type: DATE,
        allowNul: true,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user')
  },
}
