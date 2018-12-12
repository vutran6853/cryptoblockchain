require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.SERVER_PORT || 3004;
const { json } = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

const { getSingleSymbolPrice, getMultSymbolPrice, getMultSymbolFullData, getCustomAverage, getAllCoinDetail, getConstituentExchanges, getNewsArticles } = require('./controllers/cryptoCompareData');
const { getActiveIcos, getUpcomingIcos, getAllSymbol } = require('./controllers/chasingData');
app.use(cors());
app.use(json());

////  init graphql and Schema  
///  Endpoint Middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

////  connect string to db
mongoose.connect(`mongodb://${ process.env.CONNECTION_STRING }`)
.then((dbInstace) => {
  // console.log('Copy of dbInstace', dbInstace.model )
  app.set('db', dbInstace)
})
.catch(error => console.log('DANGER! : ', error));

////  check connect to db
// mongoose.connection.once('open', () => {
//   console.log(`connected to database`)
// });


////  Crypto Endpoint
app.get('/api/getSingleSymbolPrice', getSingleSymbolPrice);
app.get('/api/getMultSymbolPrice', getMultSymbolPrice);
app.get('/api/getMultSymbolFullData', getMultSymbolFullData);
app.get('/api/getCustomAverage', getCustomAverage);
app.get('/api/getAllCoinDetail', getAllCoinDetail);
app.get('/api/getConstituentExchanges', getConstituentExchanges);
app.get('/api/getNewsArticles', getNewsArticles);

////  chasing Endpoint
app.get('/api/getActiveIcos', getActiveIcos);
app.get('/api/getUpcomingIcos', getUpcomingIcos);
app.get('/api/getAllSymbol', getAllSymbol);


app.listen(port, () => {
  console.log(`Server is UP and listen to port ${ port }`)
});

