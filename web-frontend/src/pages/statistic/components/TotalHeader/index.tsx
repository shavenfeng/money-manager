import React, { useState } from 'react'
import { DatePicker } from 'antd-mobile'
import dayjs from 'dayjs'
import carlendarIcon from '../../../../static/calendar.png'
import './index.scss'

interface TotalHeaderProps {
  currentMonth: Date
  data: {
    income?: number
    expense?: number
  }
  onMonthChange: (month: Date) => void
}

const TotalHeader: React.FC<TotalHeaderProps> = props => {
  const { currentMonth, data, onMonthChange } = props
  const onChange = (value: Date) => {
    onMonthChange(value)
  }
  return <div className="total-header">
    <div className="month-picker">
      <DatePicker
        mode="month"
        value={currentMonth}
        onChange={onChange}
      >
        <div className="month-value">{dayjs(currentMonth).format('YYYY-MM')}</div>
      </DatePicker>
      <img src={carlendarIcon} alt="" />
    </div>
    <div className="total-expense-text">共支出</div>
    <div className="total-expense-value">¥ {data.expense?.toFixed(2)}</div>
    <div className="total-income-text">共收入¥{data.income?.toFixed(2)}</div>
  </div>
}

export default TotalHeader
