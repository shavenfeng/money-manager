'use strict'

const md5 = require('md5')
const BaseService = require('./base')

class UserService extends BaseService {
  async getUser(phone, password) {
    return this.run(async (ctx, app) => {
      const where = password ? { phone, password: md5(password + app.config.salt) } : { phone }
      return await ctx.model.User.findOne({ where })
    })
  }

  async createUser(phone, password) {
    return this.run(async ctx => {
      return await ctx.model.User.create({
        phone,
        username: phone,
        password,
        createdAt: ctx.helper.formatTime(new Date()),
        updatedAt: ctx.helper.formatTime(new Date()),
      })
    })
  }
  async getUserInfo() {
    return this.run(async ctx => {
      return await ctx.model.User.findOne({
        where: {
          id: ctx.userId
        },
        attributes: ['id', 'avatar', 'username', 'createdAt']
      })
    })
  }
}

module.exports = UserService

