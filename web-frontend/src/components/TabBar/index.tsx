import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TAB_List } from '../../constant'
import './index.scss'

interface TabBarProps {
  onAddClick: () => void
}

function TabBar(props: TabBarProps) {
  const { onAddClick } = props

  const [tabs, setTabs] = useState(TAB_List)

  useEffect(() => {
    setTabs(
      tabs.map((item) => {
        item.path === window.location.pathname ? (item.selected = true) : (item.selected = false)
        return item
      }),
    )
  }, [])

  const onClick = (value: number) => {
    setTabs(
      tabs.map((item) => {
        item.value === value ? (item.selected = true) : (item.selected = false)
        return item
      }),
    )
  }

  const handleAddClick = (value: number) => {
    if (value === 0) onAddClick()
  }

  const renderTabItem = (value: number, selected: boolean, selectedIcon: string, icon: string, title: string) => {
    return <Fragment>
      <div className="tab-icon" onClick={() => handleAddClick(value)}>
        <img src={selected ? selectedIcon : icon} alt="icon" />
      </div>
      <div className="tab-title">{title}</div>
    </Fragment>
  }

  return (
    <div className="tab-bar">
      {tabs.map(({ title, value, selected, path, icon, selectedIcon }) => {
        return <Link to={path} className="tab-item" key={value} onClick={() => onClick(value)}>
          {renderTabItem(value, selected, selectedIcon, icon, title)}
        </Link>
      })}
    </div>
  )
}

export default TabBar
