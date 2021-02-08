'use strict'

const BaseController = require('./base')

class ExpenseTypeController extends BaseController {
  async list() {
    const { ctx } = this
    const result = await ctx.service.expenseType.getAll()
    this.success(result)
  }
}

module.exports = ExpenseTypeController
