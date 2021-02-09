'use strict'

const md5 = require('md5')
const BaseController = require('./base')

class UserController extends BaseController {
  async jwtSign(res) {
    const { app } = this
    const { phone, id } = res
    const token = app.jwt.sign({ id, phone }, app.config.secret)
    await app.redis.set(phone, token, 'EX', app.config.redisExpire)
    return token
  }
  async register() {
    const { ctx, app } = this
    const { phone, password } = ctx.request.body
    const result = await ctx.service.user.getUser(phone)
    if (result) {
      this.error('用户已存在!')
    } else {
      const res = await ctx.service.user.createUser(phone, md5(password + app.config.salt))
      if (res) {
        const { username, id, avatar, email, phone } = res
        const token = await this.jwtSign(res)
        this.success({
          username,
          id,
          avatar,
          email,
          phone,
          token
        })
      } else {
        this.error('用户注册失败!')
      }
    }
  }
  async login() {
    const { ctx } = this
    const { phone, password } = ctx.request.body
    const result = await ctx.service.user.getUser(phone, password)
    if (result) {
      const token = await this.jwtSign(result)
      const { username, id, avatar, email, phone } = result
      this.success({
        username,
        id,
        avatar,
        email,
        phone,
        token
      })
    } else {
      this.error('账号或密码不正确!')
    }
  }
  async getUserInfo() {
    const { ctx } = this
    const result = await ctx.service.user.getUserInfo()
    const expenseCounts = await ctx.service.expense.getTotalCounts()
    const incomeCounts = await ctx.service.income.getTotalCounts()
    const days = Math.floor((Date.now() - new Date(result.createdAt).getTime()) / 1000 / 60 / 60 / 24)
    const res = {
      username: result.username,
      avatar: result.avatar,
      days,
      counts: expenseCounts + incomeCounts
    }
    this.success(res)
  }
}

module.exports = UserController
