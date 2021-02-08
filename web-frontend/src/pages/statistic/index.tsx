import React, { useEffect, useState } from 'react'
import TotalHeader from './components/TotalHeader'
import Details from './components/Details'
import DayHistogram from './components/DayHistogram'
import MonthHistogram from './components/MonthHistogram'
import ExpenseLeaderboard from './components/ExpenseLeaderboard'
import { getRankListByMonth, getComposition, getCompareDayData, getCompareMonthData } from '../../service/api'
import './index.scss'
import dayjs from 'dayjs'

interface ResponseType {
  code: number
  data: object
  msg?: string
}

export interface ExpenseType {
  imgUrl: string
  typeName: string
}

interface RankListItemType {
  id: number
  money: number
  time: string
  remarks: string
  expenseType: ExpenseType
}

interface RankDataType {
  incomeTotal: number
  expenseTotal: number
  list: RankListItemType[]
}

export interface Type {
  id: number
  imgUrl: string
  typeName: string
}

interface DetailDataItemType {
  money: number
  type: Type
}

export interface DetailDataType {
  total: number
  list: DetailDataItemType[]
}

export interface CompareDataItemType {
  label: string
  value: number
}

function Statistic() {
  const [rankData, setRankData] = useState<RankDataType>({
    incomeTotal: 0,
    expenseTotal: 0,
    list: []
  })
  const [detailData, setDetailData] = useState<DetailDataType>({ total: 0, list: [] })
  const [compareDayData, setCompareDayData] = useState<CompareDataItemType[]>([])
  const [compareMonthData, setCompareMonthData] = useState<CompareDataItemType[]>([])
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  useEffect(() => {
    getRankListByMonthReq(dayjs(currentMonth).format('YYYY-MM'))
  }, [currentMonth])

  useEffect(() => {
    getCompositionReq(dayjs(currentMonth).format('YYYY-MM'), 1)
  }, [currentMonth])

  useEffect(() => {
    getCompareDayDataReq(dayjs(currentMonth).format('YYYY-MM'), 1)
  }, [currentMonth])

  useEffect(() => {
    getCompareMonthDataReq(dayjs(currentMonth).format('YYYY-MM'), 1)
  }, [currentMonth])

  const getRankListByMonthReq = async (month: string) => {
    const res = await getRankListByMonth({ month })
    const { code, data } = res as ResponseType
    if (res && code === 200) {
      setRankData(data as RankDataType)
    }
  }

  const getCompositionReq = async (month: string, type: number) => {
    const res = await getComposition({ month, type })
    const { code, data } = res as ResponseType
    if (res && code === 200) {
      setDetailData(data as DetailDataType)
    }
  }

  const getCompareDayDataReq = async (time: string, type: number) => {
    const res = await getCompareDayData({ time, type })
    const { code, data } = res as ResponseType
    if (res && code === 200) {
      setCompareDayData(data as CompareDataItemType[])
    }
  }

  const getCompareMonthDataReq = async (time: string, type: number) => {
    const res = await getCompareMonthData({ time, type })
    const { code, data } = res as ResponseType
    if (res && code === 200) {
      setCompareMonthData(data as CompareDataItemType[])
    }
  }

  const TotalHeaderProps = {
    currentMonth,
    data: { expense: rankData.expenseTotal, income: rankData.incomeTotal },
    onMonthChange: (month: Date) => setCurrentMonth(month)
  }

  const onDetailsTabChange = (tab: number) => {
    getCompositionReq(dayjs(currentMonth).format('YYYY-MM'), tab)
  }

  const onDayTabChange = (tab: number) => {
    getCompareDayDataReq(dayjs(currentMonth).format('YYYY-MM'), tab)
  }

  const onMonthTabChange = (tab: number) => {
    getCompareMonthDataReq(dayjs(currentMonth).format('YYYY-MM'), tab)
  }

  return <div className="statistic-box">
    <TotalHeader {...TotalHeaderProps} />
    <Details data={detailData} onTabChange={onDetailsTabChange} />
    <DayHistogram data={compareDayData} onTabChange={onDayTabChange} />
    <MonthHistogram data={compareMonthData} onTabChange={onMonthTabChange} />
    <ExpenseLeaderboard data={rankData.list} />
  </div>
};

export default Statistic
