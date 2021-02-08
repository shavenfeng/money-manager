'use strict'

const BaseService = require('./base')

class IncomeTypeService extends BaseService {
  async getAll() {
    return this.run(async ctx => {
      return await ctx.model.IncomeType.findAll()
    })
  }
}

module.exports = IncomeTypeService
