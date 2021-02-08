import React, { Fragment } from 'react'

import './index.scss'

interface ProgressProps {
  percent: number
  bgColor: string
}

const ProgressBar: React.FC<ProgressProps> = (props) => {
  const styles = { '--percent': props.percent, '--bgColor': props.bgColor }
  if (props.percent < 0 || props.percent > 100) {
    console.error(new Error('percent value must between 0 - 100'))
    return null
  }
  return (
    <Fragment>
      <div className="percent">{props.percent.toFixed(1)}%</div>
      <div
        className="progress"
        style={styles}
      />
    </Fragment>
  )
}

export default ProgressBar
