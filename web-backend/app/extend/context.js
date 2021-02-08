module.exports = {
  get phone() {
    const token = this.request.header.token
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined
    return tokenCache ? tokenCache.phone : undefined
  },
  get userId() {
    const token = this.request.header.token
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined
    return tokenCache ? tokenCache.id : undefined
  }
}