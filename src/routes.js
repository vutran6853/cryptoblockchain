import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CryptoDashBoard from './components/dashboard/CryptoDashBoard';
import BlockchainDashBoard from './components/dashboard/BlockchainDashBoard';
import Result from './components/resultPage/Result';
import Icos from './components/resultPage/Icos';
import News from './components/resultPage/News';
import CryptoFullDetail from './components/resultPage/CryptoFullDetail';
import SingleAddress from './components/resultPage/SingleAddress';
import SingleTransaction  from './components/resultPage/SingleTransaction';
import SingleBlock from './components/resultPage/SingleBlock';

export default (
  <div>
    <Switch>
      <Route exact path='/' component={ CryptoDashBoard } ></Route>
      <Route path='/blockchainDashBoard' component={ BlockchainDashBoard } ></Route>
      <Route path='/result/latestblock' component={ Result } ></Route>
      <Route path='/result/singleBlock' component={ SingleBlock } ></Route>
      <Route path='/result/singleAddress' component={ SingleAddress } ></Route>
      <Route path='/result/singleTransaction' component={ SingleTransaction } ></Route>
      <Route path='/icos' component={ Icos } ></Route>
      <Route path='/news' component={ News } ></Route>
      <Route path='/cryptoFullDetail' component={ CryptoFullDetail } ></Route>
    </Switch>
  </div>
)
