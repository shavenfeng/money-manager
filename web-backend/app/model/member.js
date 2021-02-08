'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const { model } = app

  const Member = model.define('member', {
    id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true },
    memberName: STRING(10),
  }, {
    tableName: 'member',
  })

  Member.associate = () => {
    Member.hasMany(model.Expense)
  }

  return Member
}
