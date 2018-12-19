import React, { Component } from 'react';
import { Container, Card, CardImg, CardText, 
          CardBody, CardTitle, Button } from 'reactstrap';

import './icos.scss';
import AmazonLink from '../../../amazonLink/amazonLink';

const axios = require('axios');
const moment = require('moment');

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
      // console.log(response.data)
      this.setState({ icosData: response.data })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    })

  }

  render() {
    let { icosData } = this.state

    let displayIcos = icosData.map((value, index) => {
      // console.log(value, index)
      return(
       
          <Card id='icosCardBox'>
            <CardImg src={ value.image } alt='broken'/>
            <CardBody>
              <h5>{ value.name }</h5>
              <CardText>Start: { moment(value.start_time).format('MMM Do YY') }</CardText>
              <CardText>End: { moment(value.end_time).format('MMM Do YY') }</CardText>
              <CardText>{ value.description }</CardText>
              <Button color='primary'>
                <a href={ value.website } target='_blank'>{ value.name}</a>
              </Button>
            </CardBody>
          </Card>
      )
    });

    return (
      <div>
        <Container>
          { displayIcos }
        </Container>
        <div className='amzonBox'>
           <AmazonLink/>
        </div>
      </div>
      
    );
  }
}

export default Icos;