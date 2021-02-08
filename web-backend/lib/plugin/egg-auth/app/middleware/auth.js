module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url
    const token = ctx.request.header.token
    const { app } = ctx
    const tokenCache = token ? app.jwt.verify(token, app.config.jwt.secret) : undefined
    const phone = tokenCache ? tokenCache.phone : undefined
    const userToken = await ctx.app.redis.get(phone)
    const user = userToken ? userToken === token : userToken
    // 用户不存在，并且请求的路径在排除项之内
    if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        code: 1001,
        msg: '用户未登录'
      }
    } else {
      await next()
    }
  }
}