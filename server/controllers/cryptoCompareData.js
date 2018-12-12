const axios = require('axios');
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = process.env.REACT_APP_CRYPTOCOMPARE_KEY
const Crypto = require('../models/cryptoModel');

let getSingleSymbolPrice = (req, res, next) => {
  console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR`)
  .then((response) => {
    console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getMultSymbolPrice  = (req, res, next) => {
  console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR`)
  .then((response) => {
    console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getMultSymbolFullData  = (req, res, next) => {
  console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XMR,ETH&tsyms=USD,EUR`)
  .then((response) => {
    console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getCustomAverage  = (req, res, next) => {
  console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Kraken`)
  .then((response) => {
    console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getAllCoinDetail  = (req, res, next) => {
  console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
  .then((response) => {
    console.log(response.data.Data["42"])
    let testOne = new Crypto({
      Id: response.data.Data["42"].id,
      Url: response.data.Data["42"].Url,
      ImageUrl: response.data.Data["42"].ImageUrl,
      Name: response.data.Data["42"].Name,
      Symbol: response.data.Data["42"].Symbol,
      CoinName: response.data.Data["42"].CoinName,
      FullName: response.data.Data["42"].FullName,
      Algorithm: response.data.Data["42"].Algorithm,
      ProofType: response.data.Data["42"].ProofType,
      FullyPremined: response.data.Data["42"].FullyPremined,
      TotalCoinSupply: response.data.Data["42"].TotalCoinSupply,
      BuiltOn: response.data.Data["42"].BuiltOn,
      SmartContractAddress: response.data.Data["42"].SmartContractAddress,
      PreMinedValue: response.data.Data["42"].PreMinedValue,
      TotalCoinsFreeFloat: response.data.Data["42"].TotalCoinsFreeFloat,
      SortOrder: response.data.Data["42"].SortOrder,
      Sponsored: response.data.Data["42"].Sponsored,
      IsTrading: response.data.Data["42"].IsTrading,
      TotalCoinsMined: response.data.Data["42"].TotalCoinsMined,
      BlockNumber: response.data.Data["42"].BlockNumber,
      NetHashesPerSecond: response.data.Data["42"].NetHashesPerSecond,
      BlockReward: response.data.Data["42"].BlockReward,
      BlockTime: response.data.Data["42"].BlockTime
    })
    console.log(`testOne ${ testOne }`);
    testOne.save()
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getConstituentExchanges  = (req, res, next) => {
  console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/all/cccaggexchanges`)
  .then((response) => {
    console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getNewsArticles  = (req, res, next) => {
  console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN`)
  .then((response) => {
    console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}


module.exports = {
  getSingleSymbolPrice,
  getMultSymbolPrice,
  getMultSymbolFullData,
  getCustomAverage,
  getAllCoinDetail,
  getConstituentExchanges,
  getNewsArticles
}