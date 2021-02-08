import React, { useState, useEffect, useRef } from 'react'
import { Modal, InputItem, SegmentedControl } from 'antd-mobile'

interface UserModal {
  visible: boolean
  onOk: (phone: InputItem, password: InputItem, tab: TAB, repassword?: InputItem) => void
  onCancel: () => void
}

export enum TAB {
  login = '登陆',
  register = '注册'
}

const UserModal: React.FC<UserModal> = props => {
  const { visible, onOk, onCancel } = props

  const [currentTab, setCurrentTab] = useState(TAB.login)
  const phoneRef = useRef<InputItem>({} as InputItem)
  const passwordRef = useRef<InputItem>({} as InputItem)
  const repasswordRef = useRef<InputItem>({} as InputItem)

  const footer = [
    { text: '取消', onPress: () => onCancel() },
    { text: '确定', onPress: () => onOk(phoneRef.current, passwordRef.current, currentTab, repasswordRef.current) },
  ]

  return <Modal
    className="user-modal"
    visible={visible}
    transparent
    maskClosable={false}
    footer={footer}
    onClose={() => setCurrentTab(TAB.login)}
  >
    <div className="user-modal-body">
      <SegmentedControl onValueChange={value => setCurrentTab(value as TAB)} values={[TAB.login, TAB.register]} />
      <div className="form">
        <InputItem
          type="phone"
          placeholder="请输入手机号码"
          // @ts-ignore
          ref={(el: InputItem) => phoneRef.current = el}
        >手机号码</InputItem>
        <InputItem
          type="password"
          placeholder="请输入密码"
          maxLength={14}
          // @ts-ignore
          ref={el => passwordRef.current = el}
        >密码</InputItem>
        {
          currentTab === TAB.register ? <InputItem
            type="password"
            placeholder="请输入确认密码"
            maxLength={14}
            // @ts-ignore
            ref={el => repasswordRef.current = el}
          >确认密码</InputItem> : null
        }
      </div>
    </div>
  </Modal>
}

export default UserModal
