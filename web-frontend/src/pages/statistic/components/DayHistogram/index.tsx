import React from 'react'
import CardHeader from '../../../../components/CardHeader'
import Histogram from '../../../../components/Histogram'
import { CompareDataItemType } from '../../index'
import './index.scss'

interface DayHistogramProps {
  data: CompareDataItemType[]
  onTabChange: (value: number) => void
}

const DayHistogram: React.FC<DayHistogramProps> = props => {
  return <div className="day-histogram">
    <CardHeader title="每日对比" onChange={(value) => props.onTabChange(value)} />
    <div className="content">
      <Histogram containerId='dayHistogram' data={props.data.map(item => ({ label: item.label.slice(-5, 11), value: item.value }))} />
    </div>
  </div>
}

export default DayHistogram
