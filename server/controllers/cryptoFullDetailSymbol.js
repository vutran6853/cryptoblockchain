const axios = require('axios');
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = process.env.REACT_APP_CRYPTOCOMPARE_KEY

let symbolID = ''
let allCoinpaprika = []
let paprokaIdData = []


let postSymbolId  = (req, res, next) => {
  symbolID = req.body.id
  res.status(200)
}

let getSingleSymbolPriceId  = (req, res, next) => {

  axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${ req.params.id }&tsyms=USD,JPY,EUR`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
}

let getSingleSymbolFullId  = (req, res, next) => {

  axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ req.params.id }&tsyms=USD,EUR`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
}

let getHistoricalId  = (req, res, next) => {

  if(req.body.number === 1) {

    axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=${ req.body.id }&tsym=USD&limit=10&`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.log(`Danger! Backend errror ${ error }`)
    });

  } else if(req.body.number === 2) {

    axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${ req.body.id }&tsym=USD&limit=10&`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.log(`Danger! Backend errror ${ error }`)
    });

  } else if(req.body.number === 3) {

    axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${ req.body.id }&tsym=USD&limit=10&`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.log(`Danger! Backend errror ${ error }`)
    });

  } else {
    
    axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=${ req.body.id }&tsym=USD&limit=10&`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.log(`Danger! Backend errror ${ error }`)
    });
  }
}

let getCoinInfoId  = (req, res, next) => {

  axios.get(`https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${ req.params.id }&tsym=USD`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
}

let getAllCoinPaproka = (req, res, next) => {

  axios.get(`https://api.coinpaprika.com/v1/coins`)
  .then((response) => {
    // console.log(response.data)
    allCoinpaprika = response.data
    res.status(200)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
}


let getpaprokaId = (req, res, next) => {

  let filterID = allCoinpaprika.filter((value, index) => {
      // console.log(value.symbol, symbolID)
      if(value.symbol === req.params.id) {
        res.status(200).send(value)
        // console.log('1',value.symbol, req.params.id)
      } else if(value.symbol !== symbolID){
        // console.log('2',value.symbol, req.params.id)
        return null
      }
    })
  
 
  
}

let getPaprokaDescriptionID = (req, res, next) => {

  axios.get(`https://api.coinpaprika.com/v1/coins/${ req.params.id }`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send([response.data])
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
}

function empty() {
  paprokaIdData = []
}

module.exports = {
  postSymbolId,
  getSingleSymbolPriceId,
  getSingleSymbolFullId,
  getHistoricalId,
  getCoinInfoId,
  getAllCoinPaproka,
  getpaprokaId,
  getPaprokaDescriptionID,
}