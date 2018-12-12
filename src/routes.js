import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CryptoDashBoard from './components/dashboard/CryptoDashBoard';
import BlockchainDashBoard from './components/dashboard/BlockchainDashBoard';
import Result from './components/resultPage/Result';
import displaySingleBlock from './components/resultPage/singleBlock';

export default (
  <div>
    <Switch>
      <Route exact path='/' component={ CryptoDashBoard } ></Route>
      <Route path='/blockchainDashBoard' component={ BlockchainDashBoard } ></Route>
      <Route path='/latestblock' component={ Result } ></Route>
      <Route path='/singleBlock' component={ displaySingleBlock } ></Route>
    </Switch>
  </div>
)