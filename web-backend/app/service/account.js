'use strict'

const BaseService = require('./base')

class AccountService extends BaseService {
  async getAll() {
    return this.run(async ctx => {
      return await ctx.model.Account.findAll()
    })
  }
}

module.exports = AccountService
