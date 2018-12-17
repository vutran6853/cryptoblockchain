const axios = require('axios');
axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = process.env.REACT_APP_CRYPTOCOMPARE_KEY
const Crypto = require('../models/cryptoModel');
const lodash = require('lodash');
const mongoose = require('mongoose');

let allCoinDataStore =[]
let tempStoreName = []
let symbolID = ''


let getSingleSymbolPrice = (req, res, next) => {
  // console.log('Line 13 hit')
  // console.log(`symbolID ${ symbolID }`);
  axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${ symbolID }&tsyms=USD,JPY,EUR`)
  .then((response) => {
    console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
  getMultSymbolPrice()
}

let getMultSymbolPrice  = (req, res, next) => {
  // console.log('Line 27 hit backend');

  // axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR`)
  // .then((response) => {
  //   console.log(response.data)
  //   // res.status(200).send(response.data)
  // })
  // .catch((error) => {
  //   console.log(`Danger! Backend errror ${ error }`)
  // });

}

let getMultSymbolFullData  = (req, res, next) => {
  // console.log('Line 37 hit backend');
  let top100Name = tempStoreName.slice(0, 60)
  // console.log(top100Name);

  axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ top100Name }ETH&tsyms=USD`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getTopListByVolume  = (req, res, next) => {
    // console.log('line 51 hit backend')

    axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`)
    .then((response) => {
      // console.log(response.data)
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.log(`Danger! Backend errror ${ error }`)
    });
}

let getCustomAverage  = (req, res, next) => {
  // console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Kraken`)
  .then((response) => {
    // console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getAllCoinDetail  = (req, res, next) => {
  // console.log('Line 67 hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
  .then((response) => {
    // console.log(response.data.Data)
    allCoinDataStore = response.data.Data

  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let testing = (req, res, next) => {
  // console.log('Line 85 HIT' )

  // console.log(`allCoinDataStore ${ allCoinDataStore }`)

    let shortData = lodash.map(allCoinDataStore)
    // console.log(shortData);
    let testShortData = shortData.slice(0, 2)
    // console.log(testShortData)

    const dbInstance = req.app.get('db');

    // let display = shortData.map((value, index) => {
    //   console.log(value, index)

    //   dbInstance.post_CryptoDetail(
    //     value.Id,
    //     `https://www.cryptocompare.com/${ value.Url }`,
    //     `https://www.cryptocompare.com${ value.ImageUrl }`,
    //     value.Name,
    //     value.Symbol,
    //     value.CoinName,
    //     value.FullName,
    //     value.Algorithm,
    //     value.ProofType,
    //     value.FullyPremined,
    //     value.TotalCoinSupply,
    //     value.BuiltOn,
    //     value.SmartContractAddress,
    //     value.PreMinedValue,
    //     value.TotalCoinsFreeFloat,
    //     value.SortOrder,
    //     value.Sponsored,
    //     value.IsTrading,
    //     value.TotalCoinsMined,
    //     value.BlockNumber,
    //     value.NetHashesPerSecond,
    //     value.BlockReward,
    //     value.BlockTime
    //   )
    //   .then((response) => {
    //     console.log(response)
    //   })
     
    // })

  // console.log(allCoinDataStore);
  // let display = shortData.map((value, index) => {
  //   // console.log(value.Id);
  //    let testOne = new Crypto({
  //     Id: value.id,
  //     Url: `https://www.cryptocompare.com/${ value.Url }`,
  //     ImageUrl: `https://www.cryptocompare.com${ value.ImageUrl }`,
  //     Name: value.Name,
  //     Symbol: value.Symbol,
  //     CoinName: value.CoinName,
  //     FullName: value.FullName,
  //     Algorithm: value.Algorithm,
  //     ProofType: value.ProofType,
  //     FullyPremined: value.FullyPremined,
  //     TotalCoinSupply: value.TotalCoinSupply,
  //     BuiltOn: value.BuiltOn,
  //     SmartContractAddress: value.SmartContractAddress,
  //     PreMinedValue: value.PreMinedValue,
  //     TotalCoinsFreeFloat: value.TotalCoinsFreeFloat,
  //     SortOrder: value.SortOrder,
  //     Sponsored: value.Sponsored,
  //     IsTrading: value.IsTrading,
  //     TotalCoinsMined: value.TotalCoinsMined,
  //     BlockNumber: value.BlockNumber,
  //     NetHashesPerSecond: value.NetHashesPerSecond,
  //     BlockReward: value.BlockReward,
  //     BlockTime: value.BlockTime
  //   })
  //   // console.log(`testOne ${ testOne }`);
  //   testOne.save()
  // })
}


let getConstituentExchanges  = (req, res, next) => {
  // console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/all/cccaggexchanges`)
  .then((response) => {
    // console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getNewsArticles  = (req, res, next) => {
  // console.log('hit backend');


  axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });

}

let getAllSymbol  = (req, res, next) => {
  // console.log('Line 160 HIT backend');

  // axios.get(`https://chasing-coins.com/api/v1/coins`)
  // .then((response) => {
  //   console.log(response.data)
  //   tempStoreName = response.data
  //   // res.status(200).send(response.data)
  // })
  // .catch((error) => {
  //   console.log(`Danger! Backend errror ${ error }`)
  // });

  mongoose.model('Crypto').find({
    Symbol: "*"
  })
  .then((response) => {
    console.log(response);
  })
}


let postSymbolId  = (req, res, next) => {
  // console.log(`Line 233 req.body ${ req.body.id }`)
  symbolID = req.body.id
  res.status(200)
}

let getSymbolFullDetail  = (req, res, next) => {
  // console.log(`Line 239 symbolID ${ symbolID }`)


}


module.exports = {
  getSingleSymbolPrice,
  getMultSymbolPrice,
  getMultSymbolFullData,
  getCustomAverage,
  getTopListByVolume,
  getAllCoinDetail,
  getConstituentExchanges,
  getNewsArticles,
  testing,
  getAllSymbol,
  postSymbolId,
  getSymbolFullDetail,
}