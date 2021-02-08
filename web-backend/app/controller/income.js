'use strict'

const BaseController = require('./base')

class IncomeController extends BaseController {
  async save() {
    const { ctx, app } = this
    const { type, date, account, remarks, express } = ctx.request.body
    if (type === '' || type === 0) {
      return this.error('支出分类不能空')
    }
    if (date === '') {
      return this.error('支出日期不能空')
    }
    if (account === '' || account === 0) {
      return this.error('账户不能为空')
    }
    if (remarks === '') {
      return this.error('备注不能为空')
    }
    if (express === undefined || express === '') {
      return this.error('支出金额不能为空')
    }
    const time = ctx.helper.formatTime(new Date())
    const { token } = ctx.headers
    const tokenCache = token ? app.jwt.verify(token, app.config.jwt.secret) : undefined
    const userId = tokenCache ? tokenCache.id : undefined
    const result = await ctx.service.income.save({
      userId,
      incomeTypeId: type,
      time: date,
      accountId: account,
      remarks,
      money: Number(express),
      createdTime: time,
      updatedTime: time,
    })
    this.success(result)
  }
}

module.exports = IncomeController
