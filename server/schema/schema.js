const grahpql = require('graphql');
const lodash = require('lodash');

const axiso = require('axios');

const { GraphQLObjectType, GraphQLSchema, GraphQLID} = grahpql;
const { SingleBlockType, SingleTransactionType, BlockHeightType,
        SingleAddressType, LatestBlockType } = require('./blockchainSchema');

const{ GraphQLString } = grahpql

////  init start point (root)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    singleblock: {
      type:  SingleBlockType,
      args: { hashID: { type: GraphQLID } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        console.log(`args: ${ args.hashID }`);
        return axiso.get(`https://blockchain.info/rawblock/${ args.hashID }`)
              .then(response => response.data)
      },    
    },
    singleTransaction: {
      type:  SingleTransactionType,
      args: { transactionID: { type: GraphQLID } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        // console.log(`args ${ args.transactionID }`);
        return axiso.get(`https://blockchain.info/rawtx/${ args.transactionID }`)
              .then(response => response.data)
      },    
    },
    blockHeight: {
      type:  BlockHeightType,
      args: { blockHeightID: { type: GraphQLID } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        // console.log(`args ${ args.blockHeightID }`);
        return axiso.get(`https://blockchain.info/block-height/${ args.blockHeightID }?format=json`)
              .then(response => response.data)
      },    
    },
    singleAddress: {
      type:  SingleAddressType,
      args: { singleAddressID: { type: GraphQLID } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        // console.log(`args ${ args.singleAddressID }`);
        return axiso.get(`https://blockchain.info/rawaddr/${ args.singleAddressID }`)
              .then(response => response.data)
      },    
    },
    latestBlock: {
      type:  LatestBlockType,
      //// code to get data from db or other source 
      resolve(parent, args) {
        return axiso.get(`https://blockchain.info/latestblock`)
              .then(response => response.data)
      },    
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    singleblock: {
      type:  SingleBlockType,
      args: { hashID: { type: GraphQLString } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        console.log(`hashID:::: ${ args.hashID }`);
        return axiso.get(`https://blockchain.info/rawblock/${ args.hashID }`)
              .then(response => response.data)
      },    
    },

    singleTransaction: {
      type:  SingleTransactionType,
      args: { transactionID: { type: GraphQLString } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        console.log(`transactionID ${ args.transactionID }`);
        return axiso.get(`https://blockchain.info/rawtx/${ args.transactionID }`)
              .then(response => response.data)
      },    
    },
    blockHeight: {
      type:  BlockHeightType,
      args: { blockHeightID: { type: GraphQLString } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        console.log(`blockHeightID ${ args.blockHeightID }`);
        return axiso.get(`https://blockchain.info/block-height/${ args.blockHeightID }?format=json`)
              .then(response => response.data)
      },    
    },
    singleAddress: {
      type:  SingleAddressType,
      args: { singleAddressID: { type: GraphQLString } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        console.log(`singleAddressID ${ args.singleAddressID }`);
        return axiso.get(`https://blockchain.info/rawaddr/${ args.singleAddressID }`)
              .then(response => response.data)
      },    
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation
});