'use strict'

const BaseController = require('./base')

class MemberController extends BaseController {
  async list() {
    const { ctx } = this
    const result = await ctx.service.member.getAll()
    this.success(result)
  }
}

module.exports = MemberController
