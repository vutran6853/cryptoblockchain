const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//// create new collection and def type for datebase
const cryptoSchema = new Schema({
  Id: Number,
  URL: String,
  ImageUrl: String,
  Name: String,
  Symbol: String,
  CoinName: String,
  FullName: String,
  Algorithm:String,
  ProofType: String,
  FullyPremined: String,
  TotalCoinSupply: String,
  BuiltOn: String,
  SmartContractAddress: String,
  PreMinedValue: String,
  TotalCoinsFreeFloat: String,
  SortOrder: String,
  Sponsored: Boolean,
  IsTrading: Boolean,
  TotalCoinsMined: Number,
  BlockNumber: Number,
  NetHashesPerSecond: Number,
  BlockReward: Number,
  BlockTime: Number,
});

////  'Crypto' is table name in database
module.exports = mongoose.model('Crypto', cryptoSchema);