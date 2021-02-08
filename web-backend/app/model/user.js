'use strict'

module.exports = app => {
  const { INTEGER, DATE, STRING, TEXT } = app.Sequelize
  const { model } = app

  const User = model.define('user', {
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
  }, {
    tableName: 'user',
  })
  User.associate = () => {
    User.hasMany(model.Expense)
    User.hasMany(model.Income)
  }
  return User
}
