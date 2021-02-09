import { axiosGet, axiosPost } from './httpRequest'

const api = (url:string) => `/api${url}`

export interface Response {
  data: any
  code: number
}

interface RegisterParams {
  phone: string
  password: string
}

interface LoginParams {
  phone: string
  password: string
}

interface SaveExpenseParams {
  type: number
  date: string
  account: number
  member: number
  remarks: string
  express: string
}

interface SaveIncomeParams {
  type: number
  date: string
  account: number
  remarks: string
  express: string
}

interface GetExpenseListByMonthParams {
  pageNo: number
  pageSize: number
  date: string
}

interface GetRankListByMonthParams {
  month: string
}

interface GetCompositionParams {
  type: number
  month: string
}

interface CompareParams {
  time: string
  type: number
}

export const registerReq = (params:RegisterParams) => axiosPost(api('/user/register'), params)

export const loginReq = (params: LoginParams) =>  axiosPost(api('/user/login'), params)

export const getExpenseTypeListReq = () =>  axiosGet(api('/expenseType/getExpenseTypeList'))

export const getIncomeTypeListReq = () =>  axiosGet(api('/incomeType/getIncomeList'))

export const getAccountListReq = () =>  axiosGet(api('/account/getAccountList'))

export const getMemberListReq = () =>  axiosGet(api('/member/getMemberList'))

export const saveExpenseReq = (params: SaveExpenseParams) => axiosPost(api('/expense/addExpense'), params)

export const saveIncomeReq = (params: SaveIncomeParams) => axiosPost(api('/income/addIncome'), params)

export const getExpenseListByMonthReq = (params: GetExpenseListByMonthParams) => axiosGet(api('/expense/getExpenseListByMonth'), params)

export const getRankListByMonth = (params: GetRankListByMonthParams) => axiosGet(api('/expense/getExpenseRankList'), params)

export const getComposition = (params: GetCompositionParams) => axiosGet(api('/common/getComposition'), params)

export const getCompareDayData = (params: CompareParams) => axiosGet(api('/common/getCompareDayData'), params)

export const getCompareMonthData = (params: CompareParams) => axiosGet(api('/common/getCompareMonthData'), params)

export const getUserInfo = () => axiosGet(api('/user/getUserInfo'))
