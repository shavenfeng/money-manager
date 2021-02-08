'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const { model } = app

  const ExpenseType = model.define('expenseType', {
    id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    imgUrl: STRING(30),
    typeName: STRING(10),
  }, {
    tableName: 'expenseType',
  })
  ExpenseType.associate = () => {
    ExpenseType.hasMany(model.Expense)
  }
  return ExpenseType
}
