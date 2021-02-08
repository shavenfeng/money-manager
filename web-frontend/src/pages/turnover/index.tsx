import React, { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import jsmd5 from 'js-md5'
import { useHistory } from 'react-router-dom'
import { Toast, InputItem, Result } from 'antd-mobile'
import { useScrollBarToBottomHook } from '../../hooks/scrollBarToBottomHook'
import TurnoverHeader from './components/TunoverHeader'
import TurnoverList from './components/TurnoverList'
import KeepOne from './components/KeepOne'
import UserModal, { TAB } from '../../components/UserModal'
import { registerReq, loginReq } from '../../service/api'
import { getExpenseListByMonthReq } from '../../service/api'
import { getUserInfo, validateUser } from '../../utils'
import './index.scss'

interface TotalTurnoverType {
  totalIncome: number
  totalExpense: number
}

interface ExpenseType {
  id: number
  typeName: string
}

export interface ExpenseItem {
  expenseType: ExpenseType
  id: number
  money: number
  time: string
}

export interface ExpenseListType extends TotalTurnoverType {
  date: string
  list: ExpenseItem[]
}

interface Response {
  code: number
  data: {
    counts: number
    page: number
    rows: ExpenseListType[]
    totalIncome: number
    totalExpense: number
  }
}

interface LoginResponse {
  code: number
  msg: string
  data: {
    username: string
    id: number
    avatar: string
    email: string
    phone: string
    token: string
  }
}

interface TurnOver {
  totalIncome: number
  totalExpense: number
}

const Turnover: React.FC = () => {
  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM'))
  const [expenseList, setExpenseList] = useState<ExpenseListType[]>([])
  const [totalTurnover, setTotalTurnover] = useState<TurnOver>({
    totalIncome: 0,
    totalExpense: 0
  })
  const [userModalVisivle, setUserModalVisible] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const history = useHistory()

  useEffect(() => {
    getExpenseListByMonth()
  }, [date, pageNo])

  useScrollBarToBottomHook(() => setPageNo(pageNo + 1))

  const getExpenseListByMonth = async () => {
    const res: Response = await getExpenseListByMonthReq({
      pageNo,
      pageSize: 10,
      date
    }) as Response
    const { code, data } = res
    if (code === 200) {
      const { totalIncome, totalExpense } = data
      setTotalTurnover({
        totalExpense,
        totalIncome
      })
      setPageNo(data.page)
      if (pageNo > 1) {
        setExpenseList([...expenseList, ...data.rows])
        return
      }
      setExpenseList(data.rows)
    }
  }

  const onDateChange = (value: Date) => {
    setPageNo(1)
    setDate(dayjs(value).format('YYYY-MM'))
  }

  const handleResponse = (res: LoginResponse, successMsg: string) => {
    const { code, data, msg } = res
    if (code === 200) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      getExpenseListByMonth()
      Toast.success(successMsg)
    } else {
      Toast.fail(msg)
    }
  }

  const login = async (phone: string, password: string) => {
    const res = await loginReq({ phone, password: jsmd5(password) })
    handleResponse(res as LoginResponse, '登录成功')
  }

  const register = async (phone: string, password: string) => {
    const res = await registerReq({ phone, password: jsmd5(password) })
    const { code, data, msg } = res as LoginResponse
    handleResponse(res as LoginResponse, '注册成功')
  }

  const onUserModalOk = (phoneInputItem: InputItem, passwordInputItem: InputItem, tab: TAB, repasswordInputItem?: InputItem) => {
    let phone: string = phoneInputItem.state.value,
      password: string = passwordInputItem.state.value,
      repassword: string = repasswordInputItem != undefined && JSON.stringify(repasswordInputItem) != '{}' ? repasswordInputItem.state.value : ''
    phone = phone.split(' ').join('')
    validateUser(phone, password, tab, repassword)
    tab === TAB.login ? login(phone, password) : register(phone, password)
    setUserModalVisible(false)
  }

  const onKeepOne = () => {
    Object.keys(getUserInfo()).length ? history.push('/turnover/keep') : setUserModalVisible(true)
  }

  return <div className="turnover-box">
    <TurnoverHeader
      onLogin={() => setUserModalVisible(true)}
      onDateChange={onDateChange}
      income={totalTurnover.totalIncome}
      expenses={totalTurnover.totalExpense} />
    <TurnoverList data={expenseList} />
    <UserModal visible={userModalVisivle} onOk={onUserModalOk} onCancel={() => setUserModalVisible(false)} />
    {
      Object.keys(getUserInfo()).length === 0 || expenseList.length === 0 ?
        <KeepOne onKeepOne={onKeepOne} /> : null
    }
  </div>

}

export default Turnover
