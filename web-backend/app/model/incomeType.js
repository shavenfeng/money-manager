'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const { model } = app

  const IncomeType = model.define('incomeType', {
    id: { type: INTEGER, allowNull: false, autoIncrement: true, primaryKey: true, unique: true },
    imgUrl: STRING(30),
    typeName: STRING(10),
  }, {
    tableName: 'incomeType',
  })
  IncomeType.associate = () => {
    IncomeType.hasMany(model.Income)
  }
  return IncomeType
}
