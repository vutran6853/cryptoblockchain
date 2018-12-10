require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.SERVER_PORT || 3004;
const { json } = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(cors());
app.use(json());

////  init graphql and Schema  
///  Endpoint Middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

////  connect string to db
mongoose.connect(`mongodb://${ process.env.CONNECTION_STRING }`);

////  check connect to db
mongoose.connection.once('open', () => {
  console.log(`connected to database`)
});

app.listen(port, () => {
  console.log(`Server is UP and listen to port ${ port }`)
});

