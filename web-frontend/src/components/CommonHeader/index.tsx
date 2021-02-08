import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd-mobile'
import { TAB_List } from '../../constant'
import './index.scss'

interface CommonHeaderProps extends RouteComponentProps {
  pageTitle: string
}

const showBackIcon = (pathname: string) => {
  return TAB_List.map(item => item.path).includes(pathname) ? false : true
}

function CommonHeader(props: CommonHeaderProps) {
  const { pageTitle, history } = props

  const onBack = () => history.goBack()

  return <div className="common-header">
    {
      showBackIcon(history.location.pathname) ? <Icon type="left" onClick={onBack} size="md" /> : null
    }
    {pageTitle}
  </div>
};

export default withRouter(CommonHeader)
