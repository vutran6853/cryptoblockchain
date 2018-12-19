import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

let ReactHighcharts = require('react-highcharts')


class CrptoLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      config: { title: { text: 'Europe time zones' } },
      config: {
        yAxis: { title: { text: 'USD $' } },
        title: { text: 'Europe time zones' },
        name: { text: 'My title' },
        series: [{
          name: "this.props.match.params.value",
          type: "line",
          data: ['2']
        }]
      }
    }
    this.handleMe = this.handleMe.bind(this);
  }

  componentDidMount() {
    console.log(this.props)
    setTimeout(() => {
      this.handleMe()
    }, 3000)
  
   
  }

  
  handleMe() {
    console.log(this.props)
    let { data }  = this.state.config.series[0]
    console.log(data)
    let { dailyHistorical } = this.props.data
    console.log(`dailyHistorical: ${ dailyHistorical }`)

    let me2 = []
    let me = dailyHistorical.map((value, index) => {
      // console.log(value, index)
      return me2.push(value.close)
    })

    console.log(`me2 ${ me2 }`);
    this.setState({ data: me2 })
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        <p>crptoLineChart</p>
        <ReactHighcharts config={ this.state.config } />
      </div>
    );
  }
}

export default CrptoLineChart;