'use strict'

module.exports = app => {
  const { INTEGER, STRING, FLOAT } = app.Sequelize
  const { model } = app

  const Income = model.define('income', {
    id: { type: INTEGER, allownNull: false, primaryKey: true, autoIncrement: true, unique: true },
    userId: {
      type: INTEGER,
      allowNull: false,
      reference: { model: 'user', key: 'id' },
    },
    incomeTypeId: {
      type: INTEGER,
      allowNull: false,
      reference: { model: 'incomeType', key: 'id' },
    },
    accountId: {
      type: INTEGER,
      allowNull: false,
      reference: { model: 'account', key: 'id' },
    },
    money: { type: FLOAT, allowNull: false },
    time: { type: STRING(20), allowNull: false },
    remarks: { type: STRING(100), allowNull: false },
    createdTime: { type: STRING(20), allowNull: false },
    updatedTime: STRING(20),
  }, {
    tableName: 'income',
  })
  Income.associate = () => {
    Income.belongsTo(model.IncomeType, { foreignKey: 'incomeTypeId' })
    Income.belongsTo(model.Account, { foreignKey: 'accountId' })
    Income.belongsTo(model.User, { foreignKey: 'userId' })
  }
  return Income
}
