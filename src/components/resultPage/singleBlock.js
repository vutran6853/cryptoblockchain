import React, { Component } from 'react';
import axios from 'axios';

// let displaySingleBlock = (props) => {
//   console.log(props)
//     return (
//       <div>
//         <p>displaySingleBlock</p>
//       </div>
//     )
  
// }

class SingleBlock extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      blockData: [],
     }
  }

  componentDidMount() {
    axios.get('/api/getResult')
    .then((response) => {
      this.setState({ blockData: response.data });
    })
    .catch((error) => {
      console.log(`Danger! ${ error }`)
    });
  }

  render() {
      console.log(this.state)

    return (
      <div>
        <p>displaySingleBlock</p>
      </div>
    );
  }
}

export default SingleBlock;