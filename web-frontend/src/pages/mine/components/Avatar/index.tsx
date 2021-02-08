import React from 'react'
import { Icon } from 'antd-mobile'
import avatarImg from '../../../../static/avatar.jpg'
import './index.scss'

const Avatar: React.FC = () => {
  return <div className="avatar-box">
    <div className="left">
      <img src={avatarImg} alt="" />
    </div>
    <div className="right">
      <div className="nikename">小蚊子</div>
      <div className="account-manage">账号管理 <Icon type="right" size="sm" /></div>
    </div>
  </div>
}

export default Avatar
