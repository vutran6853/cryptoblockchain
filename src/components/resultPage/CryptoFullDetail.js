import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getpaprokaId, getPaprokaDescriptionID, getSingleSymbolPriceId, getSingleSymbolFullId, getHistoricalId, getCoinInfoId } from '../../duck/cyprtoReducer';
import './resultPage.scss';
import { TabContent, Table, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
const monent = require('moment');
const lodash = require('lodash');

class CryptoFullDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      singleSymbolPrice: [],
      singleSymbolFull: [],
      dailyHistorical: [],
      descriptionID: [],
      coinInfo: [],
      paprokaInfo: [],
      activeTab: '1'
     }
     this.displaySingleSymbolFull = this.displaySingleSymbolFull.bind(this);
     this.toggle = this.toggle.bind(this);
     this.getHistoricalData = this.getHistoricalData.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);

    this.props.getSingleSymbolPriceId(this.props.cyprtoData.cryptoCompareCoinId)
    .then((response) => {
      this.setState({ singleSymbolPrice: response.value.data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });


    this.props.getSingleSymbolFullId(this.props.cyprtoData.cryptoCompareCoinId)
    .then((response) => {
      // console.log(response.value.data)
      this.setState({ singleSymbolFull: response.value.data.DISPLAY })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });

    this.props.getHistoricalId(this.props.cyprtoData.cryptoCompareCoinId)
    .then((response) => {
      // console.log(response.value.data.Data)
      this.setState({ dailyHistorical: response.value.data.Data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });


   this.props.getCoinInfoId(this.props.cyprtoData.cryptoCompareCoinId)
   .then((response) => {
    // console.log(response.value.data.Data)
    this.setState({ coinInfo: response.value.data.Data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });


    setTimeout(() => {
      this.props.getpaprokaId(this.props.cyprtoData.cryptoCompareCoinId)
      .then((response) => {
        // console.log(response.value.data)
        this.setState({ paprokaInfo: response.value.data})
      })
    }, 1000)

    setTimeout(() => {
      this.props.getPaprokaDescriptionID(this.state.paprokaInfo.id)
      .then((response) => {
        // console.log(response.value.data)
        this.setState({ descriptionID: response.value.data})
      })
    }, 2000)

  }

  displaySingleSymbolFull() {
    let { singleSymbolFull, paprokaInfo } = this.state;
    let usdBox = []
    let eurBox = []

   let me = lodash.forEach(singleSymbolFull, function(value, key) {
      // console.log(key);
      // console.log(value.USD);
    usdBox.push(value.USD)   
    });

    return usdBox.map((value, index) => {
      console.log(value, index) 
      return(
        <Row id='singleSymbolMarketRateInnerBox'>
          <p>Mkt. Cap. : { value.HIGH24HOUR }</p>
          <p>Vol.24H: { value.VOLUME24HOURTO }</p>
          <p>Open 24h: { value.OPEN24HOUR }</p>
          <p>Low/High 24h: { value.LOW24HOUR } / { value.HIGH24HOUR }</p>
        </Row>
      )
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  getHistoricalData(id) {
    let { paprokaInfo } = this.state

    console.log(this.state)
    console.log(`id ${ id }`)
    if(id === 1) {
      console.log(`id ${ id }`)
    } else if(id === 2) {
      console.log(`id ${ id }`)
    } else if(id === 3) {
      console.log(`id ${ id }`)
    } else {
      return null
    }
  }


  render() {
    let { singleSymbolPrice, singleSymbolFull, dailyHistorical, descriptionID, coinInfo, paprokaInfo } = this.state
    console.log(this.state)

    let displayCoinImage = coinInfo.map((value, index) => {
      // console.log(value.CoinInfo, index)
      return(
        <div>
          <p>1 { value.CoinInfo.Name } = </p>
          <div>
            <img src={ `https://www.cryptocompare.com${ value.CoinInfo.ImageUrl }` } alt={ value.CoinInfo.Name }></img>
          </div>
        </div>
      )
    });


    let displayDescription = descriptionID.map((value, index) => {
      // console.log(value, index)
      // console.log(coinInfo[index].CoinInfo)
      return(
        <div id='coinDescriptionBox'>
          
          <tbody>
              <tr>
                <td>Algorithm:<br/> { coinInfo[index].CoinInfo.Algorithm }</td>
                <td>ProofType:<br/> { coinInfo[index].CoinInfo.ProofType }</td>
                <td>Block Number:<br/> { coinInfo[index].CoinInfo.BlockNumber }</td>
                <td>Block Reward:<br/> { coinInfo[index].CoinInfo.BlockReward }</td>
                <td>Start Date:<br/> { monent(value.started_at).format('MMM Do YYYY') }</td>
                <td>Website:<br/><a href={ value.links.website[0] } target='_blank'>{ value.name }</a></td>
              </tr>
            </tbody>

          <p>{ value.description }</p>
        </div>
      )
    });

    let displayDailyHistorical = dailyHistorical.map((value, index) => {
      // console.log(value, index)
      // console.log(monent.unix(value.time).format('YYYY-MM-DD, hh:mm:ss a'))
     return(
        <tbody>
          <tr>
            <td>{ monent.unix(value.time).format('YYYY-MM-DD, hh:mm:ss a') }</td>
            <td>${ value.close }</td>
            <td>placeholder change</td>
          </tr>
        </tbody>
      )
    });

    return (
      <div className='mainDetailBox'>
       
          <Col id='colBox'>
            { displayCoinImage }
          </Col>
      
          <div className='coinDetailBox'>
            <div className='singleSymbolPriceBox'>
              <p>USD: ${ singleSymbolPrice.USD }</p>
            </div>

            <div>
              <p>placeholder box</p>
            </div>

            <div className='singleSymbolMarketRateBox'>
              { this.displaySingleSymbolFull() }
            </div>
          </div>

          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={ classnames({ active: this.state.activeTab === '1' }) }
                  onClick={ () => { this.toggle('1') } }
                >
                  DETAILS
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink
                  className={ classnames({ active: this.state.activeTab === '2' }) }
                  onClick={ () => { this.toggle('2') } }
                >
                  HISTORICAL PRICE
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={ this.state.activeTab }>
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>
                    { displayDescription }
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId='2'>
                <Row>
                  <Col>
                    <button onClick={ () => this.getHistoricalData(1) }>1 Hour</button>
                    <button onClick={ () => this.getHistoricalData(2) }>Daily?</button>
                    <button onClick={ () => this.getHistoricalData(3) }>Min?</button>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>Date(every hour)</th>
                          <th>Price</th>
                          <th>Change</th>
                        </tr>
                      </thead>
                      { displayDailyHistorical }
                    </Table>
                  </Col>

                  
                </Row>
              </TabPane>
            </TabContent>
          </div>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getpaprokaId, getPaprokaDescriptionID, getSingleSymbolPriceId, getSingleSymbolFullId, getHistoricalId, getCoinInfoId }) (CryptoFullDetail);