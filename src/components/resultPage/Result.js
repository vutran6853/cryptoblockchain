import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getLatestBlockQuery } from '../../graphqlQueries/blockchain';


class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     };
  }

  render() {
    console.log(this.props.data.latestBlock)
    let latestBlock = this.props.data.latestBlock
    // console.log(`latestBlock: ${ latestBlock.hash }`);
    return (
      <div>
        <p>Result</p>
        <p>Hash: { latestBlock.hash }</p>
        <p>Height: { latestBlock.height }</p>
        <p>Block index: { latestBlock.block_index }</p>
        <p>Time: { latestBlock.time }</p>

      </div>
    );
  }
}

export default graphql(getLatestBlockQuery)(Result);