'use strict'

const BaseService = require('./base')
const { Op, literal, fn, col } = require('sequelize')
const dayjs = require('dayjs')

const COMPOSITION_TYPE = {
  expense: 1,
  income: 2
}

class CommonService extends BaseService {
  async getComposition(month, type) {
    return this.run(async ctx => {
      const where = {
        time: { [Op.like]: `${month}%` },
        userId: ctx.userId
      }
      if (type == COMPOSITION_TYPE.expense) {
        const result = await ctx.model.Expense.findAll({
          where,
          group: ['expenseTypeId'],
          attributes: [
            [fn('sum', col('money')), 'money']
          ],
          order: literal('money DESC'),
          include: [{
            model: ctx.model.ExpenseType
          }]
        })
        let total = 0
        let list = result.map(item => {
          total += item.dataValues.money
          return {
            money: item.dataValues.money,
            type: item.expenseType
          }
        })
        return { total, list }
      }
      if (type == COMPOSITION_TYPE.income) {
        const result = await ctx.model.Income.findAll({
          where,
          group: ['inComeTypeId'],
          attributes: [
            [fn('sum', col('money')), 'money']
          ],
          order: literal('money DESC'),
          include: [{
            model: ctx.model.IncomeType
          }]
        })
        let total = 0
        let list = result.map(item => {
          total += item.dataValues.money
          return {
            money: item.dataValues.money,
            type: item.incomeType
          }
        })
        return { total, list }
      }
    })
  }
  async getCompareDayData(time, type) {
    return this.run(async ctx => {
      const where = {
        time: {
          [Op.like]: `${time}%`
        },
        userId: ctx.userId
      }
      const model = type == 1 ? this.ctx.model.Expense : this.ctx.model.Income
      const result = await model.findAll({
        where,
        group: ['time'],
        order: [['time', 'ASC']],
        attributes: [
          [fn('date_format', col('time'), '%Y-%m-%d'), 'label'],
          [fn('sum', col('money')), 'value']
        ],
      })
      const currentYear = new Date(time).getFullYear()
      const currentMonth = new Date(time).getMonth() + 1
      const days = new Date(currentYear, currentMonth, 0).getDate()
      let list = []
      const handleData = i => i < 10 ? `0${i}` : i
      for (let i = 1; i < days + 1; i++) {
        list.push({ label: `${currentYear}-${handleData(currentMonth)}-${handleData(i)}`, value: 0 })
      }
      console.log(result[1].dataValues)
      list.forEach(item1 => {
        result.forEach(item2 => {
          if (item1.label == item2.dataValues.label) item1.value = item2.dataValues.value
        })
      })
      return list
    })
  }
  async getCompareMonthData(time, type) {
    return this.run(async ctx => {
      const where = {
        time: {
          [Op.like]: `${time}%`
        },
        userId: ctx.userId
      }
      const model = type == 1 ? this.ctx.model.Expense : this.ctx.model.Income
      const result = await model.findAll({
        where,
        order: [['time', 'ASC']],
        attributes: [
          [fn('date_format', col('time'), '%Y-%m'), 'label'],
          ['money', 'value']
        ],
      })
      const list = []
      const currentYear = new Date(time).getFullYear()
      const handleData = i => i < 10 ? `0${i}` : i
      for (let i = 1; i < 13; i++) {
        list.push({ label: `${currentYear}-${handleData(i)}`, value: 0 })
      }
      list.forEach(item1 => {
        result.forEach(item2 => {
          if (item1.label == item2.dataValues.label) item1.value += item2.dataValues.value
        })
      })
      return list
    })
  }
}

module.exports = CommonService