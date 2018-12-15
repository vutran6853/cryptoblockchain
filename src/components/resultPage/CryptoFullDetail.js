import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getpaprokaId, getPaprokaDescriptionID, getSingleSymbolPriceId, getSingleSymbolFullId, getHistoricalDailyId, getCoinInfoId } from '../../duck/cyprtoReducer';

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
     }
     this.displaySingleSymbolFull = this.displaySingleSymbolFull.bind(this);
  }

  componentDidMount() {
    console.log(this.props);

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

    this.props.getHistoricalDailyId(this.props.cyprtoData.cryptoCompareCoinId)
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
        <div>
          <p>Mkt. Cap. : { value.HIGH24HOUR }</p>
          <p>Vol.24H: { value.VOLUME24HOURTO }</p>
          <p>Open 24h: { value.OPEN24HOUR }</p>
          <p>Low/High 24h: { value.LOW24HOUR } / { value.HIGH24HOUR }</p>
        </div>
      )
    });
  }


  render() {
    let { singleSymbolPrice, singleSymbolFull, dailyHistorical, descriptionID, coinInfo, paprokaInfo } = this.state
    console.log(this.state)

    let displayCoinImage = coinInfo.map((value, index) => {
      // console.log(value.CoinInfo, index)
      return(
        <div>
          <p>{ value.CoinInfo.Name }</p>
          <img width='20%' src={ `https://www.cryptocompare.com${ value.CoinInfo.ImageUrl }` } alt={ value.CoinInfo.Name }></img>
        </div>
      )
    });


    let displayDescription = descriptionID.map((value, index) => {
      // console.log(value, index)
      // console.log(coinInfo[index].CoinInfo)
      return(
        <div>
           <tbody>
              <tr>
                <td>Start Date: { monent(value.started_at).format('MMMM Do YYYY') }</td>
                <td>Block Number: { coinInfo[index].CoinInfo.BlockNumber }</td>
                <td>Block Reward: { coinInfo[index].CoinInfo.BlockReward }</td>
                <td>ProofType: { coinInfo[index].CoinInfo.ProofType }</td>
                <td><a href={ value.links.website[0] } target='_blank'>{ value.name }</a></td>
              </tr>
            </tbody>

          <p>{ value.description }</p>
        </div>
      )
    });

    let displayDailyHistorical = dailyHistorical.map((value, index) => {
      // console.log(value, index)
     return(
        <tbody>
          <tr>
            <td>{ monent(value.time).format('MMMM Do YYYY') }</td>
            <td>${ value.close }</td>
            <td>placeholder change</td>
          </tr>
        </tbody>
      )
    });

    return (
      <div>
        <p>CryptoFullDetail</p>
          { displayCoinImage }
          <div>
            <p>USD: { singleSymbolPrice.USD }</p>
            {/* { displaySingleSymbolFull } */}
            { this.displaySingleSymbolFull() }
          </div>

          <div>
            detail Box tab1
            { displayDescription }
          </div>

          <div>
            detail Box tab2
            <table>
              <thead>
                <tr>
                  <th>Date(every 10 min)</th>
                  <th>Price</th>
                  <th>Change</th>
                </tr>
              </thead>
            { displayDailyHistorical }
            </table>

          </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getpaprokaId, getPaprokaDescriptionID, getSingleSymbolPriceId, getSingleSymbolFullId, getHistoricalDailyId, getCoinInfoId }) (CryptoFullDetail);