'use strict'

const BaseController = require('./base')

class IncomeTypeController extends BaseController {
  async list() {
    const { ctx } = this
    const result = await ctx.service.incomeType.getAll()
    this.success(result)
  }
}

module.exports = IncomeTypeController
