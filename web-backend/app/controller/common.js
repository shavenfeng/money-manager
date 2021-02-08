'use strict'

const BaseController = require('./base')
const dayjs = require('dayjs')



class CommonController extends BaseController {
  async getComposition() {
    const { ctx } = this
    const { month, type } = ctx.request.query
    const result = await ctx.service.common.getComposition(month, type)
    this.success(result)
  }
  async getCompareDayData() {
    const { ctx } = this
    const { time, type } = ctx.request.query
    const result = await ctx.service.common.getCompareDayData(dayjs(time).format('YYYY-MM'), type)
    this.success(result)
  }
  async getCompareMonthData() {
    const { ctx } = this
    const { time, type } = ctx.request.query
    const result = await ctx.service.common.getCompareMonthData(dayjs(time).format('YYYY'), type)
    this.success(result)
  }

}

module.exports = CommonController