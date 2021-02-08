'use strict'

module.exports = app => {
  const { INTEGER, STRING, FLOAT } = app.Sequelize
  const { model } = app

  const Expense = model.define('expense', {
    id: { type: INTEGER, allownNull: false, primaryKey: true, autoIncrement: true, unique: true },
    userId: {
      type: INTEGER,
      allowNull: false,
      reference: { model: 'user', key: 'id' },
    },
    expenseTypeId: {
      type: INTEGER,
      allowNull: false,
      reference: { model: 'expenseType', key: 'id' },
    },
    memberId: {
      type: INTEGER,
      allowNull: false,
      reference: { model: 'member', key: 'id' },
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
    tableName: 'expense',
  })
  Expense.associate = () => {
    Expense.belongsTo(model.ExpenseType, { foreignKey: 'expenseTypeID' })
    Expense.belongsTo(model.Member, { foreignKey: 'memberId' })
    Expense.belongsTo(model.Account, { foreignKey: 'accountId' })
    Expense.belongsTo(model.User, { foreignKey: 'userId' })
  }
  return Expense
}
