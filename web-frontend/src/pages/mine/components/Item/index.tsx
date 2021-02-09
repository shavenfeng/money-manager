import React from 'react'
import { Icon } from 'antd-mobile'
import './index.scss'

interface ItemProps {
  title: string
  url: string
}

const Item: React.FC<ItemProps> = props => {
  return <div className="item-box">
    <div className="title">{props.title}</div>
    <div className="icon">
      <Icon type="right" color="#999999" />
    </div>
  </div>
}

export default Item
