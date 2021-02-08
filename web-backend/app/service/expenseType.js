'use strict'

const BaseService = require('./base')

class IncomeService extends BaseService {
  async getAll() {
    return this.run(async ctx => {
      return await ctx.model.ExpenseType.findAll()
    })
  }
}

module.exports = IncomeService
