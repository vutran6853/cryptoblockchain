import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import './dashBoard.scss';
import { getLatestBlockQuery, getSingleBlockQuery, getSingleTransactionQuery, getBlockHeightQuery, getSingleAddressQuery } from '../../graphqlQueries/blockchain';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';     ////  create query for frontend
import displaySingleBlock from '../resultPage/singleBlock';
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
    console.log(userInputData.length);
    console.log(`userInputData: ${ userInputData }`)

    if(userInputData.length === 64 && checkString === '0000') {
      
      this.props.getSingleBlock({
        variables:  { hashID: userInputData }
      })
      .then((response) => {
        console.log(response)
        // this.setState({ resultData: response.data })
      })
      
        
        
    } else if(userInputData.length === 64 && checkString !== '0000') {
      this.props.getSingleTransaction({
        variables:  { transactionID: userInputData }
      })
      .then((response) => {
        console.log(response)
      })
    } else if(userInputData.length === 34 || userInputData.length === 40){
      this.props.getSingleAddress({
        variables:  { singleAddressID: userInputData }
      })
      .then((response) => {
        console.log(response)
      })
    } else {
      return null
    }
  }

  //// push user to latestblock page
  getLatestBlock() {
   this.props.history.push('/latestblock')
  }

  render() {
 console.log(this.props);
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