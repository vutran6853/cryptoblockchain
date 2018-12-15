import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CryptoDashBoard from './components/dashboard/CryptoDashBoard';
import BlockchainDashBoard from './components/dashboard/BlockchainDashBoard';
import Result from './components/resultPage/Result';
import displaySingleBlock from './components/resultPage/singleBlock';
import Icos from './components/resultPage/Icos';
import News from './components/resultPage/News';
import CryptoFullDetail from './components/resultPage/CryptoFullDetail';

export default (
  <div>
    <Switch>
      <Route exact path='/' component={ CryptoDashBoard } ></Route>
      <Route path='/blockchainDashBoard' component={ BlockchainDashBoard } ></Route>
      <Route path='/latestblock' component={ Result } ></Route>
      <Route path='/singleBlock' component={ displaySingleBlock } ></Route>
      <Route path='/icos' component={ Icos } ></Route>
      <Route path='/news' component={ News } ></Route>
      <Route path='/cryptoFullDetail' component={ CryptoFullDetail } ></Route>
    </Switch>
  </div>
)
