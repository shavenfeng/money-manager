import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Picker } from 'antd-mobile'
import dayjs from 'dayjs'
import cryptojs from 'crypto-js'
import KeepCalendar from '../KeepCalendar'
import { getAccountListReq, getMemberListReq } from '../../../../service/api'
import './index.scss'

interface InputBarProps {
  express: string
  tab: number
  onChange: (date: string, account: number, member: number, mark: string) => void
}

interface AccountType {
  accountName: string
  id: number
}

interface MemberType {
  memberName: string
  id: number
}

const prompt = Modal.prompt

const InputBar: React.FC<InputBarProps> = (props) => {
  const { express, onChange, tab } = props

  const [date, setDate] = useState(['', ''])
  const [account, setAccount] = useState([[0], [0]])
  const [member, setMember] = useState([0, ''])
  const [mark, setMark] = useState(['', ''])
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [accountList, setAccountList] = useState([])
  const [memberList, setMemberList] = useState([])

  useEffect(() => {
    getAccountList()
    getMemberList()
  }, [])

  useEffect(() => { setData() }, [tab])

  const setData = () => {
    if (tab === 1) {
      // @ts-ignore
      onChange(date[0], account[0][0], member[0], mark[0])
    } else {
      // @ts-ignore
      onChange(date[1], account[1][0], member[0], mark[1])
    }
  }

  const getAccountList = async () => {
    const res: any = await getAccountListReq()
    const { code, data } = res
    if (code === 200) {
      setAccountList(data.map((item: AccountType) => ({ label: item.accountName, value: item.id })))
    }
  }

  const getMemberList = async () => {
    const res: any = await getMemberListReq()
    const { code, data } = res
    if (code === 200) {
      setMemberList(data.map((item: MemberType) => ({ label: item.memberName, value: item.id })))
    }
  }

  const calendarProps = {
    calendarVisible,
    selectedDate: tab === 1 ? new Date(date[0]) : new Date(new Date(date[1])),
    onCalendarCancel: () => {
      setCalendarVisible(false)
    },
    onCalendarConfirm: (startDateTime?: Date) => {
      const dateString = dayjs(startDateTime).format('YYYY-MM-DD hh:mm')
      setCalendarVisible(false)
      if (tab === 1) {
        setDate([dateString, date[1]])
        // @ts-ignore
        onChange(dateString, account[0][0], member[0], mark[0])
      } else {
        setDate([date[0], dateString])
        // @ts-ignore
        onChange(dateString, account[1][0], member[0], mark[1])
      }
    }
  }

  const onAccountPickerChange = (value: string[]) => {
    // @ts-ignore
    const tempAccount = [value[0], accountList.filter((item) => item.value === value[0])[0].label]

    if (tab === 1) {
      setAccount([tempAccount, account[1]])
      // @ts-ignore
      onChange(date[0], tempAccount[0], member[0], mark[0])
    } else {
      setAccount([account[0], tempAccount])
      // @ts-ignore
      onChange(date[1], tempAccount[0], member[0], mark[1])
    }
  }

  const onMemberPickerChange = (value: any) => {
    // @ts-ignore
    const member = [value[0], memberList.filter((item) => item.value === value[0])[0].label]
    setMember(member)
    if (tab === 1) {
      onChange(date[0], account[0][0], member[0], mark[0])
    } else {
      onChange(date[1], account[1][0], member[0], mark[1])
    }

  }

  const onSetMark = (value: string) => {
    if (tab === 1) {
      setMark([value, mark[1]])
      // @ts-ignore
      onChange(date[0], account[0][0], member[0], value)
    } else {
      setMark([mark[0], value])
      // @ts-ignore
      onChange(date[1], account[1][0], member[0], value)
    }
  }

  const renderDate = () => {
    if (tab === 1) {
      return date[0] ? date[0].split(' ')[0].substr(5, 5) : '日期'
    } else {
      return date[1] ? date[1].split(' ')[0].substr(5, 5) : '日期'
    }
  }

  const renderMark = () => {
    if (tab === 1) {
      return mark[0] ? mark[0] : '备注'
    } else {
      return mark[1] ? mark[1] : '备注'
    }
  }


  return <Fragment>
    <KeepCalendar {...calendarProps} />
    <div className="input-bar">
      <div className="left">
        <div className="date" onClick={() => setCalendarVisible(true)}>
          {renderDate()}
        </div>
        {/* @ts-ignore */}
        <Picker data={accountList} cols={1} value={account[tab - 1][0]} onChange={onAccountPickerChange}>
          <span className="account">{account[tab - 1][1] ? account[tab - 1][1] : '账户'}</span>
        </Picker>
        {
          tab === 1 ?
            <Picker data={memberList} cols={1} value={[member[0]]} onChange={onMemberPickerChange}>
              <span className="member">{member[0] !== 0 ? member[1] : '成员'}</span>
            </Picker> : null
        }
        <div className="mark" onClick={() => prompt(
          '备注',
          '请输入备注',
          [
            { text: '取消' },
            { text: '确定', onPress: value => onSetMark(value) },
          ],
          'default',
          tab === 1 ? mark[0] : mark[1]
        )}>{renderMark()}</div>
      </div>
      <div className="right">{express}</div>
    </div>
  </Fragment>
}

export default InputBar

