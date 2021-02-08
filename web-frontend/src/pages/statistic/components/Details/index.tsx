import React from 'react'
import CardHeader from '../../../../components/CardHeader'
import ProgressBar from '../../../../components/ProgressBar'
import { DetailDataType, Type } from '../../index'
import typeIcon from '../../../../static/mine.png'
import './index.scss'

interface DetailsProps {
  data: DetailDataType
  onTabChange: (tab: number) => void
}

const detailList = [
  { icon: typeIcon, type: '水果', percent: 60, money: 1200.50 },
  { icon: typeIcon, type: '学习', percent: 70, money: 5500.50 },
  { icon: typeIcon, type: '旅游', percent: 10, money: 111.50 },
  { icon: typeIcon, type: '娱乐', percent: 20, money: 112.50 },
]


const Details: React.FC<DetailsProps> = props => {
  const { data: { total, list }, onTabChange } = props

  return <div className="details-box">
    <CardHeader onChange={(tab) => onTabChange(tab)} title="收支构成" />
    <div className="content">
      {
        list.map(({ money, type }) => {
          return <div className="details-item" key={type.id}>
            <div className="type">
              <img src={typeIcon} alt="" />
              <span>{type.typeName}</span>
            </div>
            <ProgressBar percent={((money / total) * 100)} bgColor={'#108ee9'} />
            <div className="money">¥{money}</div>
          </div>
        })
      }
    </div>
  </div>
}

export default Details
