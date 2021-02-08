import React from 'react'
import { ExpenseType } from '../../index'
import './index.scss'
import icon from '../../../../static/turnover-active.png'

interface ExpenseItemProps {
  index?: number
  id: number
  remarks: string
  money: number
  time: string
  expenseType: ExpenseType
}

interface ExpenseLeaderboardProps {
  data: ExpenseItemProps[]
}

const ExpenseItem: React.FC<ExpenseItemProps> = props => {
  const { expenseType, remarks, money, time, index } = props
  return <div className="expense-item">
    <div className="left">
      <div className="index">0{index}</div>
      <img className="icon" src={icon}></img>
      <div className="details">
        <div className="type">{expenseType.typeName}</div>
        <div className="remarks">{remarks}</div>
      </div>
    </div>
    <div className="right">
      <div className="money">-{money?.toFixed(2)}</div>
      <div className="time">{time}</div>
    </div>
  </div>
}

const ExpenseLeaderboard: React.FC<ExpenseLeaderboardProps> = props => {
  return <div className="leaderboard-box">
    <div className="title">支出排行</div>
    <div className="content">
      {
        props.data.map((item, index) => <ExpenseItem key={item.id} {...{ ...item, index: index + 1 }} />)
      }
    </div>
  </div>
}

export default ExpenseLeaderboard
