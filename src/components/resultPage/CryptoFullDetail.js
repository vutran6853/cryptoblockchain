import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getpaprokaId } from '../../duck/cyprtoReducer';


class CryptoFullDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      singleSymbolPrice: [],
      singleSymbolFull: [],
      dailyHistorical: [],
      coinInfo: [],
     }
  }

  componentDidMount() {
    axios.get('/api/getSingleSymbolPriceId')
    .then((response) => {
      console.log(response.data)
      this.setState({ singleSymbolPrice: response.data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });

    axios.get('/api/getSingleSymbolFullId')
    .then((response) => {
      console.log(response.data)
      this.setState({ singleSymbolFull: response.data.DISPLAY })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });

    axios.get('/api/getHistoricalDailyId')
    .then((response) => {
      console.log(response.data.Data)
      this.setState({ dailyHistorical: response.data.DISPLAY })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });

    axios.get('/api/getCoinInfoId')
    .then((response) => {
      // console.log(response.data.Data)
      this.setState({ coinInfo: response.data.Data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });
    setTimeout(() => {
      this.props.getpaprokaId(this.props.cyprtoData.cryptoCompareCoinId)

    }, 3000)
    console.log(this.props);
    // axios.get('/api/getpaprokaId')
    // .then((response) => {
    //   console.log(response.data)
    //   // this.setState({ coinInfo: response.data.Data })
    // })
    // .catch((error) => {
    //   console.log(`Danger! errror ${ error }`)
    // })
    
    axios.get('/api/getPaprokaDescriptionID')
    .then((response) => {
      console.log(response.data)
      // this.setState({ coinInfo: response.data.Data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    })

  }



  render() {
    let { singleSymbolPrice, singleSymbolFull, dailyHistorical, coinInfo } = this.state

    let displayCoinInfo = coinInfo.map((value, index) => {
      console.log(value.CoinInfo, index)
      return(
        <div>
          <p>Name: { value.CoinInfo.Name }</p>
          <p>Name: { value.CoinInfo.Name }</p>
          <p>Name: { value.CoinInfo.Name }</p>
          <p>Name: { value.CoinInfo.Name }</p>
        </div>
      )
    })

    return (
      <div>
        <p>CryptoFullDetail</p>
        <p>USD: { singleSymbolPrice.USD }</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getpaprokaId }) (CryptoFullDetail);