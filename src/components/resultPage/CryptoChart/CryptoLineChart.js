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
    setTimeout(() => {
      this.handleMe()
    }, 3000)
  }

  
  handleMe() {
    let { data }  = this.state.config.series[0]
    let { dailyHistorical } = this.props.data
    let me2 = []
    let me = dailyHistorical.map((value, index) => {
      // console.log(value, index)
      return me2.push(value.close)
    })
    this.setState({ data: me2 })
  }
  
  render() {
    return (
      <div>
        <p>crptoLineChart</p>
        <ReactHighcharts config={ this.state.config } />
      </div>
    );
  }
}

export default CrptoLineChart;