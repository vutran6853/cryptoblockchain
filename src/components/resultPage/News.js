import React, { Component } from 'react';
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
      // console.log(value, index)
      return(
        <div>
          <p>title: { value.title }</p>
          <p>tags: { value.tags }</p>
          <img src={ value.imageurl } alt='broken'></img>
          <p>name: { value.name }</p>
          <p>upvotes { value.upvotes }</p>
          <p>downvotes { value.downvotes }</p>
          <a href={ value.url } target='_blank'>{ value.title}</a>
        </div>
      )
    });

    return (
      <div>
        <p>News</p>
        { displayNews }
      </div>
    );
  }
}

export default News;