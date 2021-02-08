import React, { Fragment, useEffect, useState } from 'react'
import { Button, Tabs, Toast } from 'antd-mobile'
import CommonHeader from '../../components/CommonHeader'
import Grid from './components/Grid'
import CategoryList, { CategoryType } from './components/CategoryList'
import { getExpenseTypeListReq, getIncomeTypeListReq, saveExpenseReq, saveIncomeReq } from '../../service/api'
import './index.scss'

interface KeepProps {
  isShow: boolean
}

interface GridData {
  icon: string
}

interface TabValue {
  title: string
  key: number
}

const tabs: TabValue[] = [
  { title: '支出', key: 1 },
  { title: '收入', key: 2 }
]

function Keep(props: KeepProps) {
  const { isShow } = props

  const [currentTab, setCurrentTab] = useState(1)
  const [cateList, setCateList] = useState([])
  const [currentType, setCurrentType] = useState([0, 0])

  useEffect(() => {
    if (currentTab === 1) {
      getExpenseTypeList()
    }
    if (currentTab === 2) {
      getIncomeTypeList()
    }
  }, [currentTab])

  const getExpenseTypeList = async () => {
    const res = await getExpenseTypeListReq()
    setReqData(res)
  }

  const getIncomeTypeList = async () => {
    const res = await getIncomeTypeListReq()
    setReqData(res)
  }

  const setReqData = (res: any) => {
    const { code, data } = res
    if (code === 200) {
      setCateList(data)
    }
  }

  const onSelect = (item: CategoryType) => {
    if (currentTab === 1) {
      setCurrentType([item.id, currentType[1]])
    } else {
      setCurrentType([currentType[0], item.id])
    }
  }

  const onSave = async (date: string, account: number, member: number, remarks: string, express: string) => {
    console.log(date)

    if (currentTab === 1) {
      if (currentType[0] === 0) {
        Toast.fail('请选择类型')
        return
      }
    } else {
      if (currentType[1] === 0) {
        Toast.fail('请选择类型')
        return
      }
    }
    if (date === '') {
      Toast.fail('请选择日期')
      return
    }
    if (account === 0) {
      Toast.fail('请选择账户')
      return
    }
    if (member === 0 && currentTab !== 2) {
      Toast.fail('请选择成员')
      return
    }
    if (express === '') {
      Toast.fail('请输入金额')
      return
    }
    if (currentTab === 1 && !isNaN(Number(express))) {
      const res = await saveExpenseReq({ type: currentType[0], date, account, member, remarks, express })
      handleRes(res)
    }
    if (currentTab === 2 && !isNaN(Number(express))) {
      const res = await saveIncomeReq({ type: currentType[1], date, account, remarks, express })
      handleRes(res)
    }
  }

  const handleRes = (res: any) => {
    console.log('res', res)

    const { code, data, msg } = res
    console.log(code, data)

    if (code === 200) {
      Toast.success('记账成功')
    } else {
      Toast.fail(msg)
    }
  }

  return <div className="keep-box">
    <CommonHeader pageTitle="记账" />
    {/* @ts-ignore */}
    <Tabs
      tabs={tabs}
      initialPage={0}
      tabBarBackgroundColor="#108ee9"
      tabBarActiveTextColor="#ffffff"
      tabBarInactiveTextColor="#ffffff"
      onTabClick={(value: TabValue) => setCurrentTab(value.key)}>
      <CategoryList list={cateList} onSelect={onSelect} />
    </Tabs>
    <Grid onSave={onSave} tab={currentTab} />
  </div>
}

export default Keep


