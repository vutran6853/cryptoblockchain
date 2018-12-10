const grahpql = require('graphql');
const lodash = require('lodash');

// const axiso = require('axios');
// axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = process.env.REACT_APP_CRYPTOCOMPARE_KEY

const { GraphQLObjectType, GraphQLString, 
        GraphQLSchema, GraphQLID , GraphQLInt, 
        GraphQLList, GraphQLNonNull } = grahpql;


//// def ObjectType 
const SingleBlockType = new GraphQLObjectType({
  name: 'SingleBlock',
  fields: () => ({ 
    hash: { type: GraphQLString },
    ver: { type: GraphQLInt },
    prev_block: { type: GraphQLString },
    tx: { type: TransactionType }
  })
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({ 
  
  })
});



////  init start point (root)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    block: {
      type:  SingleBlockType,
      args: { hashID: { type: GraphQLID } },
      //// code to get data from db or other source 
      resolve(parent, args) {
        // console.log(`args ${ args.id }`);
        return axiso.get(`https://blockchain.info/rawblock/$${ hashID }`)
              .then(response => response.data)
      },    
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation
});