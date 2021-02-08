'use strict'

const getReference = (type, model, key) => ({
  type,
  allowNull: false,
  reference: {
    model,
    key,
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize
    await queryInterface.createTable('account', {
      id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true },
      accountName: STRING(10),
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('account')
  },
}
