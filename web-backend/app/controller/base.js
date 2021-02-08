'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  success(data = {}) {
    const { ctx } = this
    ctx.body = {
      code: 200,
      data,
    }
  }

  error(msg = '', code = 500) {
    const { ctx } = this
    ctx.body = {
      code,
      msg,
    }
  }

  getUserId() {
    const { token } = ctx.headers
    const tokenCache = token ? app.jwt.verify(token, app.config.jwt.secret) : undefined
    return tokenCache ? tokenCache.id : undefined
  }
}

module.exports = BaseController
