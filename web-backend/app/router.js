'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/home', controller.home.index)

  router.post('/api/user/register', controller.user.register)
  router.post('/api/user/login', controller.user.login)

  router.get('/api/expenseType/getExpenseTypeList', controller.expenseType.list)

  router.get('/api/incomeType/getIncomeList', controller.incomeType.list)

  router.get('/api/account/getAccountList', controller.account.list)

  router.get('/api/member/getMemberList', controller.member.list)

  router.post('/api/expense/addExpense', controller.expense.save)
  router.get('/api/expense/getExpenseListByMonth', controller.expense.list)
  router.get('/api/expense/getExpenseRankList', controller.expense.rankList)

  router.post('/api/income/addIncome', controller.income.save)

  router.get('/api/common/getComposition', controller.common.getComposition)
  router.get('/api/common/getCompareDayData', controller.common.getCompareDayData)
  router.get('/api/common/getCompareMonthData', controller.common.getCompareMonthData)

  router.get('/api/user/getUserInfo', controller.user.getUserInfo)
}
