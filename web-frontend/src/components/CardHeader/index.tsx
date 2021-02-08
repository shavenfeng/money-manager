import React, { useState } from 'react'
import classnames from 'classnames'
import './index.scss'

interface CardHeaderProps {
  title: string,
  onChange: (value: number) => void
}

interface CardTabItem {
  label: string
  value: number
}

const TAB: CardTabItem[] = [
  { label: '支出', value: 1 },
  { label: '收入', value: 2 },
]

const CardHeader: React.FC<CardHeaderProps> = props => {
  const [currentTab, setCurrentTab] = useState(1)
  const onClick = (value: number) => {
    setCurrentTab(value)
    props.onChange(value)
  }
  return <div className="card-header">
    <div>{props.title}</div>
    <div>
      {
        TAB.map((item, index) => <div
          className={classnames('', { 'active': currentTab === item.value })}
          key={item.value}
          onClick={() => onClick(item.value)}>
          {item.label}
        </div>)
      }
    </div>
  </div>
}

export default CardHeader
