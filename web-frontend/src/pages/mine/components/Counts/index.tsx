import React from 'react'
import './index.scss'

interface CountsProps {
  days: number
  counts: number
}

const Counts: React.FC<CountsProps> = props => {
  return <div className="counts-box">
    <div className="days">
      <div>{props.days}</div>
      <div>记账天数</div>
    </div>
    <div className="counts">
      <div>{props.counts}</div>
      <div>记账笔数</div>
    </div>
  </div>
}

export default Counts
