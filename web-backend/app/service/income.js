'use strict'

const BaseService = require('./base')

class IncomeService extends BaseService {
  async save(params) {
    return this.run(async ctx => {
      return await ctx.model.Income.create({ ...params })
    })
  }
  async getTotalCounts() {
    return this.run(async ctx => {
      const ret = await ctx.model.Income.findAll()
      return ret.length
    })
  }
}

module.exports = IncomeService
