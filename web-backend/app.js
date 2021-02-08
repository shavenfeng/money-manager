module.exports = (app) => {
  const { coreMiddleware } = app.config
  app.config.coreMiddleware = [
    ...coreMiddleware,
    ...['auth'],
  ]
}
