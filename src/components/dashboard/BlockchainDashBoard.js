import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import './dashBoard.scss';
import { getLatestBlockQuery, getSingleBlockQuery, getSingleTransactionQuery, getBlockHeightQuery, getSingleAddressQuery } from '../../graphqlQueries/blockchain';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';     ////  create query for frontend
import axios from 'axios';
const url = process.env.REACT_APP_URL

const client = new ApolloClient({
  uri: url
});


class BlockchainDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userInputData: '',
      resultData: [],
     }
     this.handleUserInput = this.handleUserInput.bind(this);
     this.handleSubmitData = this.handleSubmitData.bind(this);
     this.getLatestBlock = this.getLatestBlock.bind(this);
  }

  handleUserInput(value) {
    this.setState({ userInputData: value })
  }

  handleSubmitData() {
    let { userInputData } = this.state
    let checkString = userInputData[0] + userInputData[1] + userInputData[2] + userInputData[3]

    if(userInputData.length === 64 && checkString === '0000') {
      axios.get(`/api/getSingleBlock/${ userInputData }`)
      .then(this.props.history.push('/result/singleBlock'))
      .catch((error) => {
        console.log(`Danger! ${ error }`)
      });

    } else if(userInputData.length === 64 && checkString !== '0000') {
              axios.get(`/api/getSingleTransaction/${ userInputData }`)
              .then(this.props.history.push('/result/singleTransaction'))
              .catch((error) => {
                console.log(`Danger! ${ error }`)
              });

    } else if(userInputData.length === 34 || userInputData.length === 40){
              axios.get(`/api/getSingleAddress/${ userInputData }`)
              .then(this.props.history.push('/result/singleAddress'))
              .catch((error) => {
                console.log(`Danger! ${ error }`)
              });
              
    } else {
      return null
    }
  }

  //// push user to latestblock page
  getLatestBlock() {
   this.props.history.push('/result/latestblock')
  }

  render() {
    return (
      <div className='BlockchaindashBoardBox'>
        <p>BlockchainDashBoard</p>

        <input placeholder='Search for things like...Address, Transaction, Block, or Hash' onChange={ (e) => this.handleUserInput(e.target.value) }></input>
          <button  onClick={ () => this.handleSubmitData() }>Search</button>     
         
          <button onClick={ () => this.getLatestBlock() }>Latest block</button>     

      </div>
    )
  }
}

export default compose( graphql(getLatestBlockQuery, { name: 'getLatestBlock' }),
                        graphql(getSingleTransactionQuery, { name: 'getSingleTransaction' }),
                        graphql(getBlockHeightQuery, { name: 'getBlockHeight' }),
                        graphql(getSingleAddressQuery, { name: 'getSingleAddress' }),
                        graphql(getSingleBlockQuery, { name: 'getSingleBlock' }))(BlockchainDashBoard);