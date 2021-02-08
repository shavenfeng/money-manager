'use strict'

const path = require('path')

module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  auth: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-auth')
  }
}
