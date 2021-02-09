import React, { useEffect, useState } from 'react'
import Avatar from './components/Avatar'
import Counts from './components/Counts'
import Item from './components/Item'
import { getUserInfo, Response } from '../../service/api'

interface UserInfo {
  avatar: string
  username: string
  days: number
  counts: number
}

const Mine: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avatar: '',
    username: '',
    days: 0,
    counts: 0
  })
  useEffect(() => {
    getUserInfoReq()
  }, [])
  const getUserInfoReq = async () => {
    const res = await getUserInfo() as Response
    if (res && res.code == 200) {
      setUserInfo(res.data)
      console.log(res.data)
    }
  }
  return <div className="mine-box">
    <Avatar avatarImg={userInfo.avatar} nikename={userInfo.username} />
    <Counts days={userInfo.days} counts={userInfo.counts} />
    <Item title="账号管理" url="/mine/accounts-manange" />
    <Item title="分类管理" url="/mine/type-manange" />
    <Item title="成员管理" url="/mine/member-manange" />
    <Item title="预算管理" url="/mine/plan-manange" />
  </div>
}

export default Mine
