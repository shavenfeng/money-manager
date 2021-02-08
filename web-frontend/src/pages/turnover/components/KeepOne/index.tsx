import React from 'react'
import { Button } from 'antd-mobile'
import './index.scss'

interface KeepOneProps {
  onKeepOne: () => void
}

const KeepOne: React.FC<KeepOneProps> = props => <div className="keep-one-box">
  <Button type="primary" onClick={props.onKeepOne}>记一笔</Button>
</div>

export default KeepOne
