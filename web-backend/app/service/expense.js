'use strict'

const BaseService = require('./base')
const { Op, literal, fn, col } = require('sequelize')

class ExpenseService extends BaseService {
  async list(date, pageSize, pageNo) {
    return this.run(async ctx => {
      const month = ctx.helper.formatYear(date)
      const ExpenseModel = ctx.model.Expense
      const where = {
        time: {
          [Op.like]: `${month}%`,
        },
        userId: ctx.userId
      }
      const totalExpense = await ExpenseModel.sum('money', { where })
      const totalIncome = await ctx.model.Income.sum('money', { where })
      const timeResult = await ExpenseModel.findAndCountAll({
        order: [['time', 'DESC']],
        attributes: [
          [literal('DISTINCT `time`', fn('date_format', col('time'), '%Y-%m')), 'time'],
        ],
        where,
        limit: Number(pageSize),
        offset: Number(pageSize * (pageNo - 1))
      })
      const response = await Promise.all(
        timeResult.rows.map(async item => {
          const list = await ExpenseModel.findAll({
            where: {
              time: item.time,
              userId: ctx.userId
            },
            attributes: ['id', 'money', 'time'],
            include: [{
              model: ctx.model.ExpenseType, attributes: {
                exclude: ['imgUrl']
              }
            }]
          })
          return {
            date: ctx.helper.formatDate(item.time),
            list,
          }
        })
      )
      const allResults = await Promise.all(response.map(async item => {
        let totalExpense = 0, totalIncome = 0
        item.list.forEach(item => totalExpense += item.money)
        const incomes = await ctx.model.Income.findAll({
          where: {
            time: {
              [Op.like]: `${item.date}%`
            },
            userId: ctx.userId
          }
        })
        incomes.forEach(item => totalIncome += item.dataValues.money)
        item.totalExpense = totalExpense
        item.totalIncome = totalIncome
        return item
      }))
      return {
        rows: allResults,
        page: Number(pageNo),
        counts: timeResult.count,
        totalExpense,
        totalIncome,
      }
    })
  }
  async save(params) {
    return this.run(async ctx => {
      return await ctx.model.Expense.create({ ...params })
    })
  }
  async rankList(month) {
    return this.run(async ctx => {
      const where = { time: { [Op.like]: `${month}%` }, userId: ctx.userId }
      const expenseTotal = await ctx.model.Expense.sum('money', { where })
      const incomeTotal = await ctx.model.Income.sum('money', { where })
      const result = await ctx.model.Expense.findAll({
        where,
        limit: 10,
        order: [['money', 'desc']],
        attributes: ['id', 'money', 'time', 'remarks'],
        include: {
          model: ctx.model.ExpenseType,
          attributes: ['imgUrl', 'typeName']
        }
      })
      return {
        expenseTotal,
        incomeTotal,
        list: result
      }
    })
  }
  async getTotalCounts() {
    return this.run(async ctx => {
      const ret = await ctx.model.Expense.findAll()
      return ret.length
    })
  }
}

module.exports = ExpenseService
