import React from 'react'
import CardHeader from '../../../../components/CardHeader'
import Histogram from '../../../../components/Histogram'
import { CompareDataItemType } from '../../index'
import './index.scss'

interface MonthHistogramProps {
  data: CompareDataItemType[]
  onTabChange: (value: number) => void
}

const MonthHistogram: React.FC<MonthHistogramProps> = props => {
  return <div className="month-histogram">
    <CardHeader title="月度对比" onChange={value => props.onTabChange(value)} />
    <div className="content">
      <Histogram containerId='monthHistogram' data={props.data} />
    </div>
  </div>
}

export default MonthHistogram
