import React, { Fragment } from 'react'
import { Card, WingBlank, WhiteSpace, Badge, List, SwipeAction } from 'antd-mobile'
import dayjs from 'dayjs'
import { ExpenseListType, ExpenseItem } from '../../index'
import './index.scss'

interface ListProp {
  data: ExpenseListType[]
}

const getDay = (value: string): string => {
  switch (new Date(value).getDay()) {
    case 0:
      return '星期日'
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
    default:
      return ''
  }
}

const handleDate = (value: string): string => {
  const date = new Date(value)
  const month = date.getMonth() + 1
  const currentDate = dayjs(new Date()).format('YYYY-MM-DD')
  const lastDate = dayjs(new Date().getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
  month.toString().length < 2 ? `0${month}` : month
  if (value === currentDate) return '今天'
  if (value === lastDate) return '昨天'
  return `${month.toString().length < 2 ? `0${month}` : month}月${date.getDate()}日`
}

function TurnoverList(props: ListProp) {
  const { data } = props
  return <Fragment>
    <WhiteSpace size="lg" />
    {
      data.map((item, index) => {
        return <WingBlank size="lg" key={index}>
          <Card>
            <Card.Header
              title={<Fragment>
                <span>{handleDate(item.date)}</span>
                <span>{getDay(item.date)}</span>
              </Fragment>}
              extra={<Fragment>
                <span>收入: {item.totalIncome}</span>
                <span>支出: {item.totalExpense}</span>
                <Badge
                  text={
                    item.totalExpense > 100 ? '超' : '省'
                  }
                  hot
                  style={{ marginLeft: 12, backgroundColor: item.totalExpense > 100 ? 'red' : 'green' }} />
              </Fragment>}
            />
            <Card.Body>
              {
                item.list.map((el: ExpenseItem, idx: number) => {
                  return <SwipeAction
                    key={idx}
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                      {
                        text: 'Cancel',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                      },
                      {
                        text: 'Delete',
                        onPress: () => console.log('delete'),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                      },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                  >
                    <List.Item
                      onClick={e => console.log(e)}
                    >
                      <div className="body-item" key={idx}>
                        <span className="type">分类: {el.expenseType ? el.expenseType.typeName : null}</span>
                        <span className="amout">金额: {el.money}</span>
                      </div>
                    </List.Item>
                  </SwipeAction>
                })
              }
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
      })
    }
  </Fragment>
}

export default TurnoverList
