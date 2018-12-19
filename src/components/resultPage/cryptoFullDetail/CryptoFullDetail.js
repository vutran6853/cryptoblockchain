import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getpaprokaId, getPaprokaDescriptionID, getSingleSymbolPriceId, getSingleSymbolFullId, getHistoricalId, getCoinInfoId } from '../../../duck/cyprtoReducer';
import './cryptoFullDetail.scss';
import { TabContent, Table, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
// import CryptoLineChart from '../CryptoChart/CryptoLineChart';

const monent = require('moment');
const lodash = require('lodash');
const ReactHighcharts = require('react-highcharts')

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
      activeTab: '1',

      config: {
        yAxis: { title: { text: 'USD $' } },
        xAxis: {
          categories: []
        },
      
        title: { text: 'Europe time zones' },
        // name: { text: 'My title' },
        series: [{
          name:  '',
          type: "line",
          data: []
        }]
      }
      
     }
     this.displaySingleSymbolFull = this.displaySingleSymbolFull.bind(this);
     this.toggle = this.toggle.bind(this);
     this.getHistoricalData = this.getHistoricalData.bind(this);
     this.handleChange24Hour = this.handleChange24Hour.bind(this);
     this.handleHistoricalLineChart = this.handleHistoricalLineChart.bind(this);
  }

  componentDidMount() {

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

    setTimeout(() => {
      this.handleHistoricalLineChart()
    }, 2000)

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState)
    // console.log(prevState.dailyHistorical)
    console.log(this.state.config.series)

    let prevStateData = prevState.dailyHistorical
    let finalResult = ''

    let me = prevStateData.filter((value, index) => {
      // console.log(value.time)
      // console.log(this.state.dailyHistorical[index].time)
      if(value.time === this.state.dailyHistorical[index].time) {
        console.log('LINE 126', true)
        return finalResult = true
      } else {
        console.log('LINE 129', false)
        return finalResult = false
      }
    }) 
    
    console.log(`LINE 134 finalResult ${ finalResult }`)
    console.log('LINE 135',prevState.dailyHistorical , this.state.dailyHistorical)

    if(prevState.dailyHistorical !== this.state.dailyHistorical && finalResult !== true) {
      console.log(`LINE 138`, true)
      console.log(this.state.config.series)
      console.log(`finalResult ${ finalResult }`)
      console.log('LINE 141',prevState.dailyHistorical , this.state.dailyHistorical)
        if(finalResult == false) {
          console.log('FINAL HERE')
          this.handleHistoricalLineChart()
        } else {
          console.log("WHY HERE")
        }
  
      } else if(prevState.dailyHistorical !== this.state.dailyHistorical && finalResult !== false) {
        console.log('LINE 144',prevState.dailyHistorical , this.state.dailyHistorical)
        console.log(`LINE 145`, true)
        console.log(`finalResult ${ finalResult }`)
        console.log(this.state.config.series)
        console.log(`LINE 148`, false)
        // this.handleHistoricalLineChart() 

      // this.state.config.series[0].date = []
      // console.log(this.state.config.series)
      // this.handleHistoricalLineChart()

    } else {
      console.log(`finalResult ${ finalResult }`)
      console.log('LINE 157', false)
      console.log('LINE 158',prevState.dailyHistorical , this.state.dailyHistorical)

    }
  }

  handleHistoricalLineChart() {
    // let { dailyHistorical } = this.state
    console.log(this.state.dailyHistorical)
    console.log(this.state.config.series[0].data)
    if(this.state.config.series[0].data.length === 11) {
      // return this.state.dailyHistorical.map((value, index) => {
      //   // console.log(value, index)
      //   // console.log(monent.unix(value.time).format('hh:mm:ss a'))
      //   return this.state.config.series[0].data.push(value.close) , 
      //         this.state.config.xAxis.categories.push( monent.unix(value.time).format('hh:mm:ss a'))
      // });
      console.log('TRUE')
    } else if(this.state.config.series[0].data.length === 22) { 
      console.log('FALSE')
      this.state.config.series[0].data.length = []
      // this.handleHistoricalLineChart
    }
    console.log('HIT');
    return this.state.dailyHistorical.map((value, index) => {
      // console.log(value, index)
      // console.log(monent.unix(value.time).format('hh:mm:ss a'))
      return this.state.config.series[0].data.push(value.close) , 
            this.state.config.xAxis.categories.push( monent.unix(value.time).format('hh:mm:ss a'))
    });

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
      // console.log(value, index) 
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

  

  getHistoricalData(number) {
    // console.log(this.state)
    // console.log(`number ${ number }`)

    if(number === 1) {
      // console.log(`number ${ number }`)

      this.props.getHistoricalId(this.props.cyprtoData.cryptoCompareCoinId, number)
      .then((response) => {
        // console.log(response.value.data.Data)
        this.setState({ dailyHistorical: response.value.data.Data })
      })
      .catch((error) => {
        console.log(`Danger! errror ${ error }`)
      });

    } else if(number === 2) {
      // console.log(`number ${ number }`)

      this.props.getHistoricalId(this.props.cyprtoData.cryptoCompareCoinId, number)
      .then((response) => {
        // console.log(response.value.data.Data)
        this.setState({ dailyHistorical: response.value.data.Data })
      })
      .catch((error) => {
        console.log(`Danger! errror ${ error }`)
      });

    } else if(number === 3) {
      // console.log(`number ${ number }`)

      this.props.getHistoricalId(this.props.cyprtoData.cryptoCompareCoinId, number)
      .then((response) => {
        // console.log(response.value.data.Data)
        this.setState({ dailyHistorical: response.value.data.Data })
      })
      .catch((error) => {
        console.log(`Danger! errror ${ error }`)
      });

    } else {
      return null
    }
  }

  ////  Need to check this function later 
  handleChange24Hour(openValue, closeValue) {
    // console.log(`openValue ${ openValue }`,  `closeValue: ${ closeValue }`)
    if(openValue >= closeValue) {
      // console.log('HIGH ')
      let finalHighValue = openValue - closeValue
      // console.log(finalHighValue.toFixed(2))
      return finalHighValue.toFixed(2)
    } else {
      // console.log('LOW')
      let finalLowValue = closeValue - openValue
      // console.log(finalLowValue.toFixed(2))
      return finalLowValue.toFixed(2)

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
            <td>{ this.handleChange24Hour(value.open, value.close)}</td>
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
                    <Button color='info' size='sm' onClick={ () => this.getHistoricalData(1) }>1 Hour</Button>
                    <Button color='info' size='sm' onClick={ () => this.getHistoricalData(2) }>Daily?</Button>
                    <Button color='info' size='sm' onClick={ () => this.getHistoricalData(3) }>Min?</Button>
                    <Table bordered className='coinHistoricalBox'>
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

            <ReactHighcharts config={ this.state.config } />
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getpaprokaId, getPaprokaDescriptionID, getSingleSymbolPriceId, getSingleSymbolFullId, getHistoricalId, getCoinInfoId }) (CryptoFullDetail);