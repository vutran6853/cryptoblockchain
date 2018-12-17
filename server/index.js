require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.SERVER_PORT || 3004;
const { json } = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const massive = require('massive');
const app = express();

const { getSingleSymbolPrice, getMultSymbolPrice, getTopListByVolume, getMultSymbolFullData, getCustomAverage, getAllCoinDetail, getConstituentExchanges, getNewsArticles, getAllSymbol } = require('./controllers/cryptoCompareData');
const { getActiveIcos, getUpcomingIcos } = require('./controllers/chasingData');
const { postSymbolId, getSingleSymbolPriceId, getSingleSymbolFullId, getHistoricalId, getCoinInfoId, getAllCoinPaproka, getpaprokaId, getPaprokaDescriptionID } = require('./controllers/cryptoFullDetailSymbol');
const { getSingleBlock, getSingleTransaction, getAddress, getLatestBlock, getResult } = require('./controllers/blockchainData');

app.use(cors());
app.use(json());

////  init graphql and Schema  
///  Endpoint Middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

////  connect string to mongoose db
// mongoose.connect(`mongodb://${ process.env.MONGODB_CONNECTION_STRING }`)
// .then((dbInstace) => {
//   // console.log('Copy of dbInstace', dbInstace.model )
//   app.set('db', dbInstace)
// })
// .catch(error => console.log('DANGER! : ', error));


////  Massive connect to SQL system functionality
massive(process.env.POSTGRESQL_CONNECTION_STRING)
.then(dbInstace => {
  // console.log('Copy of dbInstace', dbInstace )
  app.set('db', dbInstace)
})
.catch(error => console.log('DANGER! : ', error));



////  Crypto Endpoint
app.get('/api/getSingleSymbolPrice', getSingleSymbolPrice);
app.get('/api/getMultSymbolPrice', getMultSymbolPrice);
app.get('/api/getMultSymbolFullData', getMultSymbolFullData);
app.get('/api/getTopListByVolume', getTopListByVolume)
app.get('/api/getCustomAverage', getCustomAverage);
app.get('/api/getAllCoinDetail', getAllCoinDetail);
app.get('/api/getConstituentExchanges', getConstituentExchanges);
app.get('/api/getNewsArticles', getNewsArticles);

////  chasing Endpoint
app.get('/api/getActiveIcos', getActiveIcos);
app.get('/api/getUpcomingIcos', getUpcomingIcos);
app.get('/api/getAllSymbol', getAllSymbol);

//// cryptoFullDetailSymbol Endpoint
app.post('/api/postSymbolId', postSymbolId)
app.get('/api/getSingleSymbolPriceId/:id', getSingleSymbolPriceId)
app.get('/api/getSingleSymbolFullId/:id', getSingleSymbolFullId)
app.put('/api/getHistoricalId', getHistoricalId)
app.get('/api/getCoinInfoId/:id', getCoinInfoId)


//// coinpaprika Endpoint
app.get('/api/getAllCoinPaproka', getAllCoinPaproka);
app.get('/api/getpaprokaId/:id', getpaprokaId)
app.get('/api/getPaprokaDescriptionID/:id', getPaprokaDescriptionID)

////  blockchain Endpoint
app.get('/api/getLatestBlock', getLatestBlock);
app.get('/api/getSingleBlock/:hash', getSingleBlock);
app.get('/api/getSingleTransaction/:hash', getSingleTransaction);
app.get('/api/getSingleAddress/:address', getAddress);
app.get('/api/getResult', getResult)


app.listen(port, () => {
  console.log(`Server is UP and listen to port ${ port }`)
});

