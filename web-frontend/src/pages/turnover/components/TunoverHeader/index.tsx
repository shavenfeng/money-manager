import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { DatePicker, Icon } from 'antd-mobile'
import { useUserHook } from '../../../../hooks/userHook'
import { getUserInfo } from '../../../../utils'
import './index.scss'

interface TurnoverHeaderProps {
  onDateChange: (value: Date) => void
  onLogin: () => void
  income: number
  expenses: number
}

enum IconType {
  Down = 'down',
  Up = 'up'
}

const handleMonth = (value: number): string => {
  switch (value.toString().length) {
    case 1:
      return `0${value + 1}`
    case 2:
      return `${value + 1}`
    default:
      return ''
  }
}

const TurnoverHeader: React.FC<TurnoverHeaderProps> = props => {
  const { onDateChange, onLogin, income, expenses } = props

  const [dateValue, setDateValue] = useState(new Date())
  const [iconType, setIconType] = useState(IconType.Down)
  const history = useHistory()

  const onOk = (value: Date) => {
    setIconType(IconType.Down)
    setDateValue(value)
    onDateChange(value)
  }

  const onClick = () => {
    const userInfo = getUserInfo()
    if (Object.keys(userInfo).length > 0) {
      history.push('/turnover/keep')
    } else {
      onLogin()
    }
  }

  const onVisibleChange = (visivle: boolean) => {
    visivle ? setIconType(IconType.Up) : setIconType(IconType.Down)
  }

  const renderMoney = (value: number) => value.toFixed(2)

  return <div className="turnover-header">
    <div className="left">
      <div className="title">{dateValue.getFullYear()}年</div>
      <DatePicker
        mode="month"
        title="Select Date"
        extra="Optional"
        value={dateValue}
        onOk={onOk}
        onVisibleChange={onVisibleChange}
      >
        <div className="date-value">
          <span className="month">{handleMonth(dateValue.getMonth())}</span>
          <span className="text">月</span>
          <Icon type={iconType} size="xxs" />
        </div>
      </DatePicker>
    </div>
    <div className="middle">
      <div className="income">
        <div className="title">收入</div>
        <div className="money">
          {renderMoney(income)}
        </div>
      </div>
      <div className="expenses">
        <div className="title">支出</div>
        <div className="money">
          {renderMoney(expenses)}
        </div>
      </div>
    </div>
    <div className="right">
      <div onClick={onClick}>记账</div>
      <div>预算</div>
    </div>
  </div>

}

export default TurnoverHeader

