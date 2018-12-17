import React, { Component } from 'react';
import NavBar from '../navBar/navBar';
import { connect } from 'react-redux';
import { postSymbolId } from '../../duck/cyprtoReducer';
import axios from 'axios';
import lodash from 'lodash';
import { Table, Container  } from 'reactstrap';
import './cryptoDashBoard.scss';

class CryptoDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cryptoData: [],
      ids: [],
      toolTipOpen: false,
     }
    this.handleBitcoinInfo = this.handleBitcoinInfo.bind(this);
    this.handleToolTip = this.handleToolTip.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getTopListByVolume')
    .then((response) => {
      // console.log(response)
      this.setState({ cryptoData: response.data.Data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });

    axios.get('/api/getAllCoinPaproka')

    // setTimeout(() => {
    //   axios.get('/api/testing')
    //   .then((response) => {
    //     console.log(response)
    //     // this.setState({ cryptoData: response.data.DISPLAY })
    //   })
    // }, 5000)
   
  }



  handleBitcoinInfo(ids) {
    // console.log(`id: ${ ids }`)
    this.setState({ ids: ids })
    // console.log(`PROPS`, this.props)
    this.props.postSymbolId({ id: ids })
    


    this.props.history.push('/cryptoFullDetail')

    // axios.post(`/api/postSymbolId`, { id: ids })
    // .then(this.props.history.push('/cryptoFullDetail'))
    // .catch(error => console.log(error));
  }
  
  handleToolTip() {
    this.setState({ toolTipOpen: !this.state.toolTipOpen })
  }



  render() {
    // console.log(this.state)
    let { cryptoData } = this.state

    let diplayData = cryptoData.map((value, index) => {
          // console.log(value.DISPLAY.USD, index)
          return(
              <tbody>
                <tr >
                  <th scope="row" >{ index + 1 }</th>
                  <td onClick={ () => this.handleBitcoinInfo(value.CoinInfo.Name) }   >
                    { value.DISPLAY.USD.FROMSYMBOL } { value.CoinInfo.FullName }
                    <img width='10%' src={ `https://www.cryptocompare.com${ value.CoinInfo.ImageUrl }` } alt='broken' ></img>
                  </td>
                  <td>{ value.DISPLAY.USD.PRICE }</td>
                  <td>{ value.DISPLAY.USD.VOLUME24HOURTO }</td>
                  <td>{ value.DISPLAY.USD.TOTALVOLUME24HTO }</td>
                  <td>{ value.DISPLAY.USD.MKTCAP }</td>
                  <td>{ value.DISPLAY.USD.CHANGEPCT24HOUR }</td>
                </tr>
              </tbody>
          )
    });

    return (
      <Container fluid>
        <Table hover size="sm" bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>Direct Vol.24</th>
              <th>Total Vol.24H</th>
              <th>MKTCAP</th>
              <th>Chage 24H:</th>
            </tr>
          </thead>
          { diplayData }
        </Table>
      </Container>
    );
  }
}

function mapStateToProps(initialState) {
  return initialState
}

export default connect(mapStateToProps, { postSymbolId }) (CryptoDashBoard);