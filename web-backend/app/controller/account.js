'use strict'

const BaseController = require('./base')

class AccountController extends BaseController {
  async list() {
    const { ctx } = this
    const result = await ctx.service.account.getAll()
    this.success(result)
  }
}

module.exports = AccountController
