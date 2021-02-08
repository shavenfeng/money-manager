import { useState, useEffect } from 'react'
import jsmd5 from 'js-md5'
import { Toast } from 'antd-mobile'
import LoginModal from '../components/LoginModal'
import { registerReq, loginReq, getExpenseListByMonthReq } from '../service/api'

enum TabType {
  Login = 1,
  Register = 2
}

export function useUserHook() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState(1)

  useEffect(() => {
    if (username && password && tab === TabType.Register) registerReqAsync()
    if (username && password && tab === TabType.Login) loginReqAsync()
  }, [username, password])

  const registerReqAsync = async () => {
    const res: any = await registerReq({ username, password: jsmd5(password) })
    const { code, data, msg } = res
    if (res.code === 200) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      Toast.success('注册并登录成功!', 1.5)
    } else {
      Toast.fail(msg, 1.5)
    }
  }

  const loginReqAsync = async () => {
    const res: any = await loginReq({ username, password: jsmd5(password) })
    const { code, data, msg } = res
    if (code === 200) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      Toast.success('登录成功!', 1.5)
    } else {
      Toast.fail(msg, 1.5)
    }
  }

  const onAddClick = () => {
    return LoginModal(setUsername, setPassword, setTab)
  }

  return [onAddClick]
}
