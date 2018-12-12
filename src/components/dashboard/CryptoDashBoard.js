import React, { Component } from 'react';
import NavBar from '../navBar/navBar';
import { connect } from 'react-redux';
import { getAllSymbolData, someCoinDetail } from '../../duck/cyprtoReducer';

class CryptoDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {  };

    
  }
  componentDidMount() {
    console.log('HIT')
    console.log(this.props.getAllSymbolData())
    
    this.props.getAllSymbolData()
    .then((response) => {
      console.log(response.value.data.Data["42"])
  
    })
    
  }
  
  componentDidUpdate() {

  }


  render() {
    return (
      <div>
      
        <p>CryptoDashBoard</p>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getAllSymbolData, someCoinDetail }) (CryptoDashBoard);