import React, { Component } from 'react';
const axios = require('axios');


class Icos extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      icosData: []
     }
  }
  componentDidMount() {
    axios.get('/api/getActiveIcos')
    .then((response) => {
      console.log(response.data)
      this.setState({ icosData: response.data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    })

  }

  render() {
    let { icosData } = this.state

    let displayIcos = icosData.map((value, index) => {
      console.log(value, index)
      return(
        <div>
          <p>Description: { value.description }</p>
          <p>end time: { value.end_time }</p>
          <img src={ value.image } alt='broken'></img>
          <p>name: { value.name }</p>
          <p>stat time: { value.start_time }</p>
          <a href={ value.website } target='_blank'>{ value.name}</a>
        </div>
      )
    });

    return (
      <div>
        <p>Icos</p>
        { displayIcos }
      </div>
    );
  }
}

export default Icos;