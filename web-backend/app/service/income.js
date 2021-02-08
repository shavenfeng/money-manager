'use strict'

const BaseService = require('./base')

class IncomeService extends BaseService {
  async save(params) {
    return this.run(async ctx => {
      return await ctx.model.Income.create({ ...params })
    })
  }
}

module.exports = IncomeService
