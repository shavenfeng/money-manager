/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610691196248_7607'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    salt: 'feng',
    redisExpire: 24 * 60 * 60
  }

  config.jwt = {
    secret: 'feng',
  }

  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'Feng2020',
    database: 'life_tool',
    timezone: '+08:00',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  }

  config.multipart = {
    mode: 'stream',
    fileExtensions: ['.csv']
  }

  config.auth = {
    exclude: ['/api/user/login', '/api/user/register']
  }

  return {
    ...config,
    ...userConfig,
  }
}
