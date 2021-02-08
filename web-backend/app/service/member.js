'use strict'

const BaseService = require('./base')

class MemberService extends BaseService {
  async getAll() {
    return this.run(async ctx => {
      return await ctx.model.Member.findAll()
    })
  }
}

module.exports = MemberService
