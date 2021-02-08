import React, { useState } from 'react'
import { Modal } from 'antd-mobile'
import classnames from 'classnames'
import './index.scss'

interface TabProps {
  onChange: (value: number) => void
}

const TABS = [
  { label: '登录', value: 1 },
  { label: '注册', value: 2 },
]

const Tab: React.FC<TabProps> = props => {
  const { onChange } = props

  const [tab, setTab] = useState(1)

  const onClick = (value: number) => {
    setTab(value)
    onChange(value)
  }

  return <div className="modal-tab">
    {
      TABS.map(item => <span className={classnames({
        'active': item.value === tab
      })} key={item.value} onClick={() => onClick(item.value)}>{item.label}</span>)
    }
  </div>
}

const LoginModal = (setUsername: (username: string) => void, setPassword: (password: string) => void, setTab: (tab: number) => void) => {

  const onConfirm = async (username: string, password: string) => {
    setUsername(username.toString())
    setPassword(password.toString())
  }

  const onTabChange = (value: number) => {
    setTab(value)
  }

  return Modal.prompt(
    '账户',
    <Tab onChange={onTabChange} />,
    // @ts-ignore
    (username, password) => onConfirm(username, password),
    'login-password',
    '',
    ['请输入账号', '请输入密码'],
  )
}

export default LoginModal

