import React, { useEffect } from 'react'
import F2 from '@antv/f2'

interface HistogramDataItem {
  label: string
  value: number
}

interface HistogramProps {
  containerId: string
  data: HistogramDataItem[]
}

const Histogram: React.FC<HistogramProps> = (props) => {
  const { containerId, data } = props
  useEffect(() => {
    const valueList = data.map(item => item.label)
    const chart = new F2.Chart({
      id: containerId,
      width: window.innerWidth - 32,
      pixelRatio: window.devicePixelRatio,
    })
    chart.source(data, {
      label: {
        type: 'cat',
        tickCount: 5,
        values: valueList
      }
    })
    chart.scale('label', {
      tickCount: 6
    })
    chart.interval({ sortable: false }).position('label*value').style({
      radius: [10, 10, 0, 0]
    })
    chart.interaction('pan', {
      onStart(ev) {
        chart.repaint()
      }
    })
    chart.render()
  }, [data])
  return <canvas id={containerId}></canvas>
}

export default Histogram
