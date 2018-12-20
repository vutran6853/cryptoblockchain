const axios = require('axios');

let blockData = []

let getSingleBlock = (req, res, next) => {
  
  axios.get(`https://blockchain.info/rawblock/${ req.params.hash }`)
  .then((response) => {
    blockData = [response.data]
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! ${ error }`)
  });
}

let getSingleTransaction = (req, res, next) => {
  axios.get(`https://blockchain.info/rawtx/${ req.params.hash }`)
  .then((response) => {
    blockData = [response.data]
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! ${ error }`)
  });
}

let getLatestBlock = (req, res, next) => {

  axios.get('https://blockchain.info/latestblock')
  .then((response) => {
    // console.log(response.data)
    blockData = [response.data]
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! ${ error }`)
  });
}

let getAddress = (req, res, next) => {

  axios.get(`https://blockchain.info/rawaddr/${ req.params.address }`)
  .then((response) => {
    console.log(response.data);
    blockData = [response.data]
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! ${ error }`)
  });
}

let getResult = (req, res, next) => {
  setTimeout(() => {
    res.status(200).send(blockData)
  }, 1000)
}


module.exports = {
  getSingleBlock,
  getSingleTransaction,
  getAddress,
  getLatestBlock,
  getResult,
}