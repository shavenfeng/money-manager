import React, { useState } from 'react'
import { Calendar } from 'antd-mobile'

interface KeepCarlendarProps {
  selectedDate: Date | null,
  calendarVisible: boolean,
  onCalendarCancel: () => void,
  onCalendarConfirm: (startDateTime?: Date, endDateTime?: Date) => void
}

const now = new Date()

const config = {
  en: false,
  show: false,
  type: 'one',
  config: {}
}

const KeepCalendar: React.FC<KeepCarlendarProps> = props => {
  const { selectedDate, calendarVisible, onCalendarCancel, onCalendarConfirm } = props

  // @ts-ignore
  return <Calendar
    {...config}
    visible={calendarVisible}
    onCancel={onCalendarCancel}
    onConfirm={(startDateTime) => onCalendarConfirm(startDateTime)}
    defaultValue={[selectedDate ? selectedDate : now]}
    minDate={new Date(+now - 5184000000)}
    maxDate={new Date(+now + 31536000000)}
  />
}

export default KeepCalendar
