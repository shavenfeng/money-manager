import React, { Fragment, useState, useEffect } from 'react'
import CommonHeader from '../components/CommonHeader'
import TabBar from '../components/TabBar'
import './index.scss'

interface LayoutProps {
  children: object[]
  location: {
    pathname: string
  }
}

const pageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return '流水'
    case '/statistic':
      return '统计'
    case '/moments':
      return '瞬间'
    case '/mine':
      return '我的'
    default:
      return ''
  }
}

function Layout(props: LayoutProps) {
  const { pathname } = props.location

  const [isShow, setIsShow] = useState(false)

  return (
    <Fragment>
      <CommonHeader pageTitle={pageTitle(pathname)} />
      <div className="layout-content">
        {props.children}
      </div>
      <TabBar onAddClick={() => setIsShow(!isShow)} />
    </Fragment>
  )
}

export default Layout
