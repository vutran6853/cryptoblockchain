import React, { Component } from 'react';
import { Container, Card, CardImg, CardText, 
          CardBody, CardTitle, Button } from 'reactstrap';
import { BackTop } from 'antd';
import css from './news.scss';

const axios = require('axios');

class News extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      newsData: []
     }
  }
  componentDidMount() {
    axios.get('/api/getNewsArticles')
    .then((response) => {
      // console.log(response.data.Data)
      this.setState({ newsData: response.data.Data.splice(0, 10) })
    })
    .catch((error) => {
      console.log(`Danger! errror ${ error }`)
    });

  }

  render() {
    let { newsData } = this.state

    let displayNews = newsData.map((value, index) => {
      console.log(value, index)
      return(
      <Container>
        <Card id='newsCardBox'>
          <CardBody>
            <CardImg src={ value.imageurl } alt='broken'/>
            <a href={ value.url } target='_blank'>{ value.title}</a>
            <p>{ value.body }</p>
            <p className='pCategories'>Categories: { value.categories }</p>

            <div className='fafaUpDownBox'>
              <button className='fafaUp'>
                <i class="fas fa-thumbs-up"></i> 
                upvotes { value.upvotes }
              </button>
              <button className='fafaDown'>
                <i class="fas fa-thumbs-down"></i> 
                downvotes { value.downvotes }
              </button>
            </div>

          </CardBody>
        </Card>
      </Container>
      )
    });

    return (
      <div>
        { displayNews }
      
        <BackTop>
          <div className="backToTheTop">UP</div>
        </BackTop>

      </div>
    );
  }
}

export default News;