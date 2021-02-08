'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const { model } = app

  const Account = model.define('account', {
    id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true },
    accountName: STRING(10),
  }, {
    tableName: 'account',
  })

  Account.associate = () => {
    Account.hasMany(model.Expense)
    Account.hasMany(model.Income)
  }

  return Account
}
