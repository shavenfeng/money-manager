import React from 'react'
import { Icon } from 'antd-mobile'
import avatarImg from '../../../../static/avatar.jpg'
import './index.scss'

interface AvatarProps {
  avatarImg: string
  nikename: string
}

const Avatar: React.FC<AvatarProps> = props => {
  return <div className="avatar-box">
    <div className="avatar"
      style={
        {
          backgroundImage: `url(${props.avatarImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }
      }></div>
    <div className="nikename">{props.nikename}</div>
  </div>
}

export default Avatar
