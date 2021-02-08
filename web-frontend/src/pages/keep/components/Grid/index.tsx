import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import InputBar from '../InputBar'
import './index.scss'
import { Toast } from 'antd-mobile'

interface GridProps {
  onSave: (date: string, account: number, member: number, remarks: string, express: string) => void,
  tab: number
}

const keyList = ['1', '2', '3', '删除', '4', '5', '6', '+', '7', '8', '9', '-', '保存', '0', '.', '=']

const handleCompute = (express: string, currentInputValue: string): boolean => {
  const expressList = express.split('')
  return expressList.includes('+') || expressList.includes('-') ? true : false
}

const Grid: React.FC<GridProps> = (props) => {
  const { onSave, tab } = props

  const [inputValue, setInputValue] = useState('')
  const [express, setExpress] = useState(['', ''])
  const [date, setDate] = useState('')
  const [account, setAccount] = useState(0)
  const [member, setMember] = useState(0)
  const [mark, setMark] = useState('')
  const [touchIndex, setTouchIndex] = useState(100)
  const gridRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  const touchItemStart = (index: number, value: string) => {
    const tempExpress = tab === 1 ? express[0] : express[1]
    const expressLastIndex = tempExpress.length - 1
    const lastOne = tempExpress[expressLastIndex]
    setTouchIndex(index)
    if (isNaN(Number(value))) {
      if (tempExpress !== '') {
        if (value === '删除') {
          handleSetExpress(tempExpress.slice(0, tempExpress.length - 1))
        } else if (value === '保存') {
          onClickSave()
          history.goBack()
        } else if (value === '.') {
          if (!tempExpress.split('').includes('.') || (handleCompute(tempExpress, inputValue) && tempExpress.includes('.'))) {
            handleSetExpress(`${(tempExpress)}${value}`)
          }
        } else if (value === '=') {
          if (lastOne === '+' || lastOne === '-') {
            handleSetExpress(tempExpress.slice(0, expressLastIndex))
          } else {
            handleSetExpress(eval(tempExpress).toString())
          }
        } else {
          if (handleCompute(tempExpress, value) && lastOne != '+' && lastOne != '-') {
            handleSetExpress(`${eval(tempExpress)}${value}`)
          } else {
            if (lastOne === '+' || lastOne === '-') {
              handleSetExpress(tempExpress.slice(0, expressLastIndex) + value)
            } else {
              handleSetExpress(`${(tempExpress)}${value}`)
            }
          }
        }
      } else {
        Toast.fail('请输入金额')
      }
    } else {
      if (tempExpress === '0') {
        handleSetExpress(value)
      } else {
        handleSetExpress(tempExpress + value)
      }
      setInputValue(value)
    }
  }

  const handleSetExpress = (value: string) => {
    if (tab === 1) {
      setExpress([value, express[1]])
    } else {
      setExpress([express[0], value])
    }
  }

  const touchItemEnd = () => setTouchIndex(100)

  const onChange = (date: string, account: number, member: number, mark: string) => {
    console.log('date:', date)

    setDate(date)
    setAccount(account)
    setMember(member)
    setMark(mark)
  }

  const onClickSave = () => {
    onSave(date, account, member, mark, tab === 1 ? express[0] : express[1])
  }

  useEffect(() => {

  }, [inputValue])

  return <div className="grid-box">

    <div className="square">
      <InputBar express={tab === 1 ? express[0] : express[1]} onChange={onChange} tab={tab} />
      <div className="square-inner grid" ref={gridRef}>
        {
          keyList.map((item, index) => <div
            className={classnames({ 'touch': index === touchIndex })}
            key={item}
            onTouchStart={() => touchItemStart(index, item)}
            onTouchEnd={touchItemEnd}><span>{item}</span></div>)
        }
      </div>
    </div>
  </div>
}

export default Grid
