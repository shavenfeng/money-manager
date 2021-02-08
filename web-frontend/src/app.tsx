import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import Layout from './layout'
import Turnover from './pages/turnover'
import Statistic from './pages/statistic'
import Moments from './pages/moments'
import Mine from './pages/mine'
import Keep from './pages/keep'

function App() {

  return <BrowserRouter>
    <Switch>
      <Route path="/turnover/keep" exact component={Keep} />
      {/* @ts-ignore */}
      <Layout>
        <Route path="/" exact component={Turnover} />
        <Route path="/turnover" exact component={Turnover} />
        <Route path="/statistic" exact component={Statistic} />
        <Route path="/mine" exact component={Mine} />
      </Layout>
    </Switch>
  </BrowserRouter>
}

export default hot(App)
