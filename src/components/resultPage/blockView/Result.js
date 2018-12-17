import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getLatestBlockQuery } from '../../../graphqlQueries/blockchain';
import axios from 'axios';

const monent = require('moment');

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      latestBlock: [],
      txIndexed: [],
     }
  }

  componentDidMount() {
    axios.get('/api/getLatestBlock')
    .then((response) => {
      console.log(response.data)
      this.setState({ latestBlock: response.data })
      this.setState({ txIndexed: response.data.txIndexes.splice(0, 10) })
    })
    .catch((error) => {
      console.log(`Danger! FrontEnd errror ${ error }`)
    });
  }

  render() {
    // console.log(this.state)
    let { latestBlock, txIndexed } = this.state
    // console.log(`latestBlock: ${ latestBlock.hash }`)

    let displayTXIndexed = txIndexed.map((value, index) => {
      // console.log(value, index)
      return(
        <div>
          <p>Transaction Index: { value }</p>
        </div>
      )
    });
    return (
      <div>
        <p>Result</p>
        <p>Hash: { latestBlock.hash }</p>
        <p>Height: { latestBlock.height }</p>
        <p>Block index: { latestBlock.block_index }</p>
        <p>Time: { monent.unix(latestBlock.time).format('MMM Do YYYY') }</p>
        { displayTXIndexed }
      </div>
    );
  }
}

export default graphql(getLatestBlockQuery)(Result);